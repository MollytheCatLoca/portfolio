"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart } from 'recharts';

type Scenario = {
    id_escenario: number;
    nombre: string;
    generacionAnual: Array<{ año: number; generacion: number }>;
    generacionMensual: Array<{ mes: string; generacion: number }>;
};

type GlobalEnergyGenerationProps = {
    scenarios: Scenario[];
};

export default function GlobalEnergyGeneration({ scenarios }: GlobalEnergyGenerationProps) {
    const [viewType, setViewType] = useState('monthly');

    const combineMonthlyData = () => {
        const combinedData = [];
        for (let i = 0; i < 12; i++) {
            const monthData = {
                mes: scenarios[0].generacionMensual[i].mes,
                total: 0,
            };
            scenarios.forEach((scenario, index) => {
                monthData[`Escenario ${index + 1}`] = scenario.generacionMensual[i].generacion;
                monthData.total += scenario.generacionMensual[i].generacion;
            });
            combinedData.push(monthData);
        }
        return combinedData;
    };

    const combineYearlyData = () => {
        const combinedData = [];
        for (let i = 0; i < scenarios[0].generacionAnual.length; i++) {
            const yearData = {
                año: scenarios[0].generacionAnual[i].año,
                total: 0,
            };
            scenarios.forEach((scenario, index) => {
                yearData[`Escenario ${index + 1}`] = scenario.generacionAnual[i].generacion;
                yearData.total += scenario.generacionAnual[i].generacion;
            });
            combinedData.push(yearData);
        }
        return combinedData;
    };

    const data = viewType === 'monthly' ? combineMonthlyData() : combineYearlyData();

    return (
        <section id= "energia" className = "mt-8" >
            <Card className="bg-black-200 border-gray-800" >
                <CardHeader className="flex flex-row items-center justify-between" >
                    <CardTitle className="text-xl font-bold text-white" > Generación de Energía Global </CardTitle>
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
                                                                <YAxis stroke="#718096" label = {{ value: 'Generación (MWh)', angle: -90, position: 'insideLeft', fill: '#718096' }
} />
    < Tooltip
contentStyle = {{ backgroundColor: '#2D3748', border: '1px solid #4A5568' }}
labelStyle = {{ color: '#E2E8F0' }}
itemStyle = {{ color: '#A0AEC0' }}
                            />
    < Legend wrapperStyle = {{ color: '#A0AEC0' }} />
{
    scenarios.map((_, index) => (
        <Bar key= { index } dataKey = {`Escenario ${index + 1}`} fill = {`hsl(${index * 120}, 70%, 50%)`} name = {`Escenario ${index + 1}`} />
                            ))}
<Line type="monotone" dataKey = "total" stroke = "#48BB78" name = "Total" />
    </ComposedChart>
    </ResponsiveContainer>
    </CardContent>
    </Card>
    </section>
    );
}