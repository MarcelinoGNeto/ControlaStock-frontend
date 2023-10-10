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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProdutosSaidaContext } from "@/contexts/useProdutosSaidaContext";
import { AlertDialogRemove } from "@/components/Alerts/alertDialogRemove";
import { getProdutoPorId, updateProdutos } from "@/services/produtosAPI";

export type Item = {
  _id: string;
  quantidade: number;
  genero: string;
  nome: string;
  medida: string;
};

export function ProdutosSaidaTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { dataProdutosSaida, setDataProdutosSaida } = useProdutosSaidaContext();

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
              QTD
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
      header: () => (
        <div className="flex justify-center">
          <p>Remover</p>
        </div>
      ),
      cell: ({ row }) => {
        const produto = row.original;
        const idProduto = produto._id;
        const produtoQtd = produto.quantidade;

        return (
          <div className="flex justify-center">
            <AlertDialogRemove
              removeProduct={() => removeProduto(idProduto, produtoQtd)}
            />
          </div>
        );
      },
    },
  ];

  React.useEffect(() => {
    dataProdutosSaida;
  }, [dataProdutosSaida]);

  async function removeProduto(idProduto: string, produtoQtd: number) {
    for (let i = 0; i < dataProdutosSaida.length; i++) {
      if (dataProdutosSaida[i]._id === idProduto) {
        dataProdutosSaida.splice(i, 1);
        break;
      }
    }

    setDataProdutosSaida([...dataProdutosSaida]);

    const produtoById = await getProdutoPorId(idProduto);

    atualizaQuantidadeProdutoBanco(
      idProduto,
      produtoById.quantidade,
      produtoQtd
    );
  }

  const atualizaQuantidadeProdutoBanco = (
    id: string,
    qtdBanco: number,
    qtdSolicitada: number
  ) => {
    const novaQtd = qtdBanco + qtdSolicitada;
    const dataQtd = {
      quantidade: novaQtd,
    };
    updateProduto(id, dataQtd);
  };

  async function updateProduto(id: string, data: object) {
    try {
      await updateProdutos(id, data);
    } catch (error) {
      console.error("Erro ao atualizar produto: ", error);
    }
  }

  const table = useReactTable({
    data: dataProdutosSaida,
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
    <>
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
      <div className="flex items-center justify-end">
        <div className="space-y-2 space-x-2">
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
    </>
  );
}
