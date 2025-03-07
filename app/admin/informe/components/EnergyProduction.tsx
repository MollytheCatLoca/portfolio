'use client';
import React from 'react';
import { Card, CardContent } from components/ui/Card3";
import { 
    Zap,
    Battery,
    BarChart,
    Percent,
    Gauge,
    Sparkles
} from 'lucide-react';
import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

import { ENERGY_PRODUCTION_DATA } from '../data/solarParkData';

export default function EnergyProduction() {
    const { title, summary, monthlyProduction, total } = ENERGY_PRODUCTION_DATA;

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#1a1f2e] p-2 border border-gray-700 rounded-lg shadow-lg">
                    <p className="text-white text-xs font-medium mb-1">{label}</p>
                    <p className="text-xs text-blue-400">
                        Producción: {payload[0]?.value.toFixed(2)} GWh
                    </p>
                    <p className="text-xs text-yellow-400">
                        Representación: {payload[1]?.value.toFixed(2)}%
                    </p>
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
                            <Zap className="h-5 w-5 text-yellow-400" />
                            <div>
                                <h2 className="text-lg font-bold text-white">{title}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* First Year Production Card */}
                    <Card className="bg-[#1a1f2e] border-none">
                        <CardContent className="p-4">
                            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                <Gauge className="h-4 w-4 text-blue-400" />
                                Producción en el Primer Año
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-gray-400">Producción Total</p>
                                    <p className="text-sm font-bold text-white">
                                        {summary.firstYear.production} {summary.firstYear.unit}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Performance Ratio</p>
                                    <p className="text-sm font-bold text-white">
                                        {summary.firstYear.performanceRatio}%
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Producción Específica</p>
                                    <p className="text-sm font-bold text-white">
                                        {summary.firstYear.specificProduction} {summary.firstYear.unit_specific}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Ganancia Bifacial</p>
                                    <p className="text-sm font-bold text-white">
                                        {summary.firstYear.bifacialGain}%
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Total Energy Card */}
                    <Card className="bg-[#1a1f2e] border-none">
                        <CardContent className="p-4">
                            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-green-400" />
                                Energía Total Inyectada
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                <div>
                                    <p className="text-xs text-gray-400">Energía Total</p>
                                    <p className="text-sm font-bold text-white">
                                        {summary.totalEnergy.injected} {summary.totalEnergy.unit}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Energía Reactiva Total</p>
                                    <p className="text-sm font-bold text-white">
                                        {summary.totalEnergy.reactiveInjected} {summary.totalEnergy.unit_reactive}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Factor de Potencia</p>
                                    <p className="text-sm font-bold text-white">
                                        {summary.totalEnergy.powerFactor}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Monthly Production Chart and Table */}
                <div className="grid grid-cols-3 gap-4">
                    {/* Table */}
                    <Card className="bg-[#1a1f2e] border-none h-full">
                        <CardContent className="p-3">
                            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                                <BarChart className="h-4 w-4 text-purple-400" />
                                Producción Mensual
                            </h3>
                            <div className="overflow-y-auto h-[calc(100%-2rem)]">
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="border-b border-gray-700">
                                            <th className="text-left p-1.5 text-gray-400">Mes</th>
                                            <th className="text-right p-1.5 text-gray-400">GWh</th>
                                            <th className="text-right p-1.5 text-gray-400">PR</th>
                                            <th className="text-right p-1.5 text-gray-400">%</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {monthlyProduction.map((month, index) => (
                                            <tr 
                                                key={month.month}
                                                className={`border-b border-gray-700 ${
                                                    index % 2 === 0 ? 'bg-[#1a1f2e]' : 'bg-[#1f2937]'
                                                }`}
                                            >
                                                <td className="p-1.5 text-white">{month.month}</td>
                                                <td className="p-1.5 text-right text-white">{month.energy.toFixed(2)}</td>
                                                <td className="p-1.5 text-right text-white">{month.performanceRatio.toFixed(2)}%</td>
                                                <td className="p-1.5 text-right text-white">{month.percentage.toFixed(2)}%</td>
                                            </tr>
                                        ))}
                                        <tr className="bg-gray-800 font-medium">
                                            <td className="p-1.5 text-white">TOTAL</td>
                                            <td className="p-1.5 text-right text-white">{total.energy}</td>
                                            <td className="p-1.5 text-right text-white">{total.performanceRatio}%</td>
                                            <td className="p-1.5 text-right text-white">{total.percentage}%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Chart */}
                    <Card className="bg-[#1a1f2e] border-none col-span-2">
                        <CardContent className="p-4">
                            <div style={{ width: '100%', height: '100%' }}>
                                <RechartsBarChart
                                    width={550}
                                    height={400}
                                    data={monthlyProduction}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
                                            value: 'Producción (GWh)', 
                                            angle: -90, 
                                            position: 'insideLeft',
                                            fill: '#718096',
                                            fontSize: 11
                                        }}
                                    />
                                    <YAxis 
                                        yAxisId="right"
                                        orientation="right"
                                        stroke="#718096"
                                        tick={{ fill: '#718096', fontSize: 11 }}
                                        label={{ 
                                            value: 'Representación (%)', 
                                            angle: 90, 
                                            position: 'insideRight',
                                            fill: '#718096',
                                            fontSize: 11
                                        }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Bar 
                                        yAxisId="left"
                                        dataKey="energy" 
                                        name="Producción (GWh)" 
                                        fill="#3b82f6" 
                                    />
                                    <Bar 
                                        yAxisId="right"
                                        dataKey="percentage" 
                                        name="Representación (%)" 
                                        fill="#eab308"
                                    />
                                </RechartsBarChart>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
}