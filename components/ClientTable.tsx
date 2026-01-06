import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  SortingState,
} from '@tanstack/react-table';
import { Client, HealthStatus, OfferType } from '../types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { formatCurrency, formatPercent } from '../lib/utils';

interface ClientTableProps {
  data: Client[];
  isLoading: boolean;
}

const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="pl-0 hover:bg-transparent font-semibold text-foreground/80 hover:text-foreground"
        >
          Client Name
          <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium text-foreground">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'offer',
    header: 'Active Offer',
    cell: ({ row }) => <div className="text-muted-foreground text-sm">{row.getValue('offer')}</div>,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="pl-0 hover:bg-transparent hover:text-foreground"
        >
          Health
          <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue('status') as HealthStatus;
      let variant: 'success' | 'warning' | 'destructive' = 'success';
      if (status === HealthStatus.Amber) variant = 'warning';
      if (status === HealthStatus.Red) variant = 'destructive';

      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: 'mrr',
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="pr-0 hover:bg-transparent hover:text-foreground"
          >
            MRR
            <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => <div className="text-right font-mono text-muted-foreground/90">{formatCurrency(row.getValue('mrr'))}</div>,
  },
  {
    accessorKey: 'margin',
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="pr-0 hover:bg-transparent hover:text-foreground"
          >
            Margin
            <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const margin = row.getValue('margin') as number;
      const isLow = margin < 40;
      return (
        <div className={`text-right font-mono ${isLow ? 'text-destructive' : 'text-emerald-500'}`}>
          {formatPercent(margin)}
        </div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: () => {
      return (
        <div className="text-right">
          <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

export function ClientTable({ data, isLoading }: ClientTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      globalFilter,
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="h-10 w-[250px] bg-muted/50 rounded animate-pulse" />
        <div className="rounded-md border border-border/40">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 w-full border-b border-border/40 bg-muted/10 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter clients..."
          value={globalFilter ?? ''}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <div className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} Clients
        </div>
      </div>
      <div className="rounded-md border border-border/40 bg-card">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b transition-colors hover:bg-muted/30 data-[state=selected]:bg-muted group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center">
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
