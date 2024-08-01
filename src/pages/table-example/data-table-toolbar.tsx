import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { recruited_for_posts, units } from "./data/filters";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Employee name..."
                    value={(table.getColumn("firstname")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("firstname")?.setFilterValue(event.target.value)}
                    className="h-8 w-auto lg:w-auto"
                />
                {table.getColumn("recruited_for") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("recruited_for")}
                        title="Post"
                        options={recruited_for_posts}
                    />
                )}
                {table.getColumn("unit") && (
                    <DataTableFacetedFilter column={table.getColumn("unit")} title="Unit" options={units} />
                )}
                {isFiltered && (
                    <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
                        Reset
                        <Icons.cancel className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    );
}
