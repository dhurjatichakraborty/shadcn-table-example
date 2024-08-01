import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EmployeesType } from "../data/schema";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type ViewProps = {
    employee: EmployeesType;
};

export default function ViewDialog({ employee }: ViewProps) {
    const entries = Object.entries(employee);
    return (
        <DialogHeader>
            <DialogTitle>View Employee Details</DialogTitle>
            <DialogDescription className="py-4">
                <Table className="border-2">
                    <TableHeader className="bg-muted">
                        <TableRow>
                            <TableHead>Key</TableHead>
                            <TableHead>Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {entries.map(([key, value], index) => (
                            <TableRow key={index}>
                                <TableCell>{key}</TableCell>
                                <TableCell>{value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </DialogDescription>
        </DialogHeader>
    );
}
