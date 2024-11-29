import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, Percent } from 'lucide-react';
import { SENSITIVITY_GEN_DATA } from '../data/data_gen';


const Dashboard = () => {
    // Datos sintéticos definidos directamente para garantizar su existencia
    const data = SENSITIVITY_GEN_DATA

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className= "bg-gray-800 p-3 border border-gray-700 rounded-lg shadow-lg" >
                <p className="text-gray-300 mb-1" > Aumento de Energía: { label }% </p>
            {
                payload.map((pld, idx) => (
                    <p key= { idx } style = {{ color: pld.color }} className = "font-medium" >
                        { pld.name }: { pld.value > 0 ? '+' : '' } { pld.value }%
                            </p>
                    ))}
</div>
            );
        }
return null;
    };

const axisLabelStyle = {
    fontSize: '11px',
    fill: '#718096',
    opacity: 0.8
};

return (
    <div className= "w-[270mm] h-[200mm] p-6 rounded-xl bg-opacity-75 backdrop-blur-lg bg-gray-900" >
    <div className="flex justify-between items-center mb-6" >
        <div className="flex items-center gap-3" >
            <TrendingUp className="h-6 w-6 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white" > Análisis de Sensibilidad - Aumento de Energía </h2>
                    </div>
                    < div className = "flex gap-4" >
                    {
                        [
                            { label: 'Rango de Análisis', value: '0% - 25%', icon: Percent },
                            { label: 'Variables Analizadas', value: 'Δ TIR y Δ Payback', icon: TrendingUp }
                        ].map((metric, idx) => (
                            <Card key= { idx } className = "bg-gray-800/50 border-gray-700/50" >
                            <CardContent className="p-4" >
                        <div className="flex items-center gap-3" >
                        <metric.icon className="h-6 w-6 text-gray-400" />
                        <div>
                        <p className="text-sm font-medium text-gray-400 leading-tight" > { metric.label } </p>
                        < p className = "text-lg font-bold text-white leading-tight" > { metric.value } </p>
                        </div>
                        </div>
                        </CardContent>
                        </Card>
                        ))
                    }
                        </div>
                        </div>

                        < div className = "grid grid-cols-2 gap-6 h-[290px]" >
                            <Card className="bg-gray-800/50 border-gray-700/50" >
                                <CardContent className="p-6" >
                                    <p className="text-sm font-medium text-gray-400 mb-4" > Variación de TIR vs.Aumento de Energía </p>
                                        < div className = "h-[230px]" >
                                            <ResponsiveContainer width="100%" height = "100%" >
                                                <LineChart 
                                    data={ data }
margin = {{ top: 10, right: 35, bottom: 25, left: 15 }}
                                >
    <CartesianGrid strokeDasharray="3 3" stroke = "#374151" />
        <XAxis
                                        dataKey="Aumento"
tick = {{ fontSize: 11 }}
stroke = "#718096"
tickFormatter = {(value) => `${value}`}
label = {{
    value: 'Aumento de Energía (%)',
        position: 'bottom',
            offset: 15, 
                                            ...axisLabelStyle
}}
                                    />
    < YAxis
tick = {{ fontSize: 11 }}
stroke = "#ffc658"
domain = { [0, 35]}
tickFormatter = {(value) => `${value}`}
label = {{
    value: 'Variación TIR (%)',
        angle: -90,
            position: 'insideLeft',
                offset: -5, 
                                            ...axisLabelStyle
}}
                                    />
    < Tooltip content = {< CustomTooltip />} />
        < Line
type = "monotone"
dataKey = "VariacionTIR"
stroke = "#ffc658"
strokeWidth = { 2}
dot = { false}
name = "Δ TIR"
    />
    </LineChart>
    </ResponsiveContainer>
    </div>
    </CardContent>
    </Card>

    < Card className = "bg-gray-800/50 border-gray-700/50" >
        <CardContent className="p-6" >
            <p className="text-sm font-medium text-gray-400 mb-4" > Variación de Payback vs.Aumento de Energía </p>
                < div className = "h-[230px]" >
                    <ResponsiveContainer width="100%" height = "100%" >
                        <LineChart 
                                    data={ data }
margin = {{ top: 10, right: 35, bottom: 25, left: 15 }}
                                >
    <CartesianGrid strokeDasharray="3 3" stroke = "#374151" />
        <XAxis
                                        dataKey="Aumento"
tick = {{ fontSize: 11 }}
stroke = "#718096"
tickFormatter = {(value) => `${value}`}
label = {{
    value: 'Aumento de Energía (%)',
        position: 'bottom',
            offset: 15, 
                                            ...axisLabelStyle
}}
                                    />
    < YAxis
tick = {{ fontSize: 11 }}
stroke = "#8884d8"
domain = { [-40, 5]}
tickFormatter = {(value) => `${value}`}
label = {{
    value: 'Variación Payback (%)',
        angle: -90,
            position: 'insideLeft',
                offset: -5, 
                                            ...axisLabelStyle
}}
                                    />
    < Tooltip content = {< CustomTooltip />} />
        < Line
type = "monotone"
dataKey = "VariacionPayback"
stroke = "#8884d8"
strokeWidth = { 2}
dot = { false}
name = "Δ Payback"
    />
    </LineChart>
    </ResponsiveContainer>
    </div>
    </CardContent>
    </Card>
    </div>
    </div>
    );
};

export default Dashboard;