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
  FormDescription,
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
import { useProdutosSaidaContext } from "@/contexts/useProdutosSaidaContext";
import { postSaidas } from "@/services/saidasAPI";

const destinatarios = [
  { label: "CRAS", value: "CRAS" },
  { label: "CREAS", value: "CREAS" },
  { label: "CONSELHO TUTELAR", value: "CONSELHO TUTELAR" },
  { label: "CMAS", value: "CMAS" },
  { label: "CMDCA", value: "CMDCA" },
  { label: "COMSEAN", value: "COMSEAN" },
  { label: "OUTRO", value: "OUTRO" },
] as const;

const FormSchema = z.object({
  destinatario: z.string().min(2, {
    message: "Escolha um destinatário na lista, ou marque a opção (Outro).",
  }),
});

export function SelecionaDestinatario() {
  const { dataProdutosSaida, setDataProdutosSaida } = useProdutosSaidaContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {

    const saidaProdutos = {
      destinatario: data.destinatario,
      produtos: dataProdutosSaida,
    }

    await postSaidas(saidaProdutos);
    
    console.log("saidaProdutos: ",saidaProdutos)

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="destinatario"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Destinatários</FormLabel>
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
                        ? destinatarios.find(
                            (language) => language.value === field.value
                          )?.label
                        : "Selecione..."}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Digite um nome..."
                      className="h-9"
                    />
                    <CommandEmpty>Não encontrado.</CommandEmpty>
                    <CommandGroup>
                      {destinatarios.map((entidade) => (
                        <CommandItem
                          value={entidade.label}
                          key={entidade.value}
                          onSelect={() => {
                            form.setValue("destinatario", entidade.value);
                          }}
                        >
                          {entidade.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              entidade.value === field.value
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
              <FormDescription>
                Escolha uma entidade para enviar os produtos e clique em
                "Registrar".
              </FormDescription>
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">Registrar</Button>
        </div>
      </form>
    </Form>
  );
}
