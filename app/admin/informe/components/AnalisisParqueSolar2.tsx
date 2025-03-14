import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card3";
import { useConstants } from '../contexts/ConstantsContext';
import { Sun, Battery, Zap, AlertTriangle, ArrowUpRight, Leaf, DollarSign, BarChart3, PieChart, TrendingUp, Lightbulb } from 'lucide-react';
import { calcularMetricasManuales } from '../data/constants_pdf';

const AnalisisParqueSolar2 = () => {
    const { constants, isLoading } = useConstants();
    const [calculatedMetrics, setCalculatedMetrics] = useState(null);
    
    // Estado local para métricas calculadas
    const [plantMetrics, setPlantMetrics] = useState({
        plantCapacityKW: 0,
        annualGenerationMWh: 0,
        selfConsumptionMWh: 0,
        gridInjectionMWh: 0,
        curtailmentMWh: 0
    });
    
    // Estado local para KPIs
    const [kpis, setKpis] = useState({
        factorPlanta: 0,
        horasEquivalentes: 0,
        emisionesCO2Evitadas: 0,
        ahorroEstimado: 0,
        autoconsumoPercent: 0,
        inyeccionPercent: 0,
        curtailmentPercent: 0
    });

    // Valores por defecto en caso de que no existan datos
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

    // Efecto para actualizar las métricas calculadas cuando cambian los constants
    useEffect(() => {
        if (!constants || isLoading) return;
        
        console.log("Constants updated:", constants);
        
        // Asegurarse de que detailedMetrics exista
        const detailedMetrics = constants.detailedMetrics || defaultMetrics;
        
        // Calcular métricas de planta
        const newPlantMetrics = {
            plantCapacityKW: detailedMetrics.capacityMW || 0,
            annualGenerationMWh: detailedMetrics.valoresAnuales?.generacionTotal || 0,
            selfConsumptionMWh: detailedMetrics.valoresAnuales?.autoconsumo || 0,
            gridInjectionMWh: detailedMetrics.valoresAnuales?.inyeccion || 0,
            curtailmentMWh: detailedMetrics.valoresAnuales?.curtailment || 0
        };
        
        setPlantMetrics(newPlantMetrics);
        setCalculatedMetrics(detailedMetrics);
        
        // Calcular métricas manuales basadas en la capacidad
        try {
            const metricasManuales = calcularMetricasManuales(newPlantMetrics.plantCapacityKW, constants);
            
            // Calcular KPIs adicionales
            const energiaTotal = newPlantMetrics.annualGenerationMWh;
            
            const newKpis = {
                factorPlanta: (metricasManuales.factorPlanta * 100) || 0,
                horasEquivalentes: energiaTotal > 0 ? Math.round(energiaTotal / (newPlantMetrics.plantCapacityKW || 1)) : 0,
                emisionesCO2Evitadas: Math.round(energiaTotal * 0.4) || 0, // Factor 0.4 tCO2/MWh
                ahorroEstimado: Math.round(energiaTotal * (metricasManuales.precioUnitarioEnergia || 0)) || 0,
                autoconsumoPercent: energiaTotal > 0 ? (newPlantMetrics.selfConsumptionMWh / energiaTotal * 100) : 0,
                inyeccionPercent: energiaTotal > 0 ? (newPlantMetrics.gridInjectionMWh / energiaTotal * 100) : 0,
                curtailmentPercent: energiaTotal > 0 ? (newPlantMetrics.curtailmentMWh / energiaTotal * 100) : 0
            };
            
            setKpis(newKpis);
            console.log("KPIs calculated:", newKpis);
        } catch (error) {
            console.error("Error calculating metrics:", error);
        }
    }, [constants, isLoading]);

    // Si está cargando o no hay datos, mostrar loading
    if (isLoading) {
        return (
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl rounded-xl overflow-hidden">
                <CardContent className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </CardContent>
            </Card>
        );
    }

    // Crear barras de progreso para visualizar porcentajes
    const ProgressBar = ({ percent, color }) => (
        <div className="w-full bg-gray-700 rounded-full h-2 mt-1 mb-2">
            <div 
                className={`h-2 rounded-full ${color}`} 
                style={{ width: `${percent}%` }}
            ></div>
        </div>
    );

    // Componente para cada métrica
    const MetricCard = ({ title, value, icon: Icon, color, subtitle, trend, trendValue }) => (
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-lg overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">{title}</CardTitle>
                <div className={`p-1.5 rounded-lg ${color.replace('text-', 'bg-').replace('400', '900/50')}`}>
                    <Icon className={`h-4 w-4 ${color}`} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-end justify-between">
                    <div className="text-2xl font-bold text-white">{value}</div>
                    {trend && (
                        <div className={`flex items-center text-xs ${trendValue >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {trendValue >= 0 ? (
                                <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                                <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
                            )}
                            {Math.abs(trendValue)}%
                        </div>
                    )}
                </div>
                {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
            </CardContent>
        </Card>
    );

    // Componente para las métricas con barras de progreso
    const DetailMetricCard = ({ label, value, percent, color, icon: Icon }) => (
        <div className="p-4 bg-gray-800/60 rounded-lg border border-gray-700/50">
            <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-1.5">
                    <Icon className={`h-4 w-4 ${color}`} />
                    <span className="text-sm text-gray-400">{label}</span>
                </div>
                <div className="text-right">
                    <span className={`text-lg font-semibold ${color}`}>{value}</span>
                    <span className="text-xs text-gray-500 ml-1">MWh/año</span>
                </div>
            </div>
            <ProgressBar percent={percent} color={color.replace('text', 'bg')} />
            <div className="flex justify-between text-xs text-gray-500">
                <span>0 MWh</span>
                <span>{percent.toFixed(1)}%</span>
            </div>
        </div>
    );

    const metrics = calculatedMetrics || defaultMetrics;
    const capacityMW = metrics.capacityMW || 0;
    const ahorroTotal = metrics.porcentajes?.ahorroTotal || 0;

    return (
        <div className="space-y-6">
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl rounded-xl overflow-hidden">
                <CardHeader className="pb-2 border-b border-gray-800/80">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-500/20 rounded-lg">
                                <Sun className="h-6 w-6 text-yellow-400" />
                            </div>
                            <CardTitle className="text-xl text-white">
                                Análisis de Parque Solar - <span className="text-yellow-400">{capacityMW.toFixed(3)} MW</span>
                            </CardTitle>
                        </div>
                        <div className="px-3 py-1 bg-blue-900/30 border border-blue-700/30 rounded-full text-blue-400 text-xs flex items-center gap-1">
                            <Zap className="h-3.5 w-3.5" />
                            Eficiencia: <span className="font-bold">{kpis.factorPlanta.toFixed(1)}%</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        {/* Tarjetas de KPIs */}
                        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                            <MetricCard
                                title="Factor de Planta"
                                value={`${kpis.factorPlanta.toFixed(2)}%`}
                                icon={Battery}
                                color="text-blue-400"
                                subtitle="Eficiencia de generación"
                                trend={true}
                                trendValue={2.5} // Ejemplo
                            />
                            <MetricCard
                                title="Horas Equivalentes"
                                value={`${kpis.horasEquivalentes} h`}
                                icon={Sun}
                                color="text-yellow-400"
                                subtitle="Producción anual"
                                trend={true}
                                trendValue={3.8} // Ejemplo
                            />
                            <MetricCard
                                title="CO₂ Evitado"
                                value={`${kpis.emisionesCO2Evitadas} tCO₂`}
                                icon={Leaf}
                                color="text-green-400"
                                subtitle="Impacto ambiental"
                                trend={true}
                                trendValue={5.2} // Ejemplo
                            />
                            <MetricCard
                                title="Valor Energía"
                                value={`$${parseInt(kpis.ahorroEstimado).toLocaleString()}`}
                                icon={DollarSign}
                                color="text-emerald-400"
                                subtitle="USD/año"
                                trend={true}
                                trendValue={-1.3} // Ejemplo
                            />
                        </div>

                        {/* Tarjetas de detalle con barras de progreso */}
                        <div className="lg:col-span-3 bg-gray-900/60 backdrop-blur-sm p-5 rounded-xl border border-gray-700/50">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-md font-semibold text-white flex items-center gap-2">
                                    <PieChart className="h-4 w-4 text-purple-400" />
                                    Distribución Energética Anual
                                </h3>
                                <div className="text-xs text-gray-400 px-2 py-1 bg-gray-800 rounded-lg">
                                    Total: <span className="font-bold text-white">{plantMetrics.annualGenerationMWh.toLocaleString()} MWh</span>
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <DetailMetricCard 
                                    label="Autoconsumo"
                                    value={plantMetrics.selfConsumptionMWh.toLocaleString()}
                                    percent={kpis.autoconsumoPercent}
                                    color="text-green-400"
                                    icon={Lightbulb}
                                />
                                
                                <DetailMetricCard 
                                    label="Inyección a Red"
                                    value={plantMetrics.gridInjectionMWh.toLocaleString()}
                                    percent={kpis.inyeccionPercent}
                                    color="text-yellow-400"
                                    icon={ArrowUpRight}
                                />
                                
                                <DetailMetricCard 
                                    label="Curtailment"
                                    value={plantMetrics.curtailmentMWh.toLocaleString()}
                                    percent={kpis.curtailmentPercent}
                                    color="text-orange-400"
                                    icon={AlertTriangle}
                                />
                            </div>
                            
                            <div className="mt-4 p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
                                <div className="flex items-start gap-2">
                                    <Zap className="h-4 w-4 text-blue-400 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm font-medium text-blue-300">Ahorro Total del Consumo</h4>
                                        <div className="flex items-baseline gap-1 mt-1">
                                            <span className="text-lg font-bold text-white">{ahorroTotal.toFixed(1)}%</span>
                                            <span className="text-xs text-gray-400">del consumo energético anual</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AnalisisParqueSolar2;