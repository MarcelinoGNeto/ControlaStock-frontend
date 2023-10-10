import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon, PlusIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getSaidas } from "@/services/saidasAPI";
import { useSaidaContext } from "@/contexts/saidaContext";
import { Input } from "@/components/ui/input";
import React from "react";
import { getProdutos, updateProdutos } from "@/services/produtosAPI";
import { useProductContext } from "@/contexts/productContext";
import { useProdutosSaidaContext } from "@/contexts/useProdutosSaidaContext";
import { DetalheProduto } from "./detalheProduto";
import { AlertValidacaoQtd } from "@/components/SaidaProduto/formSaidaProdutos/alertValidacaoQtd";
import { AlertValidacaoProduto } from "./alertValidacaoProduto";
import { useAlertaProdutoContext } from "@/contexts/useAlertaProdutoContext";
import { useAlertaQtdProdutoContext } from "@/contexts/useAlertaQtdProdutoContext"; 

const FormSchema = z.object({
  _id: z.string(),
  nome: z.string().min(2, {
    message: "Selecione um produto.",
  }),
  genero: z.string(),
  medida: z.string(),
  quantidade: z.coerce
    .number({
      errorMap: () => {
        return {
          message: "Informe um número válido",
        };
      },
    })
    .positive("Insira um valor maior que 0"),
});

export function FormSaida() {
  const { produtos, setProdutos } = useProductContext();
  const { setSaidas } = useSaidaContext();
  const { dataProdutosSaida, setDataProdutosSaida } = useProdutosSaidaContext();
  const [selectProduto, setSelectProduto] = React.useState<z.infer<
    typeof FormSchema
  > | null>(null);
  const { alertaProdutoSelecionado, setAlertaProdutoSelecionado } = useAlertaProdutoContext();
  const { alertaQtdProdutoSelecionado, setAlertaQtdProdutoSelecionado } = useAlertaQtdProdutoContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nome: "",
      quantidade: 0,
    },
  });

  function validaRegistroSaida(data: z.infer<typeof FormSchema>) {
    const quantidadeRequerida = data?.quantidade;
    const quantidadeProdutoBD = selectProduto ? selectProduto?.quantidade : 0;

    const produtoExistente = dataProdutosSaida.find(
      (produto) => produto._id === data._id
    );

    if (produtoExistente && produtoExistente !== undefined) {
      setAlertaProdutoSelecionado(true);

      return false;
    }

    if (quantidadeProdutoBD < quantidadeRequerida) {
      setAlertaQtdProdutoSelecionado(true);
      return false;
    }

    insereProduto(data);
    atualizaQuantidadeProdutoBanco(data._id, quantidadeProdutoBD, quantidadeRequerida)
  }

  function insereProduto(data: z.infer<typeof FormSchema>) {
    setDataProdutosSaida((prevData) => [...prevData, data]);
    dataProdutosSaida.push(data);
  }

  async function updateProduto(id: string, data: object) {
    try {
      await updateProdutos(id, data);
    }catch(error) {
      console.error("Erro ao atualizar produto: ", error);
    }
  }

  const atualizaQuantidadeProdutoBanco = (id: string, qtdBanco: number, qtdSolicitada: number) => {
    const novaQtd = qtdBanco - qtdSolicitada;
    const dataQtd = {
      quantidade: novaQtd
    }
    updateProduto(id, dataQtd);
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const resultadoValidacao = validaRegistroSaida(data);

    if (resultadoValidacao && resultadoValidacao !== undefined) {
      validaRegistroSaida(data);
    }

    setSelectProduto(null);
    form.reset();
  }

  React.useEffect(() => {
    fetchSaidas();
    fetchProdutos();
  }, []);

  async function fetchSaidas() {
    try {
      const saidasDaApi = await getSaidas();
      setSaidas(saidasDaApi);
    } catch (error) {
      console.error("Erro ao buscar saída da API ", error);
    }
  }

  async function fetchProdutos() {
    try {
      const produtosDaAPI = await getProdutos();
      setProdutos(produtosDaAPI);
    } catch (error) {
      console.error("Erro ao buscar produtos da API", error);
    }
  }

  return (
    <div className="flex ">
      <div className="flex-initial w-1/2 mr-5 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mb-5"
          >
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Produtos</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-auto justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                          onClick={() => setAlertaProdutoSelecionado(false)}
                        >
                          {field.value
                            ? produtos.find(
                                (produto) => produto.nome === field.value
                              )?.nome
                            : "Selecione..."}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Digite um produto"
                          className="h-9"
                        />
                        <CommandEmpty>Não encontrado</CommandEmpty>
                        <CommandGroup>
                          {produtos.map((produto) => (
                            <CommandItem
                              value={produto.nome}
                              key={produto._id}
                              onSelect={() => {
                                form.setValue("_id", produto._id);
                                form.setValue("nome", produto.nome);
                                form.setValue("genero", produto.genero);
                                form.setValue("medida", produto.medida);
                                setSelectProduto(produto);
                              }}
                            >
                              {produto.nome}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  produto.nome === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {alertaProdutoSelecionado ? <AlertValidacaoProduto /> : null}
                  <FormMessage />
                  <FormField
                    control={form.control}
                    name="quantidade"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel>Quantidade desejada</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="quantidade"
                              {...field}
                              onClick={() => setAlertaQtdProdutoSelecionado(false)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        {alertaQtdProdutoSelecionado ? <AlertValidacaoQtd /> : null}
                      </>
                    )}
                  />
                </FormItem>
              )}
            />
            <Button type="submit">
              Inserir
              <PlusIcon className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>
      </div>

      <div className="w-full mb-7">
        {selectProduto && (
          <DetalheProduto
            _id={selectProduto._id}
            nome={selectProduto.nome}
            quantidade={selectProduto.quantidade}
            medida={selectProduto.medida}
            genero={selectProduto.genero}
          />
        )}
      </div>
    </div>
  );
}
