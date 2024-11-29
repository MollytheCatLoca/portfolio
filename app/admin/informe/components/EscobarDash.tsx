import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card3";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Sun, Battery, PiggyBank, Zap } from 'lucide-react';

const EscoDash = () => {
    const consumptionData = [
        { id: 1, name: "POLIDEPORTIVO MUNICIPAL", power: 30, monthlyConsumption: 7164, energyPrice: 127, monthlySavings: 909828 },
        { id: 2, name: "MICROESTADIO", power: 28, monthlyConsumption: 4910, energyPrice: 127, monthlySavings: 623570 },
        { id: 3, name: "ASBORNO 701", power: 26, monthlyConsumption: 9759, energyPrice: 127, monthlySavings: 1239393 },
        { id: 4, name: "POLIDEPORTIVO MATHEU", power: 9, monthlyConsumption: 2205, energyPrice: 127, monthlySavings: 280035 }
    ];

    const totalConsumption = consumptionData.reduce((acc, curr) => acc + curr.monthlyConsumption, 0);
    const totalPower = consumptionData.reduce((acc, curr) => acc + curr.power, 0);
    const totalSavings = consumptionData.reduce((acc, curr) => acc + curr.monthlySavings, 0);
    const annualSavings = totalSavings * 12;

    const chartData = consumptionData.map(item => ({
        name: item.name.split(' ')[1] || item.name,
        consumo: item.monthlyConsumption,
        ahorro: item.monthlySavings / 1000,
        potencia: item.power
    }));

    return (
        <div className="w-[270mm] h-[210mm] p-6 bg-gray-50 dark:bg-gray-950">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold dark:text-white">Parque Solar Municipal Escobar</h2>
                <div className="px-3 py-1.5 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                    <span className="text-yellow-700 dark:text-yellow-300 text-sm font-semibold">
                        Proyecto de Energía Renovable
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-4">
                <Card className="bg-white dark:bg-gray-900 border-0 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between p-3">
                        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Potencia Solar Total</CardTitle>
                        <Sun className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                        <div className="text-2xl font-bold">{totalPower} kW</div>
                        <p className="text-xs text-gray-500">Capacidad instalada</p>
                    </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900 border-0 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between p-3">
                        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Consumo Total</CardTitle>
                        <Battery className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                        <div className="text-2xl font-bold">{totalConsumption.toLocaleString()} kWh</div>
                        <p className="text-xs text-gray-500">{(totalConsumption * 12).toLocaleString()} kWh/año</p>
                    </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900 border-0 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between p-3">
                        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Ahorro Mensual</CardTitle>
                        <PiggyBank className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                        <div className="text-2xl font-bold">$ {totalSavings.toLocaleString()}</div>
                        <p className="text-xs text-gray-500">$ {annualSavings.toLocaleString()} /año</p>
                    </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900 border-0 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between p-3">
                        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Precio Energía</CardTitle>
                        <Zap className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                        <div className="text-2xl font-bold">$ {consumptionData[0].energyPrice}</div>
                        <p className="text-xs text-gray-500">por kWh con impuestos</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <Card className="bg-white dark:bg-gray-900 border-0 shadow-lg">
                    <CardHeader className="p-3">
                        <CardTitle className="text-base font-semibold">Consumo por Instalación</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis
                                        dataKey="name"
                                        angle={-45}
                                        textAnchor="end"
                                        height={60}
                                        interval={0}
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                    />
                                    <YAxis tick={{ fill: '#6b7280' }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#ffffff',
                                            borderRadius: '0.5rem',
                                            border: 'none',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                        }}
                                    />
                                    <Legend />
                                    <Bar dataKey="consumo" fill="#3b82f6" name="Consumo (kWh)" radius={[6, 6, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900 border-0 shadow-lg">
                    <CardHeader className="p-3">
                        <CardTitle className="text-base font-semibold">Ahorro Mensual por Instalación</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis
                                        dataKey="name"
                                        angle={-45}
                                        textAnchor="end"
                                        height={60}
                                        interval={0}
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                    />
                                    <YAxis tick={{ fill: '#6b7280' }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#ffffff',
                                            borderRadius: '0.5rem',
                                            border: 'none',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                        }}
                                    />
                                    <Legend />
                                    <Bar dataKey="ahorro" fill="#10b981" name="Ahorro (miles $)" radius={[6, 6, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-white dark:bg-gray-900 border-0 shadow-lg">
                <CardHeader className="p-3">
                    <CardTitle className="text-base font-semibold">Detalle por Instalación</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50 dark:bg-gray-800">
                                    <TableHead>Instalación</TableHead>
                                    <TableHead className="text-right">Potencia (kW)</TableHead>
                                    <TableHead className="text-right">Consumo Mensual (kWh)</TableHead>
                                    <TableHead className="text-right">Precio Energía ($)</TableHead>
                                    <TableHead className="text-right">Ahorro Mensual ($)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {consumptionData.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell className="text-right">{item.power}</TableCell>
                                        <TableCell className="text-right">{item.monthlyConsumption.toLocaleString()}</TableCell>
                                        <TableCell className="text-right">{item.energyPrice}</TableCell>
                                        <TableCell className="text-right">{item.monthlySavings.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default EscoDash;