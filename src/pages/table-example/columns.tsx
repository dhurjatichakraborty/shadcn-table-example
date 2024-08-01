import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { employment_types, recruited_for_posts, units } from "./data/filters";
import { DataTableRowActions } from "./data-table-row-actions";
import { EmployeesType } from "./data/schema";
import { Icons } from "@/components/icons";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<EmployeesType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    // Employee ID
    {
        accessorKey: "temp_id",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Employee ID" />,
        cell: ({ row }) => <div className="w-auto">{row.getValue("temp_id")}</div>,
        enableSorting: false,
        enableHiding: false,
    },

    // Employee Name
    {
        accessorKey: "firstname",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Firstname" />,
        cell: ({ row }) => {
            const employment_type = employment_types.find(
                (employment_type) => employment_type.value === row.original.employment_type
            );

            return (
                <div className="flex space-x-2">
                    {employment_type && employment_type.label === "Permanent" && (
                        <Badge variant="outline" className="bg-green-100 font-normal">
                            {employment_type.label}
                        </Badge>
                    )}
                    {employment_type && employment_type.label === "Temporary" && (
                        <Badge variant="outline" className="bg-blue-100 font-normal">
                            {employment_type.label}
                        </Badge>
                    )}
                    {employment_type && employment_type.label === "A/F" && (
                        <Badge variant="outline" className="bg-red-100 font-normal">
                            {employment_type.label}
                        </Badge>
                    )}
                    <span className="w-auto truncate font-normal">{row.getValue("firstname")}</span>
                </div>
            );
        },
    },

    // Recruited for Post
    {
        accessorKey: "recruited_for",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Post" />,
        cell: ({ row }) => {
            const recruited_for_post = recruited_for_posts.find(
                (recruited_for_post) => recruited_for_post.value === row.getValue("recruited_for")
            );

            if (!recruited_for_post) {
                return null;
            }

            return (
                <div className="flex w-auto items-center">
                    <span>{recruited_for_post.label}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },

    // Unit posted to
    {
        accessorKey: "unit",
        header: "Unit",
        cell: ({ row }) => {
            const unit = units.find((unit) => unit.value === row.getValue("unit"));

            if (!unit) {
                return null;
            }

            return (
                <div className="flex w-[150px] items-center">
                    {/* {unit.icon && <unit.icon className="mr-2 h-4 w-4 text-muted-foreground" />} */}
                    <span>{unit.label}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },

    {
        accessorKey: "contact_no",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="-ml-4"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Mobile
                    <Icons.sort className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            // const mobile = parseInt(row.getValue("contact_no"));
            // const formatted = new Intl.NumberFormat("en-IN", {
            //     style: "decimal",
            //     useGrouping: true,
            // }).format(mobile);
            // const amount = parseFloat(row.getValue("amount"));
            // const formatted = new Intl.NumberFormat("en-US", {
            //     style: "currency",
            //     currency: "USD",
            // }).format(amount);

            return <div className=" font-medium">{row.getValue("contact_no")}</div>;
        },
    },
    {
        id: "actions",
        header: () => <div>Actions</div>,
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
