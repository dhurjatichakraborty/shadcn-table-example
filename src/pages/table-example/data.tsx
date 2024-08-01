import { useEffect, useState } from "react";
import { EmployeesType } from "./data/schema";
import { columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<EmployeesType[]> {
    const res = await fetch("/mock_employee_data.json");
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
    // "https://my.api.mockaroo.com/payment_info.json?key=f0933e60";
}

export default function TableExample() {
    const [employeesData, setEmployeesData] = useState<EmployeesType[]>([]);
    useEffect(() => {
        const data = async () => {
            const result = await getData();
            setEmployeesData(result);
        };
        data();
    }, []);
    return <DataTable columns={columns} data={employeesData} />;
}
