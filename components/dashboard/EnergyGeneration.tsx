'use client';

import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line } from 'recharts';

type EnergyGenerationProps = {
    generacionMensual: { mes: string; generacion: number }[];
    generacionAnual: { año: string; generacion: number }[];
    factorCapacidad: number;
    produccionAnual: { estimada: number; unidad: string };
};

export default function EnergyGeneration({ generacionMensual, generacionAnual, factorCapacidad, produccionAnual }: EnergyGenerationProps) {
    const [viewType, setViewType] = useState('monthly');

    const data = viewType === 'monthly' ? generacionMensual : generacionAnual;

    // Si los datos son incorrectos o están vacíos, muestra los encabezados y los datos que recibimos
    if (!generacionMensual || !generacionAnual || !produccionAnual || typeof factorCapacidad !== 'number') {
        console.error('Error: Datos inválidos recibidos.', { generacionMensual, generacionAnual, factorCapacidad, produccionAnual });
        return (
            <section id= "energia" className = "mt-8" >
                <Card className="bg-black-200 border-gray-800" >
                    <CardHeader className="flex flex-row items-center justify-between" >
                        <CardTitle className="text-xl font-bold text-white" > Generación de Energía </CardTitle>
                            </CardHeader>
                            < CardContent >
                            <p className="text-sm text-gray-300" >
                                <strong>Error: </strong> No se han recibido datos correctos.
                                    </p>
                                    < p className = "text-sm text-gray-300 mt-2" >
                                        <strong>Datos recibidos: </strong>
                                            </p>
                                            < pre className = "text-xs text-gray-400 bg-gray-900 p-4 rounded" >
                                                { JSON.stringify({ generacionMensual, generacionAnual, factorCapacidad, produccionAnual }, null, 2) }
                                                </pre>
                                                </CardContent>
                                                </Card>
                                                </section>
        );
    }

    return (
        <section id= "energia" className = "mt-8" >
            <Card className="bg-black-200 border-gray-800" >
                <CardHeader className="flex flex-row items-center justify-between" >
                    <CardTitle className="text-xl font-bold text-white" > Generación de Energía </CardTitle>
                        < Select value = { viewType } onValueChange = { setViewType } >
                            <SelectTrigger className="w-[180px] bg-black-100 text-white border-gray-700" >
                                <SelectValue placeholder="Seleccionar vista" />
                                    </SelectTrigger>
                                    < SelectContent className = "bg-black-100 text-white border-gray-700" >
                                        <SelectItem value="monthly" > Vista Mensual </SelectItem>
                                            < SelectItem value = "yearly" > Vista Anual </SelectItem>
                                                </SelectContent>
                                                </Select>
                                                </CardHeader>
                                                < CardContent >
                                                <ResponsiveContainer width="100%" height = { 400} >
                                                    <ComposedChart data={ data }>
                                                        <CartesianGrid strokeDasharray="3 3" stroke = "#4a5568" />
                                                            <XAxis dataKey={ viewType === 'monthly' ? 'mes' : 'año' } stroke = "#718096" />
                                                                <YAxis
                                stroke="#718096"
    label = {{
        value: `Generación (${produccionAnual.unidad})`,
            angle: -90,
                position: 'insideLeft',
                    fill: '#718096',
                                }
}
                            />
    < Tooltip
contentStyle = {{ backgroundColor: '#2D3748', border: '1px solid #4A5568' }}
labelStyle = {{ color: '#E2E8F0' }}
itemStyle = {{ color: '#A0AEC0' }}
                            />
    < Legend wrapperStyle = {{ color: '#A0AEC0' }} />
        < Bar dataKey = "generacion" fill = "#4299E1" name = {`Generación (${produccionAnual.unidad})`} />
{ viewType === 'yearly' && <Line type="monotone" dataKey = "generacion" stroke = "#48BB78" name = "Tendencia" />}
</ComposedChart>
    </ResponsiveContainer>
    < div className = "mt-4 text-center" >
        <p className="text-sm text-gray-300" >
            Factor de Capacidad: <span className="font-semibold text-white" > { factorCapacidad } % </span>
                </p>
                < p className = "text-sm text-gray-300 mt-2" >
                    Producción Anual: <span className="font-semibold text-white" > { produccionAnual.estimada.toLocaleString() } { produccionAnual.unidad } </span>
                        </p>
                        </div>
                        </CardContent>
                        </Card>
                        </section>
    );
}
