'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/Card3';
import { 
    Sun, 
    ThermometerSun,
    Calendar,
    LineChart as LineChartIcon
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

import { ENERGY_RESOURCE_DATA } from '../data/solarParkData';


export default function EnergyResource() {
    const { title, subtitle, monthlyData, annualData, units } = ENERGY_RESOURCE_DATA;

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#1a1f2e] p-2 border border-gray-700 rounded-lg shadow-lg">
                    <p className="text-white text-xs font-medium mb-1">{label}</p>
                    {payload.map((item, index) => (
                        <p key={index} className="text-xs" style={{ color: item.color }}>
                            {item.name}: {item.value.toFixed(1)} {units[item.name.toLowerCase()]}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="bg-black-200 border-gray-800" style={{ width: '270mm', height: '210mm' }}>
            <CardContent className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <Sun className="h-5 w-5 text-yellow-400" />
                            <div>
                                <h2 className="text-lg font-bold text-white">{title}</h2>
                                <p className="text-xs text-gray-400">{subtitle}</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-400">GHI Anual</p>
                        <p className="text-sm font-bold text-white">
                            {annualData.ghi} {units.ghi}
                        </p>
                    </div>
                </div>

                {/* Layout apaisado con grid */}
                <div className="grid grid-cols-3 gap-4" style={{ height: 'calc(210mm - 8rem)' }}>
                    {/* Tabla */}
                    <Card className="bg-[#1a1f2e] border-none h-full">
                        <CardContent className="p-3">
                            <div className="overflow-y-auto h-full">
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="border-b border-gray-700">
                                            <th className="text-left p-1.5 text-gray-400">Mes</th>
                                            <th className="text-right p-1.5 text-gray-400">GHI</th>
                                            <th className="text-right p-1.5 text-gray-400">DHI</th>
                                            <th className="text-right p-1.5 text-gray-400">Temp</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {monthlyData.map((month, index) => (
                                            <tr 
                                                key={month.month}
                                                className={`border-b border-gray-700 ${
                                                    index % 2 === 0 ? 'bg-[#1a1f2e]' : 'bg-[#1f2937]'
                                                }`}
                                            >
                                                <td className="p-1.5 text-white">{month.month}</td>
                                                <td className="p-1.5 text-right text-white">{month.ghi.toFixed(1)}</td>
                                                <td className="p-1.5 text-right text-white">{month.dhi.toFixed(1)}</td>
                                                <td className="p-1.5 text-right text-white">{month.temperature.toFixed(1)}</td>
                                            </tr>
                                        ))}
                                        <tr className="bg-gray-800 font-medium">
                                            <td className="p-1.5 text-white">Año</td>
                                            <td className="p-1.5 text-right text-white">{annualData.ghi.toFixed(1)}</td>
                                            <td className="p-1.5 text-right text-white">{annualData.dhi.toFixed(1)}</td>
                                            <td className="p-1.5 text-right text-white">{annualData.temperature.toFixed(1)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Gráfico */}
                    <Card className="bg-[#1a1f2e] border-none col-span-2 h-full">
                        <CardContent className="p-4">
                            <div style={{ width: '100%', height: '100%' }}>
                                <LineChart 
                                    width={550} 
                                    height={450} 
                                    data={monthlyData}
                                    margin={{ top: 20, right: 40, left: 40, bottom: 20 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                                    <XAxis 
                                        dataKey="month" 
                                        stroke="#718096"
                                        tick={{ fill: '#718096', fontSize: 11 }}
                                    />
                                    <YAxis 
                                        yAxisId="left"
                                        stroke="#718096"
                                        tick={{ fill: '#718096', fontSize: 11 }}
                                        label={{ 
                                            value: 'Radiación (kWh/m²/mes)', 
                                            angle: -90, 
                                            position: 'insideLeft',
                                            fill: '#718096',
                                            fontSize: 11,
                                            offset: -30
                                        }}
                                    />
                                    <YAxis 
                                        yAxisId="right"
                                        orientation="right"
                                        stroke="#718096"
                                        tick={{ fill: '#718096', fontSize: 11 }}
                                        label={{ 
                                            value: 'Temperatura (°C)', 
                                            angle: 90, 
                                            position: 'insideRight',
                                            fill: '#718096',
                                            fontSize: 11,
                                            offset: -25
                                        }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend 
                                        wrapperStyle={{ fontSize: '11px' }}
                                        iconSize={8}
                                    />
                                    <Line
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey="ghi"
                                        name="GHI"
                                        stroke="#eab308"
                                        strokeWidth={2}
                                        dot={{ fill: '#eab308', r: 3 }}
                                    />
                                    <Line
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey="dhi"
                                        name="DHI"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        dot={{ fill: '#3b82f6', r: 3 }}
                                    />
                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="temperature"
                                        name="Temperatura"
                                        stroke="#ef4444"
                                        strokeWidth={2}
                                        dot={{ fill: '#ef4444', r: 3 }}
                                    />
                                </LineChart>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
}