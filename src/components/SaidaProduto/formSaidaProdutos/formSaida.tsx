import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
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
import { getProdutoPorId, getProdutos } from "@/services/produtosAPI";
import { useProductContext } from "@/contexts/productContext";
import { useProdutosSaidaContext } from "@/contexts/useProdutosSaidaContext";

const FormSchema = z.object({
  _id: z.string(),
  nome: z.string().min(2, {
    message: "O nome do produto deve conter mais de 2 letras.",
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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nome: "",
      quantidade: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    //Inserir: função de ação ao clicar no botão "Inserir"
    // await postSaidas(data);
    setDataProdutosSaida((prevData) => [...prevData, data]);
    dataProdutosSaida.push(data);

    console.log("dataProdutosSaida: ", dataProdutosSaida);

    //Consulta de Produto original no banco
    const produtoDaAPI = await getProdutoPorId(data._id);
    console.log("Produto do banco: ", produtoDaAPI);

    //const newSaida = await getSaidas();
    // setSaidas(newSaida);

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
      console.log("Erro ao buscar saída da API ", error);
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mb-5">
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
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
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
              <FormMessage />
              <FormField
                control={form.control}
                name="quantidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>QTD</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="quantidade"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormItem>
          )}
        />
        <Button type="submit">Inserir</Button>
      </form>
    </Form>
  );
}
