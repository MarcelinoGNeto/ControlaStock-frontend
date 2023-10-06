import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { getProdutoPorId, updateProdutos } from "@/services/produtosAPI";
import { AlertSuccess } from "../../Alerts/alertSuccess";

interface IFormProdutoProps {
  closeModal: () => void;
  id: string;
  refreshModal: any;
}

interface IProduto {
  nome: string;
  genero: string;
  medida: string;
  quantidade: number;
}

const formSchema = z.object({
  nome: z.string().min(2, {
    message: "O nome do produto deve conter mais de 2 letras.",
  }),
  genero: z.string({
    required_error: "Escolha um gênero para classificar o produto.",
  }),
  medida: z.string({
    required_error: "Escolha a unidade de medida mais adequada o produto.",
  }),
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

export function FormEditaProduto({ closeModal, id, refreshModal }: IFormProdutoProps) {
  const [produto, setProduto] = React.useState<IProduto | null>(null);
  const [alertUpdate, setAlertUpdate] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: produto?.nome || "",
      quantidade: produto?.quantidade || 0,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const produtoById = await getProdutoPorId(id);
    updateProduto(produtoById._id, data);
    setAlertUpdate(true);

  }

  async function getProductById(id: string) {
    try {
      const produtoById = await getProdutoPorId(id);
      setProduto(produtoById);

      form.reset(produtoById);
    } catch (error) {
      console.error("Erro ao buscar pelo produto: ", error);
    }
  }

  async function updateProduto(id: string, data: z.infer<typeof formSchema>) {
    try {
      await updateProdutos(id, data);
    }catch(error) {
      console.error("Erro ao atualizar produto: ", error);
    }
  }

  useEffect(() => {
    getProductById(id);

    if (form.formState.isSubmitSuccessful) {

      setTimeout(() => {
        setAlertUpdate(false);

        closeModal();
        refreshModal();
      }, 2000);
      
    }
  }, [id, form.formState.isSubmitSuccessful, closeModal]);

  return (
    <Form {...form}>
      {produto ? (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Escreva o nome do produto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="genero"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gênero</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={produto?.genero || ""}
                >
                  <FormControl>
                    <SelectTrigger className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                      <SelectValue placeholder="Gênero" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Alimentícios">Alimentícios</SelectItem>
                    <SelectItem value="Expediente, Didático e Informática">
                      Expediente, Didático e Informática
                    </SelectItem>
                    <SelectItem value="Limpeza, Copa e Cozinha">
                      Limpeza, Copa e Cozinha
                    </SelectItem>
                    <SelectItem value="Derivados de Petróleo">
                      Derivados de Petróleo
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <FormField
              control={form.control}
              name="medida"
              render={({ field }) => (
                <FormItem className="w-60">
                  <FormLabel>Medida</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={produto?.medida || ""}
                  >
                    <FormControl>
                      <SelectTrigger className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                        <SelectValue placeholder="Medida" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="balde">balde</SelectItem>
                      <SelectItem value="barra">barra</SelectItem>
                      <SelectItem value="caixa">caixa</SelectItem>
                      <SelectItem value="fardo">fardo</SelectItem>
                      <SelectItem value="folha">folha</SelectItem>
                      <SelectItem value="frasco">frasco</SelectItem>
                      <SelectItem value="garrafão">garrafão</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="lata">lata</SelectItem>
                      <SelectItem value="litro">litro</SelectItem>
                      <SelectItem value="pacote">pacote</SelectItem>
                      <SelectItem value="resma">resma</SelectItem>
                      <SelectItem value="rolo">rolo</SelectItem>
                      <SelectItem value="saco">saco</SelectItem>
                      <SelectItem value="unid">unid</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>QTD</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="quantidade" {...field} 
                    //defaultValue={produto?.quantidade || 0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Atualizar</Button>
          {alertUpdate ? <AlertSuccess title="Sucesso!" description="O produto foi atualizado com sucesso." /> : null}
        </form>
      ) : (
        <p>carregando...</p>
      )}
    </Form>
  );
}
