import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { EmployeesType } from "../data/schema";

type DeleteProps = {
    employee: EmployeesType;
    isOpen: boolean;
    showActionToggle: (open: boolean) => void;
};

export default function DeleteDialog({ employee, isOpen, showActionToggle }: DeleteProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={showActionToggle}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. You are about to delete Employee Details of
                        <b>{employee.firstname}</b>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            showActionToggle(false);
                        }}
                    >
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
