import { useEffect } from "react";
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
import { getProdutos, postProdutos } from "@/services/produtosAPI";
import { useProductContext } from "@/contexts/productContext";

interface FormEditProdutoProps {
  closeModal: () => void;
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
  quantidade: z
    .coerce.number({
      errorMap: () => {
        return {
          message: "Informe um número válido",
        };
      },
    })
    .positive("Insira um valor maior que 0"),
});

export function FormEditProduto({ closeModal }: FormEditProdutoProps) {
  const { setProdutos } = useProductContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      quantidade: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await postProdutos(data);
    console.log("data: ", data);

    const newProdutos = await getProdutos();
    setProdutos(newProdutos);

    form.reset();
  }

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      closeModal();
    }
  }, [form.formState.isSubmitSuccessful, closeModal]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Produto</FormLabel>
              <FormControl>
                <Input placeholder="Escreva o nome do produto" {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                  defaultValue={field.value}
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
                  <Input type="number" placeholder="quantidade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
