'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Leaf, Trees as Tree, Car } from 'lucide-react';

type Scenario = {
    id_escenario: number;
    nombre: string;
    ahorroCO2: {
        anual: number;
        unidad: string;
        equivalenciaArboles: number;
        equivalenciaAutos: number;
    };
    generacionAnual: Array<{ año: number; generacion: number }>;
};

type GlobalEnvironmentalImpactProps = {
    scenarios: Scenario[];
};

export default function GlobalEnvironmentalImpact({ scenarios }: GlobalEnvironmentalImpactProps) {
    //console.log('GlobalEnvironmentalImpact - Received scenarios:', scenarios);

    if (!scenarios || scenarios.length === 0) {
        console.log('GlobalEnvironmentalImpact - No scenarios available');
        return <div>No hay datos de impacto ambiental disponibles.</div>;
    }

    // Define el coeficiente que quieres aplicar
    const coeficiente = 0.8; // Puedes ajustar este valor según lo que necesites

    // Calculo previo de las métricas ambientales
    const environmentalMetrics = scenarios.map(scenario => {
        const diasDeUsoEvitados = (scenario.ahorroCO2.equivalenciaAutos / 1.3) * 365 * coeficiente; // Aplica el coeficiente aquí
        return {
            nombre: scenario.nombre,
            ahorroCO2: scenario.ahorroCO2.anual,
            equivalenciaArboles: scenario.ahorroCO2.equivalenciaArboles,
            diasDeUsoEvitados // Incluye el valor ajustado
        };
    });

    //console.log('GlobalEnvironmentalImpact - Environmental metrics:', environmentalMetrics);

    const cumulativeCO2Savings = scenarios.map(scenario => {
        let cumulativeSavings = 0;
        return scenario.generacionAnual.map(year => {
            cumulativeSavings += scenario.ahorroCO2.anual * (year.generacion / scenario.generacionAnual[0].generacion);
            return {
                año: year.año,
                [scenario.nombre]: cumulativeSavings
            };
        });
    });

    const combinedCO2Savings = cumulativeCO2Savings[0].map((item, index) => {
        const combined = { año: item.año };
        scenarios.forEach((scenario, i) => {
            combined[scenario.nombre] = cumulativeCO2Savings[i][index][scenario.nombre];
        });
        return combined;
    });

    //console.log('GlobalEnvironmentalImpact - Combined CO2 savings:', combinedCO2Savings);

    return (
        <section id= "impacto-ambiental" className = "mt-8" >
            <Card className="bg-black-200 border-gray-800" >
                <CardHeader>
                <CardTitle className="text-xl font-bold text-white" > Impacto Ambiental Global </CardTitle>
                    </CardHeader>
                    < CardContent >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" >
                        <Card className="bg-gray-800 border-gray-700" >
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" >
                                <CardTitle className="text-sm font-medium text-gray-300" > Ahorro CO2 Total </CardTitle>
                                    < Leaf className = "h-4 w-4 text-green-500" />
                                        </CardHeader>
                                        < CardContent >
                                        <div className="text-2xl font-bold text-white" >
                                            { environmentalMetrics.reduce((sum, metric) => sum + metric.ahorroCO2, 0).toFixed(2) } { scenarios[0].ahorroCO2.unidad }
    </div>
        </CardContent>
        </Card>
        < Card className = "bg-gray-800 border-gray-700" >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" >
                <CardTitle className="text-sm font-medium text-gray-300" > Equivalencia en Árboles </CardTitle>
                    < Tree className = "h-4 w-4 text-green-500" />
                        </CardHeader>
                        < CardContent >
                        <div className="text-2xl font-bold text-white" >
                            { environmentalMetrics.reduce((sum, metric) => sum + metric.equivalenciaArboles, 0) }
                            </div>
                            </CardContent>
                            </Card>
                            < Card className = "bg-gray-800 border-gray-700" >
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" >
                                    <CardTitle className="text-sm font-medium text-gray-300" > Días de Uso de Autos Evitados </CardTitle>
                                        < Car className = "h-4 w-4 text-orange-500" />
                                            </CardHeader>
                                            < CardContent >
                                            <div className="text-2xl font-bold text-white" >
                                                { environmentalMetrics.reduce((sum, metric) => sum + metric.diasDeUsoEvitados, 0).toFixed(0) }
                                                </div>
                                                </CardContent>
                                                </Card>
                                                </div>
                                                < div className = "mb-6" style = {{ height: '400px', width: '100%' }
}>
    <h3 className="text-lg font-semibold mb-2 text-white" > Comparación de Impacto Ambiental </h3>
        < ResponsiveContainer width = "100%" height = { 300} >
            <BarChart data={ environmentalMetrics }>
                <CartesianGrid strokeDasharray="3 3" stroke = "#4a5568" />
                    <XAxis dataKey="nombre" stroke = "#718096" />
                        <YAxis yAxisId="left" orientation = "left" stroke = "#718096" />
                            <YAxis yAxisId="right" orientation = "right" stroke = "#718096" />
                                <Tooltip
                                    contentStyle={ { backgroundColor: '#2D3748', border: '1px solid #4A5568' } }
labelStyle = {{ color: '#E2E8F0' }}
itemStyle = {{ color: '#A0AEC0' }}
                                />
    < Legend wrapperStyle = {{ color: '#A0AEC0' }} />
        < Bar yAxisId = "left" dataKey = "ahorroCO2" fill = "#48BB78" name = "Ahorro CO2 (ton)" />
            <Bar yAxisId="right" dataKey = "equivalenciaArboles" fill = "#4299E1" name = "Equivalencia en Árboles" />
                <Bar yAxisId="right" dataKey = "diasDeUsoEvitados" fill = "#ED8936" name = "Días de Uso de Autos Evitados" />
                    </BarChart>
                    </ResponsiveContainer>
                    </div>
                    < div style = {{ height: '400px', width: '100%' }}>
                        <h3 className="text-lg font-semibold mb-2 text-white" > Ahorro Acumulado de CO2 </h3>
                            < ResponsiveContainer width = "100%" height = { 300} >
                                <LineChart data={ combinedCO2Savings }>
                                    <CartesianGrid strokeDasharray="3 3" stroke = "#4a5568" />
                                        <XAxis dataKey="año" stroke = "#718096" />
                                            <YAxis stroke="#718096" />
                                                <Tooltip
                                    contentStyle={ { backgroundColor: '#2D3748', border: '1px solid #4A5568' } }
labelStyle = {{ color: '#E2E8F0' }}
itemStyle = {{ color: '#A0AEC0' }}
                                />
    < Legend wrapperStyle = {{ color: '#A0AEC0' }} />
{
    scenarios.map((scenario, index) => (
        <Line
                                        key= { scenario.id_escenario }
                                        type = "monotone"
                                        dataKey = { scenario.nombre }
                                        stroke = {`hsl(${index * 120}, 70%, 50%)`}
name = { scenario.nombre }
    />
                                ))}
</LineChart>
    </ResponsiveContainer>
    </div>
    </CardContent>
    </Card>
    </section>
    );
}
