'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { Leaf } from 'lucide-react';

type EnvironmentalImpactProps = {
    ahorroCO2: {
        anual: number;
        unidad: string;
        equivalenciaArboles: number;
        equivalenciaAutos: number;
    };
};

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div style= {{
            backgroundColor: '#1A202C',
                padding: '10px',
                    borderRadius: '5px',
                        color: '#63B3ED',
                            fontSize: '14px'
        }
    }>
        <p>{ payload[0].payload.name } </p>
        < p > Valor: { payload[0].value.toFixed(2) } </p>
            </div>
        );
    }

return null;
};

const EnvironmentalImpact: React.FC<EnvironmentalImpactProps> = ({ ahorroCO2 }) => {
    if (!ahorroCO2 || typeof ahorroCO2 !== 'object' ||
        !ahorroCO2.anual || !ahorroCO2.unidad ||
        !ahorroCO2.equivalenciaArboles || !ahorroCO2.equivalenciaAutos) {
        console.error('Error: Invalid or missing CO2 savings data.');
        return (
            <Card className= "bg-black-200 border-gray-800" >
            <CardContent className="text-red-500" >
                Error: Invalid data received Environmental.
                </CardContent>
                    </Card>
        );
    }

const diasDeUsoEvitados = (ahorroCO2.anual / 4.6) * 365;

const data = [
    { name: 'Árboles Plantados', value: ahorroCO2.equivalenciaArboles, fill: '#48BB78' },
    { name: 'Días de Uso de Autos Evitados', value: diasDeUsoEvitados, fill: '#F56565' },
];

return (
    <section id= "impacto-ambiental" className = "mt-8" >
        <Card className="bg-black-200 border-gray-800" >
            <CardHeader>
            <CardTitle className="text-xl font-bold text-white flex items-center" >
                <Leaf className="mr-2" /> Impacto Ambiental
                    </CardTitle>
                    </CardHeader>
                    < CardContent >
                    <div className="mb-4" >
                        <p className="text-2xl font-bold text-green-400" >
                            { ahorroCO2.anual.toFixed(2) } { ahorroCO2.unidad }
</p>
    < p className = "text-sm text-gray-400" >
        Ahorro anual de CO < sub > 2 </sub>
            </p>
            </div>
            < ResponsiveContainer width = "100%" height = { 300} >
                <BarChart
                            data={ data }
layout = "vertical"
margin = {{ top: 10, right: 30, left: 20, bottom: 10 }}
                        >
    <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
            <YAxis type="category" dataKey = "name" />
                <Tooltip content={
                    <CustomTooltip />} / >
                    <Legend verticalAlign="top" height = { 36} />
                        <Bar dataKey="value" fill = {(entry: any) => entry.fill
} />
    </BarChart>
    </ResponsiveContainer>
    < div className = "mt-4 text-sm text-gray-400" >
        <p>
        El ahorro de CO < sub > 2 </sub> equivale a plantar {ahorroCO2.equivalenciaArboles} árboles o evitar {diasDeUsoEvitados.toFixed(0)} días de uso de autos.
            </p>
            < p >
            <em>Nota: </em>1 tonelada de CO<sub>2</sub > ahorrado ≈ 45 árboles plantados o ≈ 79 días de uso de un automóvil.
                        </p>
                </div>
                </CardContent>
                </Card>
                </section>
    );
};

export default EnvironmentalImpact;

