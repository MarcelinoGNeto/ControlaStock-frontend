"use client";

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

const destinatarios = [
  { label: "CRAS", value: "CRAS" },
  { label: "CREAS", value: "CREAS" },
  { label: "CONSELHO TUTELAR", value: "CONSELHO TUTELAR" },
  { label: "CMAS", value: "CMAS" },
  { label: "CMDCA", value: "CMDCA" },
  { label: "COMSEAN", value: "COMSEAN" },
  { label: "OUTRO", value: "OUTRO" },
] as const;

export function SelecionaDestinatario() {
  const FormSchema = z.object({
    _id: z.string(),
    destinatario: z.string({
      required_error: "Escolha um destinatário",
    }),
    //produtos: z.string().array(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      destinatario: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("clicou: ", data);
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
                            (destinatario) => destinatario.value === field.value
                          )?.label
                        : "Selecione..."}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Digite um destinatário"
                      className="h-9"
                    />
                    <CommandEmpty>Não encontrado</CommandEmpty>
                    <CommandGroup>
                      {destinatarios.map((destinatario) => (
                        <CommandItem
                          value={destinatario.label}
                          key={destinatario.value}
                          onSelect={() => {
                            form.setValue("destinatario", destinatario.value);
                          }}
                        >
                          {destinatario.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              destinatario.value === field.value
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
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Submeter</Button>
        </div>
      </form>
    </Form>
  );
}
