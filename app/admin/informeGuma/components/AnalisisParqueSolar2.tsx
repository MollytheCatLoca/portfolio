import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useConstants } from '../contexts/ConstantsContext';
import { Sun, Battery, Zap, AlertTriangle, ArrowUpRight, Leaf, DollarSign, BarChart3 } from 'lucide-react';
import { SOLAR_PROJECT_DATA } from '../data/data_gen';
const AnalisisParqueSolar2 = () => {
    const { constants } = useConstants();
    const detailedMetrics = constants.detailedMetrics;

    const defaultMetrics = {
        capacityMW: 0,
        valoresAnuales: {
            generacionTotal: 0,
            autoconsumo: 0,
            inyeccion: 0,
            curtailment: 0
        },
        porcentajes: {
            ahorroTotal: 0,
            autoconsumo: 0,
            inyeccion: 0,
            curtailment: 0
        }
    };



    const calcularInversion = (mw: number): number => {
        // Validar que esté dentro del rango
        if (mw <= 0) return 0;
        if (mw > 15) return SOLAR_PROJECT_DATA[SOLAR_PROJECT_DATA.length - 1].inversion;

        // Si es un valor exacto en los datos
        const exactMatch = SOLAR_PROJECT_DATA.find(d => d.mw === mw);
        if (exactMatch) return exactMatch.inversion;

        // Si necesitamos interpolar
        const lowerBound = SOLAR_PROJECT_DATA.find(d => d.mw <= mw);
        const upperBound = SOLAR_PROJECT_DATA.find(d => d.mw > mw);

        if (lowerBound && upperBound) {
            const ratio = (mw - lowerBound.mw) / (upperBound.mw - lowerBound.mw);
            return lowerBound.inversion + ratio * (upperBound.inversion - lowerBound.inversion);
        }

        return 0;
    };



    const metrics = detailedMetrics || defaultMetrics;

    const inversion = calcularInversion(metrics.capacityMW);

    // Calculamos algunos KPIs adicionales
    const factorPlanta = 0.25; // Ejemplo - idealmente vendría de los datos
    const horasEquivalentes = (metrics.valoresAnuales.generacionTotal / metrics.capacityMW).toFixed(0);
    const emisionesCO2Evitadas = (metrics.valoresAnuales.generacionTotal * 0.4).toFixed(0); // Factor 0.4 tCO2/MWh
    const ahorroEstimado = (metrics.valoresAnuales.autoconsumo * 100).toFixed(0); // Ejemplo - precio 100 USD/MWh

    const MetricCard = ({ title, value, icon: Icon, color, subtitle }) => (
        <Card className= "bg-[#1a1f2e] border-none shadow-lg" >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" >
            <CardTitle className="text-sm font-medium text-gray-300" > { title } </CardTitle>
                < Icon className = {`h-4 w-4 ${color}`
} />
    </CardHeader>
    < CardContent >
    <div className="text-lg font-bold text-white" > { value } </div>
{ subtitle && <p className="text-xs text-gray-400 mt-1" > { subtitle } </p> }
</CardContent>
    </Card>
    );



return (
    <div className= "space-y-6" >
    <Card className="bg-[#131825] border-none shadow-lg" >
        <CardHeader>
        <CardTitle className="text-xl text-white" >
            Análisis de Parque Solar - { metrics.capacityMW.toFixed(2) } MW
                </CardTitle>
                </CardHeader>
                < CardContent >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" >
                    {/* Generación Anual */ }
                    < Card className = "bg-[#1a1f2e] border-none" >
                        <CardHeader>
                        <CardTitle className="text-md text-gray-300" >
                            <div className="flex items-center gap-2" >
                                <Sun className="h-5 w-5 text-yellow-400" />
                                    Generación Anual
                                        </div>
                                        </CardTitle>
                                        </CardHeader>
                                        < CardContent className = "space-y-4" >
                                            <div>
                                            <p className="text-sm text-gray-400" > Generación Total </p>
                                                < p className = "text-lg font-semibold text-white" >
                                                    { Math.round(metrics.valoresAnuales.generacionTotal).toLocaleString() } MWh / año
                                                        </p>
                                                        </div>
                                                        < div >
                                                        <p className="text-sm text-gray-400" > Autoconsumo </p>
                                                            < p className = "text-lg font-semibold text-green-400" >
                                                                { Math.round(metrics.valoresAnuales.autoconsumo).toLocaleString() }
MWh / año
    </p>
    </div>
    < div >
    <p className="text-sm text-gray-400" > Inyección a Red </p>
        < p className = "text-lg font-semibold text-yellow-400" >
            { Math.round(metrics.valoresAnuales.inyeccion).toLocaleString() } MWh / año
                </p>
                </div>
                < div >
                <p className="text-sm text-gray-400" > Curtailment </p>
                    < p className = "text-lg font-semibold text-orange-400" >
                        { metrics.valoresAnuales.curtailment.toLocaleString() } MWh / año
                            </p>
                            </div>
                            </CardContent>
                            </Card>

{/* Porcentajes */ }
<Card className="bg-[#1a1f2e] border-none" >
    <CardHeader>
    <CardTitle className="text-md text-gray-300" >
        <div className="flex items-center gap-2" >
            <BarChart3 className="h-5 w-5 text-blue-400" />
                Distribución Porcentual
                    </div>
                    </CardTitle>
                    </CardHeader>
                    < CardContent className = "space-y-4" >
                        <div>
                        <p className="text-sm text-gray-400" > Ahorro Total del Consumo </p>
                            < p className = "text-lg font-semibold text-white" >
                                { metrics.porcentajes.ahorroTotal.toFixed(1) } %
                                </p>
                                </div>
                                < div >
                                <p className="text-sm text-gray-400" > Autoconsumo </p>
                                    < p className = "text-lg font-semibold text-green-400" >
                                        { metrics.porcentajes.autoconsumo.toFixed(1) } %
                                        </p>
                                        </div>
                                        < div >
                                        <p className="text-sm text-gray-400" > Inyección </p>
                                            < p className = "text-lg font-semibold text-yellow-400" >
                                                { metrics.porcentajes.inyeccion.toFixed(1) } %
                                                </p>
                                                </div>
                                                < div >
                                                <p className="text-sm text-gray-400" > Curtailment </p>
                                                    < p className = "text-lg font-semibold text-orange-400" >
                                                        { metrics.porcentajes.curtailment.toFixed(1) } %
                                                        </p>
                                                        </div>
                                                        </CardContent>
                                                        </Card>
                                                        </div>

{/* KPIs */ }
<div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4" >
    <MetricCard
                            title="Factor de Planta"
value = {`${(factorPlanta * 100).toFixed(1)}%`}
icon = { Battery }
color = "text-blue-400"
subtitle = "Eficiencia de generación"
    />
    <MetricCard
                            title="Horas Equivalentes"
value = {`${horasEquivalentes} h`}
icon = { Sun }
color = "text-yellow-400"
subtitle = "Producción anual"
    />
    <MetricCard
                            title="CO₂ Evitado"
value = {`${emisionesCO2Evitadas} tCO₂`}
icon = { Leaf }
color = "text-green-400"
subtitle = "Impacto ambiental"
    />
    <MetricCard
                            title="Inversion"
value = {`$${inversion.toLocaleString()}`}
icon = { DollarSign }
color = "text-emerald-400"
subtitle = "USD/año"
    />
    </div>
    </CardContent>
    </Card>
    </div>
    );
};

export default AnalisisParqueSolar2;