'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { SunIcon, DollarSignIcon } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import UpdatePopup from './UpdatePopup';

interface Parameter {
    id: number;
    category: string;
    capacity_min?: number;
    capacity_max?: number;
    name?: string;
    value: number;
    baseValue: number;
}

interface Scenario {
    id: string;
    name: string;
    capacity_based_parameters: Parameter[];
    economic_parameters: Parameter[];
    created_at?: string;
    updated_at?: string;
}

interface ScenarioDetailProps {
    scenario: Scenario;
}

interface ChangesDictionary {
    capacity_based_parameters: {
        [id: number]: {
            value: number;
        };
    };
    economic_parameters: {
        [id: number]: {
            value: number;
        };
    };
}

const ScenarioDetail: React.FC<ScenarioDetailProps> = ({ scenario }) => {
    const [editingParam, setEditingParam] = useState<Parameter | null>(null);
    const [scenarioData, setScenarioData] = useState<Scenario>(scenario);
    const [changes, setChanges] = useState<ChangesDictionary>({
        capacity_based_parameters: {},
        economic_parameters: {}
    });

    // Función para ordenar parámetros basados en capacidad
    const sortCapacityParameters = (params: Parameter[]) => {
        return [...params].sort((a, b) => {
            if (a.category !== b.category) {
                return a.category.localeCompare(b.category);
            }
            return (a.capacity_min || 0) - (b.capacity_min || 0);
        });
    };

    // Función para ordenar parámetros económicos
    const sortEconomicParameters = (params: Parameter[]) => {
        return [...params].sort((a, b) => a.category.localeCompare(b.category));
    };

    // Ordenar parámetros al cargar o actualizar el escenario
    useEffect(() => {
        setScenarioData(prevData => ({
            ...prevData,
            capacity_based_parameters: sortCapacityParameters(prevData.capacity_based_parameters),
            economic_parameters: sortEconomicParameters(prevData.economic_parameters)
        }));
    }, [scenario]);

    const handleEdit = (param: Parameter) => {
        console.log("Editando parámetro:", param);
        setEditingParam(param);
    };

    const handleClose = () => {
        console.log("Cerrando modal");
        setEditingParam(null);
    };

    const handleSave = (newValue: number) => {
        if (!editingParam) {
            console.error("No hay parámetro siendo editado");
            return;
        }

        console.log('ScenarioDetail - Guardando:');
        console.log('Parámetro ID:', editingParam.id);
        console.log('Categoría:', editingParam.category);
        console.log('Valor anterior:', editingParam.value);
        console.log('Nuevo valor:', newValue);

        setScenarioData(prevData => {
            const updatedCapacityParams = prevData.capacity_based_parameters.map(param =>
                param.id === editingParam.id ? { ...param, value: newValue } : param
            );
            const updatedEconomicParams = prevData.economic_parameters.map(param =>
                param.id === editingParam.id ? { ...param, value: newValue } : param
            );
            return {
                ...prevData,
                capacity_based_parameters: sortCapacityParameters(updatedCapacityParams),
                economic_parameters: sortEconomicParameters(updatedEconomicParams)
            };
        });

        setChanges(prevChanges => {
            const paramType = editingParam.name ? 'economic_parameters' : 'capacity_based_parameters';
            return {
                ...prevChanges,
                [paramType]: {
                    ...prevChanges[paramType],
                    [editingParam.id]: { value: newValue }
                }
            };
        });

        setEditingParam(null);
    };

    const handleConfirmAllChanges = async () => {
        console.log('Confirmando todos los cambios:');
        console.log(JSON.stringify(changes, null, 2));

        try {
            const response = await fetch('/api/updateScenarioParameters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(changes),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar los parámetros');
            }

            const result = await response.json();
            console.log(result.message);

            // Resetear los cambios
            setChanges({
                capacity_based_parameters: {},
                economic_parameters: {}
            });

            // Opcionalmente, podrías recargar los datos del escenario aquí
            // await loadScenarioData();

        } catch (error) {
            console.error('Error:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    };

    return (
        <section className= "mt-1 mb-8" >
        <h1 className="text-2xl font-bold mb-4 text-white" > { scenarioData.name } </h1>

            < div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" >
                <Card className="bg-black-200 border-gray-800" >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" >
                        <CardTitle className="text-sm font-medium text-gray-300" > Capacidad Total </CardTitle>
                            < SunIcon className = "h-4 w-4 text-yellow-500" />
                                </CardHeader>
                                < CardContent >
                                <div className="text-2xl font-bold text-white" >
                                    { scenarioData.capacity_based_parameters.reduce((sum, param) => sum + param.value, 0).toFixed(2) } MW
                                        </div>
                                        < p className = "text-xs text-gray-400" > Capacidad total del escenario </p>
                                            </CardContent>
                                            </Card>

                                            < Card className = "bg-black-200 border-gray-800" >
                                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" >
                                                    <CardTitle className="text-sm font-medium text-gray-300" > Inversión Total </CardTitle>
                                                        < DollarSignIcon className = "h-4 w-4 text-green-500" />
                                                            </CardHeader>
                                                            < CardContent >
                                                            <div className="text-2xl font-bold text-white" >
                                                                { scenarioData.economic_parameters.find(param => param.name === 'Inversión Total')?.value.toFixed(2) || 'N/A' } USD
                                                                    </div>
                                                                    < p className = "text-xs text-gray-400" > Inversión total requerida </p>
                                                                        </CardContent>
                                                                        </Card>
                                                                        </div>

                                                                        < h3 className = "text-xl font-semibold mb-4 text-white" > Parámetros basados en capacidad </h3>
                                                                            < div className = "overflow-x-auto" >
                                                                                <Table>
                                                                                <TableHeader>
                                                                                <TableRow className="bg-gray-700" >
                                                                                    <TableHead className="text-gray-400" > Categoría </TableHead>
                                                                                        < TableHead className = "text-gray-400" > Min </TableHead>
                                                                                            < TableHead className = "text-gray-400" > Max </TableHead>
                                                                                                < TableHead className = "text-gray-400" > Valor </TableHead>
                                                                                                    < TableHead className = "text-gray-400" > Acciones </TableHead>
                                                                                                        </TableRow>
                                                                                                        </TableHeader>
                                                                                                        <TableBody>
    {
        scenarioData.capacity_based_parameters.map((param, index) => (
            <TableRow key= { index } className = "border-b bg-gray-800 border-gray-700" >
            <TableCell className="text-white" > { param.category } </TableCell>
        < TableCell className = "text-white" > { param.capacity_min } </TableCell>
        < TableCell className = "text-white" > { param.capacity_max } </TableCell>
        < TableCell className = "text-white" > { param.value } </TableCell>
        < TableCell >
        <Button color="primary" size = "sm" onClick = {() => handleEdit(param)}> Actualizar </Button>
            </TableCell>
            </TableRow>
                        ))}
</TableBody>
    </Table>
    </div>

    < h3 className = "text-xl font-semibold mb-4 mt-6 text-white" > Parámetros económicos </h3>
        < div className = "overflow-x-auto" >
            <Table>
            <TableHeader>
            <TableRow className="bg-gray-700" >
                <TableHead className="text-gray-400" > Categoría </TableHead>
                    < TableHead className = "text-gray-400" > Nombre </TableHead>
                        < TableHead className = "text-gray-400" > Valor </TableHead>
                            < TableHead className = "text-gray-400" > Acciones </TableHead>
                                </TableRow>
                                </TableHeader>
                                <TableBody>
{
    scenarioData.economic_parameters.map((param, index) => (
        <TableRow key= { index } className = "border-b bg-gray-800 border-gray-700" >
        <TableCell className="text-white" > { param.category } </TableCell>
    < TableCell className = "text-white" > { param.name } </TableCell>
    < TableCell className = "text-white" > { param.value } </TableCell>
    < TableCell >
    <Button color="primary" size = "sm" onClick = {() => handleEdit(param)}> Actualizar </Button>
        </TableCell>
        </TableRow>
                        ))}
</TableBody>
    </Table>
    </div>

    < div className = "mt-6 text-sm text-gray-400" >
        <p>Creado: { new Date(scenarioData.created_at || '').toLocaleString() } </p>
            < p > Actualizado: { new Date(scenarioData.updated_at || '').toLocaleString() } </p>
                </div>

{
    (Object.keys(changes.capacity_based_parameters).length > 0 || Object.keys(changes.economic_parameters).length > 0) && (
        <div className="mt-6" >
            <Button color="success" onClick = { handleConfirmAllChanges } >
                Confirmar todos los cambios
                    </Button>
                    </div>
            )
}

{
    editingParam && (
        <UpdatePopup
                    isOpen={ !!editingParam }
    onClose = { handleClose }
    onSave = { handleSave }
    parameter = { editingParam }
        />
            )
}
</section>
    );
};

export default ScenarioDetail;