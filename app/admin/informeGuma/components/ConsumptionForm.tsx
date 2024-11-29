import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card3";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Sun } from 'lucide-react';
import { COMPANY_ENERGY_DATA } from '../data/data_gen';

const EnergyDashboard = () => {
    const data = COMPANY_ENERGY_DATA;

    const avgEnergy = data.reduce((acc, curr) => acc + curr.energia, 0) / data.length;
    const avgCostEnergy = data.reduce((acc, curr) => acc + curr.costoEnergia_MWh, 0) / data.length;
    const annualEnergy = avgEnergy * 12;
    const annualCost = (avgCostEnergy + data.reduce((acc, curr) => acc + curr.costoPotencia_MWh, 0) / data.length) * annualEnergy;

    return (
        <div className= "w-full max-w-6xl mx-auto p-6 md:p-10 rounded-3xl bg-opacity-75 backdrop-blur-lg bg-gray-900"
    style = {{ width: '350mm', height: '210mm' }
}>
    <div className="flex items-center gap-4 mb-8" >
        <Sun className="h-8 w-8 text-yellow-400" />
            <h2 className="text-3xl font-bold text-white" > Análisis de Consumo Energético </h2>
                </div>

                < div className = "grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8" >
                    <Card className="bg-gray-800 border-gray-700" >
                        <CardContent className="pt-6" >
                            <h3 className="text-sm font-medium text-gray-400" > Consumo Mensual </h3>
                                < p className = "text-3xl font-bold text-white mt-2" > { avgEnergy.toFixed(0) } MWh </p>
                                    </CardContent>
                                    </Card>

                                    < Card className = "bg-gray-800 border-gray-700" >
                                        <CardContent className="pt-6" >
                                            <h3 className="text-sm font-medium text-gray-400" > Costo Energía </h3>
                                                < p className = "text-3xl font-bold text-white mt-2" > ${ avgCostEnergy.toFixed(2) } </p>
                                                    </CardContent>
                                                    </Card>

                                                    < Card className = "bg-gray-800 border-gray-700" >
                                                        <CardContent className="pt-6" >
                                                            <h3 className="text-sm font-medium text-gray-400" > Energía Anual </h3>
                                                                < p className = "text-3xl font-bold text-white mt-2" > { annualEnergy.toFixed(0) } MWh </p>
                                                                    </CardContent>
                                                                    </Card>

                                                                    < Card className = "bg-gray-800 border-gray-700" >
                                                                        <CardContent className="pt-6" >
                                                                            <h3 className="text-sm font-medium text-gray-400" > Costo Anual </h3>
                                                                                < p className = "text-3xl font-bold text-white mt-2" > ${ (annualCost / 1000).toFixed(0) } k </p>
                                                                                    </CardContent>
                                                                                    </Card>
                                                                                    </div>

                                                                                    < div className = "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8" >
                                                                                        <Card className="bg-gray-800 border-gray-700" >
                                                                                            <CardHeader>
                                                                                            <CardTitle className="text-white" > Consumo vs Costos Unitarios </CardTitle>
                                                                                                </CardHeader>
                                                                                                < CardContent className = "h-96" >
                                                                                                    <ResponsiveContainer width="100%" height = "100%" >
                                                                                                        <LineChart data={ data }>
                                                                                                            <CartesianGrid strokeDasharray="3 3" stroke = "#4a5568" />
                                                                                                                <XAxis dataKey="month" stroke = "#718096" />
                                                                                                                    <YAxis yAxisId="left" label = {{ value: 'MWh', angle: -90, position: 'insideLeft', fill: '#718096' }} stroke = "#718096" />
                                                                                                                        <YAxis yAxisId="right" orientation = "right" label = {{ value: 'USD/MWh', angle: 90, position: 'insideRight', fill: '#718096' }} stroke = "#718096" />
                                                                                                                            <Tooltip contentStyle={ { backgroundColor: '#2D3748', border: '1px solid #4A5568', borderRadius: '6px' } } />
                                                                                                                                < Legend />
                                                                                                                                <Line yAxisId="left" type = "monotone" dataKey = "energia" stroke = "#8884d8" name = "Consumo" />
                                                                                                                                    <Line yAxisId="right" type = "monotone" dataKey = "costoEnergia_MWh" stroke = "#82ca9d" name = "Costo Energía" />
                                                                                                                                        <Line yAxisId="right" type = "monotone" dataKey = "costoPotencia_MWh" stroke = "#ff7300" name = "Costo Potencia" />
                                                                                                                                            </LineChart>
                                                                                                                                            </ResponsiveContainer>
                                                                                                                                            </CardContent>
                                                                                                                                            </Card>

                                                                                                                                            < Card className = "bg-gray-800 border-gray-700" >
                                                                                                                                                <CardHeader>
                                                                                                                                                <CardTitle className="text-white" > Estructura de Costos </CardTitle>
                                                                                                                                                    </CardHeader>
                                                                                                                                                    < CardContent className = "h-96" >
                                                                                                                                                        <ResponsiveContainer width="100%" height = "100%" >
                                                                                                                                                            <BarChart data={ data }>
                                                                                                                                                                <CartesianGrid strokeDasharray="3 3" stroke = "#4a5568" />
                                                                                                                                                                    <XAxis dataKey="month" stroke = "#718096" />
                                                                                                                                                                        <YAxis stroke="#718096" />
                                                                                                                                                                            <Tooltip contentStyle={ { backgroundColor: '#2D3748', border: '1px solid #4A5568', borderRadius: '6px' } } />
                                                                                                                                                                                < Legend />
                                                                                                                                                                                <Bar dataKey="costoEnergia_MWh" stackId = "a" fill = "#82ca9d" name = "Costo Energía" />
                                                                                                                                                                                    <Bar dataKey="costoPotencia_MWh" stackId = "a" fill = "#8884d8" name = "Costo Potencia" />
                                                                                                                                                                                        </BarChart>
                                                                                                                                                                                        </ResponsiveContainer>
                                                                                                                                                                                        </CardContent>
                                                                                                                                                                                        </Card>
                                                                                                                                                                                        </div>
                                                                                                                                                                                        </div>
    );
};

export default EnergyDashboard;
