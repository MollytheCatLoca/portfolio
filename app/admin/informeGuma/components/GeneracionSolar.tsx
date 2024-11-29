'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line } from 'recharts';

// Datos sintéticos para la generación mensual de energía basada en la generación típica de un parque solar.
const generacionMensual = [
    { mes: "Enero", generacion: 250 },
    { mes: "Febrero", generacion: 240 },
    { mes: "Marzo", generacion: 210 },
    { mes: "Abril", generacion: 175 },
    { mes: "Mayo", generacion: 140 },
    { mes: "Junio", generacion: 120 },
    { mes: "Julio", generacion: 125 },
    { mes: "Agosto", generacion: 150 },
    { mes: "Septiembre", generacion: 180 },
    { mes: "Octubre", generacion: 200 },
    { mes: "Noviembre", generacion: 220 },
    { mes: "Diciembre", generacion: 285 },
];

// Generación anual acumulada para vista anual.
const generacionAnual = [
    { año: "2024", generacion: 2295 },
];

// Factor de capacidad calculado aproximadamente.
const factorCapacidad = 24.5;

// Producción anual esperada.
const produccionAnual = { estimada: 2295, unidad: "MWh" };

export default function EnergyGeneration() {
    const [viewType, setViewType] = useState('monthly');

    const data = viewType === 'monthly' ? generacionMensual : generacionAnual;

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
