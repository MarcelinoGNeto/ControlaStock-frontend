import * as React from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
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
import { Input } from "@/components/ui/input";
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
import { DialogEntradaProduto } from "./dialogEntradaProduto/dialogEntradaProduto";
import { DialogEditaProduto } from "./dialogEditaProduto/dialogEditaProduto";
import { AlertDialogRemove } from "../Alerts/alertDialogRemove";

export type Item = {
  _id: string;
  quantidade: number;
  genero: string;
  nome: string;
  medida: string;
};

export function ProdutosTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { produtos, setProdutos } = useProductContext();

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
          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Gênero
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center font-medium">{row.getValue("genero")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="flex justify-center"><p>Editar | Remover</p></div>,
      cell: ({ row }) => {
        const produto = row.original;
        const idProduto = produto._id;

        return (
          <div className="flex justify-center">
            <DialogEditaProduto id={idProduto} refreshTable={atualizaTabela} />
            <AlertDialogRemove title="" removeProduct={() => removeProduto(idProduto)} />
          </div>
        );
      },
    },
  ];

  React.useEffect(() => {
    fetchProdutos();
  }, []);

  async function fetchProdutos() {
    try {
      const produtosDaAPI = await getProdutos();
      setProdutos(produtosDaAPI);
    } catch (error) {
      console.error("Erro ao buscar produtos da API", error);
    }
  }

  async function removeProduto(id: string) {
    await deleteProdutos(id);
    await fetchProdutos();
  }

  async function atualizaTabela() {
    await fetchProdutos();
  }

  const table = useReactTable({
    data: produtos,
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
    <div className="w-3/4 h-full px-6 rounded-xl border bg-card text-card-foreground shadow">
      <div className="flex flex-col space-y-1.5 py-4">
        <div className="font-semibold leading-none tracking-tight">
          Mantenha seu estoque sempre atualizado!
        </div>
        <div className="text-sm text-muted-foreground">
          Abaixo você pode pesquisar, cadastrar e remover produtos do estoque
        </div>
      </div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por produtos..."
          value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nome")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex-1 text-sm text-muted-foreground">
          <div className="px-6">
            <DialogEntradaProduto />
          </div>
        </div>
      </div>
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
        {/* <div className="flex-1 text-sm text-muted-foreground">
          <div className="px-6">
            <DialogEntradaProduto />
          </div>
        </div> */}
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
    </div>
  );
}
