import * as React from "react";
import {
  CaretSortIcon,
  CheckIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProductContext } from "@/contexts/productContext";
import { deleteProdutos, getProdutos } from "@/services/produtosAPI";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useProdutosSaidaContext } from "@/contexts/useProdutosSaidaContext";

export type Item = {
  _id: string;
  quantidade: number;
  genero: string;
  nome: string;
  medida: string;
};

const destinatarios = [
  { label: "CRAS", value: "CRAS" },
  { label: "CREAS", value: "CREAS" },
  { label: "CONSELHO TUTELAR", value: "CONSELHO TUTELAR" },
  { label: "CMAS", value: "CMAS" },
  { label: "CMDCA", value: "CMDCA" },
  { label: "COMSEAN", value: "COMSEAN" },
  { label: "OUTRO", value: "OUTRO" },
] as const;

export function ProdutosSaidaTable({ dados }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [tableData, setTableData] = React.useState(dados);

  const FormSchema = z.object({
    _id: z.string(),
    destinatario: z.string({
      required_error: "Escolha um destinatário",
    }),
    produtos: z.string().array(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      destinatario: "",
    },
  });

  const columns: ColumnDef<Item>[] = [
    {
      accessorKey: "nome",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Produto
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize ml-4">{row.getValue("nome")}</div>
      ),
    },
    {
      accessorKey: "medida",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Medida
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize ml-4">{row.getValue("medida")}</div>
      ),
    },
    {
      accessorKey: "quantidade",
      header: ({ column }) => {
        return (
          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              QTD em estoque
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center font-medium">
          {row.getValue("quantidade")}
        </div>
      ),
    },
    {
      accessorKey: "genero",
      header: ({ column }) => {
        return (
          <div className="text-right">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Gênero
              <CaretSortIcon className="ml-2 h-4 w-" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-right mr-5">
          {row.getValue("genero")}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const produto = row.original;
        const idProduto = produto._id;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
                <DialogEditButton /> */}
              <DropdownMenuItem onClick={() => removeProduto(idProduto)}>
                Remover produto
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    //Inserir
    // await postSaidas(data);
    console.log("data: ", data);

    //const newSaida = await getSaidas();
    // setSaidas(newSaida);

    /* 

Validar se a QTD desejada estiver acima da quantidade total
*/
    form.reset();
  }

  React.useEffect(() => {
    setTableData(dados)
    console.log("dados: ", dados)
    console.log("tableData: ", tableData)
  }, [dados]);


  async function removeProduto(id: string) {
    await deleteProdutos(id);
  }

  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Sem resultado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Próximo
            </Button>
          </div>
        </div>

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

        <Button type="submit">Submeter</Button>
      </form>
    </Form>
  );
}
