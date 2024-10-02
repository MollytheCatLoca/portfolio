"use client"

import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Scenario {
    id: string;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    validez_capacidad_min: number;
    validez_capacidad_max: number;
}

interface ScenarioTableProps {
    scenarios: Scenario[];
}

export function ScenarioTable({ scenarios }: ScenarioTableProps) {
    const router = useRouter();

    const handleDelete = async (id: string) => {
        if (id === 'BASE_1') return; // Prevent deletion of BASE_1
        if (!confirm('Are you sure you want to delete this scenario?')) return;
        try {
            const response = await fetch(`/api/scenarios/delete/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete scenario');
            }
            router.refresh(); // Refresh the page to update the scenario list
        } catch (error) {
            console.error('Error deleting scenario:', error);
            alert('An error occurred while deleting the scenario. Please try again.');
        }
    };

    return (
        <Table>
        <TableCaption>A list of all scenarios.</TableCaption>
            < TableHeader >
            <TableRow>
            <TableHead className="w-[100px]" > ID </TableHead>
                < TableHead > Name </TableHead>
                < TableHead > Description </TableHead>
                < TableHead > Validez_Min </TableHead>
                < TableHead > Validez_Max </TableHead>
                < TableHead > Created At </TableHead>
                    < TableHead > Updated At </TableHead>
                        < TableHead > Actions </TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
    {
        scenarios.map((scenario) => (
            <TableRow key= { scenario.id } >
            <TableCell className="font-medium" > { scenario.id } </TableCell>
            < TableCell > { scenario.name } </TableCell>
            < TableCell > { scenario.description } </TableCell>
            < TableCell > { scenario.validez_capacidad_min } </TableCell>
            < TableCell > { scenario.validez_capacidad_max } </TableCell>
            < TableCell > { new Date(scenario.created_at).toLocaleString() } </TableCell>
            < TableCell > { new Date(scenario.updated_at).toLocaleString() } </TableCell>
            < TableCell >
        <div className="flex space-x-2" >
        <Link href={`/admin/scenarios/${scenario.id}`} passHref >
            <Button variant="default" className = "bg-blue-500 hover:bg-blue-600 text-white" >
                View
                </Button>
                </Link>
    {
        scenario.id !== 'BASE_1' && (
            <Button variant="destructive" onClick = {() => handleDelete(scenario.id)
    }>
        Delete
        </Button>
                )
}
</div>
    </TableCell>
    </TableRow>
        ))}
</TableBody>
    </Table>
  );
}

export default ScenarioTable;