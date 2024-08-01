import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { units } from "../data/filters";
import { EmployeesType } from "../data/schema";

type EditProps = {
    employee: EmployeesType;
};

const editSchema = z.object({
    temp_id: z.string(),
    firstname: z.string().min(1, { message: "Full Name Required" }),
    recruited_for: z.string(),
    // recruited_for: z.enum([
    //     "NIT Agartala",
    //     "Tarashankar Motors",
    //     "Pantaloons",
    //     "Reliance Mart",
    //     "Mayanil Head Office",
    //     "Rubber Board",
    //     "IIIT Agartala",
    //     "Tripura University",
    // ]),
    contact_no: z.string(),
    unit: z.string(),
});

type editSchemaType = z.infer<typeof editSchema>;

export default function EditDialog({ employee }: EditProps) {
    const form = useForm<editSchemaType>({
        resolver: zodResolver(editSchema),
        defaultValues: {
            temp_id: employee.temp_id,
            firstname: employee.firstname,
            recruited_for: employee.recruited_for,
            contact_no: employee.contact_no,
            unit: employee.unit,
        },
    });

    function onSubmit(values: editSchemaType) {
        console.log(values);
    }
    return (
        <div>
            <DialogHeader>
                <DialogTitle>Edit Employee Details</DialogTitle>
            </DialogHeader>
            <div className="py-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full name</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="recruited_for"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contact_no"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mobile</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="unit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Unit</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a unit to Update" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                {units.map((unit, index) => (
                                                    <SelectItem key={index} value={unit.value}>
                                                        <span className="flex items-center">
                                                            {/* <unit.icon className="mr-2 h-5 w-5 text-muted-foreground" /> */}
                                                            {unit.label}
                                                        </span>
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="mt-2 w-full">
                            Update Details
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
