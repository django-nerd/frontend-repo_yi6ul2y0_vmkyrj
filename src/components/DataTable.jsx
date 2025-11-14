import React, { useMemo, useState } from 'react'
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table'
import { ArrowUpDown, Filter, MoreHorizontal, Rows, Columns } from 'lucide-react'
import { toast } from 'sonner'

export default function DataTable({ data, columns, onInlineEdit }) {
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnVisibility, setColumnVisibility] = useState({})

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, columnVisibility },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const onCellBlur = (rowId, accessorKey, value) => {
    if (onInlineEdit) onInlineEdit(rowId, accessorKey, value)
  }

  return (
    <div className="rounded-lg border bg-white/70 backdrop-blur">
      <div className="p-3 flex items-center justify-between gap-2">
        <input
          placeholder="Cari..."
          value={globalFilter ?? ''}
          onChange={e=>setGlobalFilter(e.target.value)}
          className="h-9 px-3 rounded-md border bg-white/70"
          aria-label="Search"
        />
        <div className="flex items-center gap-2">
          <button className="h-9 px-3 rounded-md border text-sm" onClick={()=>toast('Saved view preset')}>{/* placeholder */}Simpan View</button>
          <button className="h-9 px-3 rounded-md border text-sm" onClick={()=>toast('Exported CSV')}>Export CSV</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50/80">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="text-left p-3 font-medium text-gray-700 select-none">
                    {header.isPlaceholder ? null : (
                      <button
                        className="inline-flex items-center gap-1 hover:text-gray-900"
                        onClick={header.column.getToggleSortingHandler()}
                        aria-label={`Sort ${String(header.column.columnDef.header)}`}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <ArrowUpDown className="w-3 h-3" />
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-t hover:bg-gray-50/70">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-2 align-top">
                    {cell.column.columnDef.meta?.editable ? (
                      <input
                        defaultValue={cell.getValue()}
                        className="w-full px-2 py-1 rounded border bg-white/70"
                        onBlur={(e)=>onCellBlur(row.index, cell.column.id, e.target.value)}
                      />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-3 flex items-center justify-between text-sm">
        <div>
          Menampilkan {table.getRowModel().rows.length} dari {table.getPrePaginationRowModel().rows.length} data
        </div>
        <div className="flex items-center gap-2">
          <button className="h-8 px-2 rounded border" onClick={()=>table.previousPage()} disabled={!table.getCanPreviousPage()}>Prev</button>
          <span>Hal {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}</span>
          <button className="h-8 px-2 rounded border" onClick={()=>table.nextPage()} disabled={!table.getCanNextPage()}>Next</button>
        </div>
      </div>
    </div>
  )
}
