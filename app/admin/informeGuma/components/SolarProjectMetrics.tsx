import React from 'react';
import { Card, CardContent } from "@/components/ui/Card3";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Sun, Battery, Timer, DollarSign } from 'lucide-react';
import { SOLAR_PROJECT_DATA } from '../data/data_gen';

const SolarProjectMetrics = ({ chartOption }) => {
    const data = SOLAR_PROJECT_DATA;

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        }
        if (num >= 1000) {
            return `${(num / 1000).toFixed(0)}k`;
        }
        return num.toString();
    };

    const formatGeneracion = (num) => `${(num / 1000).toFixed(1)}`;

    const tooltipStyle = {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        border: '1px solid rgba(75, 85, 99, 0.3)',
        borderRadius: '8px',
        padding: '8px 12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        fontSize: '12px',
        color: '#E5E7EB'
    };

    const axisLabelStyle = {
        fontSize: '11px',
        fill: '#718096',
        opacity: 0.8
    };

    return (
        <div className= "w-[983px] h-[378px] p-4 rounded-xl bg-opacity-75 backdrop-blur-lg bg-gray-900" >
        <div className="flex justify-between items-center mb-3" >
            <div className="flex items-center gap-2" >
                <Sun className="h-6 w-6 text-yellow-400" />
                    <h2 className="text-xl font-bold text-white" > Métricas del Proyecto </h2>
                        </div>
                        < div className = "flex gap-3" >
                        {
                            [
                            { label: 'Potencia Óptima', value: '11 - 13 MW', icon: Battery },
                            { label: 'Generación', value: '25 - 30 GWh/año', icon: Sun },
                            { label: 'VAN', value: '$11.1M', icon: DollarSign },
                            { label: 'Payback', value: '4 años', icon: Timer }
                            ].map((metric, idx) => (
                                <Card key= { idx } className = "bg-gray-800/50 border-gray-700/50" >
                                <CardContent className="p-3" >
                            <div className="flex items-center gap-2" >
                            <metric.icon className="h-5 w-5 text-gray-400" />
                            <div>
                            <p className="text-sm font-medium text-gray-400 leading-tight" > { metric.label } </p>
                            < p className = "text-base font-bold text-white leading-tight" > { metric.value } </p>
                            </div>
                            </div>
                            </CardContent>
                            </Card>
                            ))
                        }
                            </div>
                            </div>

                            < div className = "grid grid-cols-1 gap-3 h-[290px]" >
                                <Card className="bg-gray-800/50 border-gray-700/50" >
                                    <CardContent className="p-4" >
                                        { chartOption === 1 ? (
                                            <>
                                            <p className= "text-sm font-medium text-gray-400 mb-2" > Generación vs Inversión </p>
                                                < div className = "h-[230px]" >
                                                    <ResponsiveContainer width="100%" height = "100%" >
                                                        <LineChart data={ data } margin = {{ top: 10, right: 35, bottom: 25, left: 15 }
}>
    <XAxis
                                                dataKey="mw"
tick = {{ fontSize: 11 }}
stroke = "#718096"
tickFormatter = {(value) => `${value} MW`}
label = {{ value: 'Potencia instalada', position: 'bottom', offset: 15, ...axisLabelStyle }}
                                            />
    < YAxis
yAxisId = "left"
tick = {{ fontSize: 11 }}
stroke = "#82ca9d"
tickFormatter = { formatGeneracion }
label = {{ value: 'GWh', angle: -90, position: 'insideLeft', offset: -5, ...axisLabelStyle }}
                                            />
    < YAxis
yAxisId = "right"
orientation = "right"
tick = {{ fontSize: 11 }}
stroke = "#8884d8"
tickFormatter = { formatNumber }
label = {{ value: 'USD', angle: 90, position: 'insideRight', offset: -5, ...axisLabelStyle }}
                                            />
    < Tooltip
contentStyle = { tooltipStyle }
formatter = {(value, name) => {
    if (name === "Generación") return [`${formatGeneracion(value)} GWh`, name];
    return [`$${formatNumber(value)}`, name];
}}
labelFormatter = {(value) => `${value} MW`}
                                            />
    < Line yAxisId = "left" type = "natural" dataKey = "generacion" stroke = "#82ca9d" dot = {{ r: 3 }} name = "Generación" strokeWidth = { 2} />
        <Line yAxisId="right" type = "natural" dataKey = "inversion" stroke = "#8884d8" dot = {{ r: 3 }} name = "Inversión" strokeWidth = { 2} />
            </LineChart>
            </ResponsiveContainer>
            </div>
            </>
                        ) : (
    <>
    <p className= "text-sm font-medium text-gray-400 mb-2" > Retorno vs Payback </p>
        < div className = "h-[230px]" >
            <ResponsiveContainer width="100%" height = "100%" >
                <LineChart data={ data } margin = {{ top: 10, right: 35, bottom: 25, left: 15 }}>
                    <XAxis
                                                dataKey="mw"
tick = {{ fontSize: 11 }}
stroke = "#718096"
tickFormatter = {(value) => `${value} MW`}
label = {{ value: 'Potencia instalada', position: 'bottom', offset: 15, ...axisLabelStyle }}
                                            />
    < YAxis
yAxisId = "left"
tick = {{ fontSize: 11 }}
stroke = "#ffc658"
domain = { [0, 40]}
tickFormatter = {(value) => `${value}%`}
label = {{ value: 'TIR', angle: -90, position: 'insideLeft', offset: -5, ...axisLabelStyle }}
                                            />
    < YAxis
yAxisId = "right"
orientation = "right"
tick = {{ fontSize: 11 }}
stroke = "#ff7300"
domain = { [0, 10]}
tickFormatter = {(value) => `${value}a`}
label = {{ value: 'Años', angle: 90, position: 'insideRight', offset: -5, ...axisLabelStyle }}
                                            />
    < Tooltip
contentStyle = { tooltipStyle }
formatter = {(value, name) => {
    if (name === "Retorno") return [`${value}%`, name];
    return [`${value} años`, name];
}}
labelFormatter = {(value) => `${value} MW`}
                                            />
    < Line yAxisId = "left" type = "natural" dataKey = "retorno" stroke = "#ffc658" dot = {{ r: 3 }} name = "Retorno" strokeWidth = { 2} />
        <Line yAxisId="right" type = "natural" dataKey = "payback" stroke = "#ff7300" dot = {{ r: 3 }} name = "Payback" strokeWidth = { 2} />
            </LineChart>
            </ResponsiveContainer>
            </div>
            </>
                        )}
</CardContent>
    </Card>
    </div>
    </div>
    );
};

export default SolarProjectMetrics;
