import * as React from "react";
import {
  CaretSortIcon,
  DownloadIcon,
  FileTextIcon,
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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteSaidas, getSaidas } from "@/services/saidasAPI";
import { useSaidaContext } from "@/contexts/saidaContext";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/pt-br";
import { saidasPDF } from "../Reports/saidaPDF";
import { AlertDialogRemove } from "../Alerts/alertDialogRemove";
import { useLoginLogoutContext } from "@/contexts/useLoginLogoutContext";
import { Loading } from "../Loading/loading";

export type Item = {
  _id: string;
  destinatario: string;
  criadoEm: Date;
  produtos: [];
  actions: string;
};

export function HistoricoSaidasTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { saidas, setSaidas } = useSaidaContext();
  const { setLogInOut } = useLoginLogoutContext();
  const [removeLoading, setRemoveLoading] = React.useState(false);

  const columns: ColumnDef<Item>[] = [
    {
      accessorKey: "destinatario",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Destinatário
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize ml-4">{row.getValue("destinatario")}</div>
      ),
    },
    {
      accessorKey: "criadoEm",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Data do Registro
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const criadoEm = moment(row.getValue("criadoEm"));
        const formattedDate = criadoEm.format("DD/MM/YYYY - H:mm:ss");

        return <div className="capitalize ml-4">{formattedDate}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => (
        <div className="flex justify-center">
          <p>Baixar | Remover</p>
        </div>
      ),
      cell: ({ row }) => {
        const saida = row.original;
        const idSaida = saida._id;

        return (
          <div className="flex justify-center">
            <Button
              className="bg-amber-500 mx-2"
              onClick={() => saidasPDF(saida)}
            >
              <DownloadIcon className="w-5 h-5" />
            </Button>
            <AlertDialogRemove
              title=""
              removeProduct={() => removeSaida(idSaida)}
            />
          </div>
        );
      },
    },
  ];

  React.useEffect(() => {
    setRemoveLoading(true);
    fetchSaidas();
    setLogInOut(true);
  }, []);

  async function fetchSaidas() {
    try {
      const saidasDaAPI = await getSaidas();
      setSaidas(saidasDaAPI);
    } catch (error) {
      console.error("Erro ao buscar a saída na API", error);
    }
  }

  async function removeSaida(id: string) {
    await deleteSaidas(id);
    await fetchSaidas();
  }

  const table = useReactTable({
    data: saidas,
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
    <div className="w-3/4 h-full px-5 rounded-xl border bg-card text-card-foreground shadow">
      <div className="flex flex-col space-y-1.5 py-4">
        <div className="font-semibold leading-none tracking-tight">
          O histórico das saídas estão aqui.
        </div>
        <div className="text-sm text-muted-foreground">
          Digite abaixo o nome de uma entidade, ou cadastre uma nova saída.
        </div>
      </div>
      {saidas ? (
        <>
          <div className="flex items-center py-4">
            <Input
              placeholder="Destinatário"
              value={
                (table.getColumn("destinatario")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("destinatario")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <div className="px-6">
              {/* <Button variant="default"> */}

              <Link
                to="/saidas"
                className="
              inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50
              m-1 bg-primary text-primary-foreground shadow hover:bg-primary/90
              h-9 px-4 py-2"
              >
                Nova Saída
                <FileTextIcon className="w-5 h-5 ml-2" />
              </Link>
              {/* </Button> */}
            </div>
            <DropdownMenu>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
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
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} de{" "}
              {table.getFilteredRowModel().rows.length} item(s) seleccionado(s).
            </div>
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
        </>
      ) : (
        !removeLoading && (
          <div className="my-10">
            <Loading />
          </div>
        )
      )}
    </div>
  );
}
