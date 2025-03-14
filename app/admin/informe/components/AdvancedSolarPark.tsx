"use client"
import { useMemo } from 'react';
import React from 'react';
import { Sun, Battery, Cpu, Gauge, LayoutGrid, Zap, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card3";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, ReferenceLine, CartesianGrid } from 'recharts';
import { calcularMetricasManuales } from '../data/constants_pdf';
import { useConstants } from '../contexts/ConstantsContext';

const TucumanSolarTechnical: React.FC<Props> = () => {
    const { constants } = useConstants();

    const calculatePlantMetrics = () => ({
        plantCapacityKW: constants.detailedMetrics.capacityMW,
        annualGenerationMWh: constants.detailedMetrics.valoresAnuales.generacionTotal,
        selfConsumptionMWh: constants.detailedMetrics.valoresAnuales.autoconsumo,
        gridInjectionMWh: constants.detailedMetrics.valoresAnuales.inyeccion,
        curtailmentMWh: constants.detailedMetrics.valoresAnuales.curtailment
    });

    const plantMetrics = calculatePlantMetrics();
    const manualMetrics = calcularMetricasManuales(plantMetrics.plantCapacityKW);
    const dcAcRatio = 0.85;
   
    
        // Calculamos algunos KPIs adicionales
    const factorPlanta = manualMetrics.factorPlanta * 100;

    const panel = {
        modelo: "TrinaSolar 550W",
        potencia: 550,
        eficiencia: factorPlanta.toFixed(2),
        voc: 49.5,
        isc: 13.85,
        vmpp: 41.5,
        impp: 13.25,
        temperatureCoef: -0.34,
        dimensions: {
            length: 2384,
            width: 1096,
            height: 35
        }
    };

    const inverter = {
        modelo: "Huawei SUN2000-40KTL",
        potencia: 40,
        eficiencia: 98.6,
        mpptRangeMin: 200,
        mpptRangeMax: 1000,
        maxInputCurrent: 22,
        maxStrings: 8,
        stringsPerMPPT: 2
    };

    const potenciaDC = plantMetrics.plantCapacityKW * 1000;
    const totalDCPowerW = potenciaDC * 1000;
    const potenciaAC = potenciaDC * dcAcRatio;
    const panelPowerW = panel.potencia;
    const numberOfPanels = Math.ceil(totalDCPowerW / panelPowerW);
    const inverterPowerKW = inverter.potencia;
    const numberOfInverters = Math.ceil(potenciaAC / inverterPowerKW);
    const modulesPerString = 13;
    const totalStrings = Math.ceil(numberOfPanels / modulesPerString);
    const stringsPerInverter = Math.ceil(totalStrings / numberOfInverters);

    if (stringsPerInverter > inverter.maxStrings) {
        console.warn("El número de strings por inversor excede el máximo permitido.");
    }

    const equipmentData = {
        paneles: {
            ...panel,
            cantidad: numberOfPanels
        },
        inversores: {
            ...inverter,
            cantidad: numberOfInverters
        },
        configuracion: {
            potenciaDC: potenciaDC.toFixed(1),
            potenciaAC: potenciaAC.toFixed(1),
            dcAcRatio: dcAcRatio.toFixed(2),
            stringsPorInversor: stringsPerInverter,
            modulesPorString: modulesPerString,
            vmpptMin: (modulesPerString * panel.vmpp).toFixed(1),
            vmpptMax: (modulesPerString * panel.vmpp).toFixed(1),
            corrienteString: panel.impp.toFixed(2)
        }
    };

    const basePlantCapacity = 140;
    const scalingFactor = potenciaAC / basePlantCapacity;

    const baseRendimientoData = [
        { mes: 'Ene', generacion: 285, perdidas: { opticas: 4.2, temp: 8.5, cables: 1.2, inv: 1.4 } },
        { mes: 'Feb', generacion: 260, perdidas: { opticas: 4.0, temp: 7.8, cables: 1.2, inv: 1.4 } },
        { mes: 'Mar', generacion: 250, perdidas: { opticas: 3.8, temp: 6.5, cables: 1.2, inv: 1.4 } },
        { mes: 'Abr', generacion: 220, perdidas: { opticas: 3.5, temp: 5.2, cables: 1.2, inv: 1.4 } },
        { mes: 'May', generacion: 180, perdidas: { opticas: 3.2, temp: 4.1, cables: 1.2, inv: 1.4 } },
        { mes: 'Jun', generacion: 160, perdidas: { opticas: 3.0, temp: 3.8, cables: 1.2, inv: 1.4 } },
        { mes: 'Jul', generacion: 170, perdidas: { opticas: 3.1, temp: 4.0, cables: 1.2, inv: 1.4 } },
        { mes: 'Ago', generacion: 200, perdidas: { opticas: 3.4, temp: 4.8, cables: 1.2, inv: 1.4 } },
        { mes: 'Sep', generacion: 230, perdidas: { opticas: 3.7, temp: 5.5, cables: 1.2, inv: 1.4 } },
        { mes: 'Oct', generacion: 260, perdidas: { opticas: 4.0, temp: 6.8, cables: 1.2, inv: 1.4 } },
        { mes: 'Nov', generacion: 280, perdidas: { opticas: 4.1, temp: 7.9, cables: 1.2, inv: 1.4 } },
        { mes: 'Dic', generacion: 290, perdidas: { opticas: 4.2, temp: 8.5, cables: 1.2, inv: 1.4 } }
    ];

    // Transform the data structure to work with stacked bars
    const chartData = baseRendimientoData.map(monthData => ({
        mes: monthData.mes,
        generacion: parseFloat((monthData.generacion * scalingFactor).toFixed(1)),
        perdidas_temp: parseFloat((monthData.perdidas.temp * scalingFactor).toFixed(1)),
        perdidas_opticas: parseFloat((monthData.perdidas.opticas * scalingFactor).toFixed(1)),
        perdidas_cables: parseFloat((monthData.perdidas.cables * scalingFactor).toFixed(1)),
        perdidas_inv: parseFloat((monthData.perdidas.inv * scalingFactor).toFixed(1)),
    }));

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const total = payload.reduce((sum, entry) => sum + entry.value, 0);
            
            return (
                <div className="bg-gray-800 border border-gray-700 rounded-md shadow-lg p-3 text-white">
                    <p className="text-sm font-bold border-b border-gray-700 pb-1 mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center justify-between gap-4 text-xs">
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3" style={{ backgroundColor: entry.color }}></div>
                                <span>{entry.name}:</span>
                            </div>
                            <span className="font-mono">{entry.value.toFixed(1)} kWh</span>
                        </div>
                    ))}
                    <div className="border-t border-gray-700 mt-2 pt-1 text-xs font-bold flex justify-between">
                        <span>Total:</span>
                        <span className="font-mono">{total.toFixed(1)} kWh</span>
                    </div>
                </div>
            );
        }
        return null;
    };
    
    const bars = [
        { dataKey: 'generacion', fill: '#10B981', name: 'Generación' },
        { dataKey: 'perdidas_temp', fill: '#F59E0B', name: 'P.Temp', stack: 'perdidas' },
        { dataKey: 'perdidas_opticas', fill: '#F97316', name: 'P.Ópt', stack: 'perdidas' },
        { dataKey: 'perdidas_cables', fill: '#EF4444', name: 'P.DC', stack: 'perdidas' },
        { dataKey: 'perdidas_inv', fill: '#8B5CF6', name: 'P.Inv', stack: 'perdidas' }
    ];
  
    // Calcular la eficiencia total del sistema
    const totalEfficiency = Math.round(equipmentData.paneles.eficiencia * (equipmentData.inversores.eficiencia / 100) * 0.9 * 10) / 10;
  
    return (
        <div className="w-[280mm] h-[140mm] bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg shadow-xl">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <Zap className="h-6 w-6 text-yellow-400" />
                    <h1 className="text-white text-lg font-bold">Planta Solar {plantMetrics.plantCapacityKW.toFixed(3)}MW - Detalles Técnicos</h1>
                </div>
                <div className="bg-gray-800/60 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-700 text-gray-200 text-xs">
                    Eficiencia del Sistema: <span className="font-bold text-green-400">{totalEfficiency}%</span>
                </div>
            </div>
            
            <div className="flex gap-6 h-[calc(100%-2rem)]">
                {/* Left Column */}
                <div className="w-[45%] flex flex-col gap-4">
                    {/* System Configuration */}
                    <Card className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 shadow-lg rounded-xl overflow-hidden">
                        <CardContent className="p-3">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-blue-500/20 p-1.5 rounded-lg">
                                    <Cpu className="h-4 w-4 text-blue-400" />
                                </div>
                                <h2 className="text-sm font-bold text-white">CONFIGURACIÓN DEL SISTEMA</h2>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-xs">
                                {[
                                    { label: 'Potencia DC:', value: `${equipmentData.configuracion.potenciaDC} kWp`, icon: '⚡' },
                                    { label: 'Potencia AC:', value: `${equipmentData.configuracion.potenciaAC} kW`, icon: '🔌' },
                                    { label: 'DC/AC Ratio:', value: equipmentData.configuracion.dcAcRatio, icon: '⚖️' },
                                    { label: 'Strings Total:', value: equipmentData.configuracion.stringsPorInversor * equipmentData.inversores.cantidad, icon: '🔗' }
                                ].map((item, i) => (
                                    <div key={i} className="bg-gray-700/50 p-2 rounded-lg flex items-center">
                                        <div className="flex items-center gap-1.5 text-gray-300">
                                            <span>{item.icon}</span>
                                            <span className="truncate">{item.label}</span>
                                        </div>
                                        <span className="font-bold text-white ml-auto">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
    
                    {/* Modules */}
                    <Card className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 shadow-lg rounded-xl overflow-hidden">
                        <CardContent className="p-3">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-yellow-500/20 p-1.5 rounded-lg">
                                    <LayoutGrid className="h-4 w-4 text-yellow-400" />
                                </div>
                                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                    MÓDULOS FOTOVOLTAICOS
                                    <span className="px-2 py-0.5 bg-yellow-600/30 text-yellow-300 rounded-full text-xs">
                                        {equipmentData.paneles.cantidad}x
                                    </span>
                                </h3>
                            </div>
                            <div className="bg-gray-700/50 p-3 rounded-lg text-xs">
                                <div className="mb-3 pb-1 border-b border-gray-600 flex items-center justify-between">
                                    <span className="font-bold text-white">{equipmentData.paneles.modelo}</span>
                                    <span className="text-xs px-2 py-0.5 bg-green-600/20 text-green-300 rounded-full">
                                        {equipmentData.paneles.eficiencia}% Eficiencia
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { label: 'Potencia:', value: `${equipmentData.paneles.potencia}W` },
                                        { label: 'Voc:', value: `${equipmentData.paneles.voc}V` },
                                        { label: 'Isc:', value: `${equipmentData.paneles.isc}A` },
                                        { label: 'Vmpp:', value: `${equipmentData.paneles.vmpp}V` },
                                        { label: 'Impp:', value: `${equipmentData.paneles.impp}A` },
                                        { label: 'Temp.Coef:', value: `${equipmentData.paneles.temperatureCoef}%/°C` }
                                    ].map((item, i) => (
                                        <div key={i} className="bg-gray-800/60 p-2 rounded-lg">
                                            <span className="text-gray-400 block">{item.label}</span>
                                            <span className="text-white font-mono">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
    
                    {/* Inverters */}
                    <Card className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 shadow-lg rounded-xl overflow-hidden">
                        <CardContent className="p-3">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-green-500/20 p-1.5 rounded-lg">
                                    <Battery className="h-4 w-4 text-green-400" />
                                </div>
                                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                    INVERSORES
                                    <span className="px-2 py-0.5 bg-green-600/30 text-green-300 rounded-full text-xs">
                                        {equipmentData.inversores.cantidad}x
                                    </span>
                                </h3>
                            </div>
                            <div className="bg-gray-700/50 p-3 rounded-lg text-xs">
                                <div className="mb-3 pb-1 border-b border-gray-600 flex items-center justify-between">
                                    <span className="font-bold text-white">{equipmentData.inversores.modelo}</span>
                                    <span className="text-xs px-2 py-0.5 bg-blue-600/20 text-blue-300 rounded-full">
                                        {equipmentData.inversores.eficiencia}% Eficiencia
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { label: 'Potencia:', value: `${equipmentData.inversores.potencia}kW` },
                                        { label: 'MPPT Range:', value: `${equipmentData.inversores.mpptRangeMin}-${equipmentData.inversores.mpptRangeMax}V` },
                                        { label: 'Max I:', value: `${equipmentData.inversores.maxInputCurrent}A` },
                                        { label: 'Max Strings:', value: equipmentData.inversores.maxStrings },
                                        { label: 'Strings/MPPT:', value: equipmentData.inversores.stringsPerMPPT },
                                        { label: 'Strings/Inv:', value: stringsPerInverter }
                                    ].map((item, i) => (
                                        <div key={i} className="bg-gray-800/60 p-2 rounded-lg">
                                            <span className="text-gray-400 block">{item.label}</span>
                                            <span className="text-white font-mono">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
    
                {/* Right Column - Chart */}
                <div className="w-[55%] h-full">
                    <Card className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 shadow-lg rounded-xl overflow-hidden h-full">
                        <CardContent className="p-4 h-full flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="bg-yellow-500/20 p-1.5 rounded-lg">
                                        <BarChart3 className="h-4 w-4 text-yellow-400" />
                                    </div>
                                    <h2 className="text-sm font-bold text-white">RENDIMIENTO MENSUAL DEL SISTEMA</h2>
                                </div>
                                <div className="flex text-xs text-gray-400 gap-2">
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span>Generación</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                        <span>Pérdidas</span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[calc(100%-2rem)] bg-gray-900/40 p-3 rounded-lg">
                                <ResponsiveContainer>
                                    <BarChart 
                                        data={chartData} 
                                        margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                                        <XAxis 
                                            dataKey="mes" 
                                            tick={{ fill: '#E5E7EB', fontSize: 11 }}
                                            axisLine={{ stroke: '#4B5563' }}
                                            tickLine={{ stroke: '#4B5563' }}
                                        />
                                        <YAxis 
                                            tick={{ fill: '#E5E7EB', fontSize: 11 }}
                                            axisLine={{ stroke: '#4B5563' }}
                                            tickLine={{ stroke: '#4B5563' }}
                                            label={{ 
                                                value: 'kWh', 
                                                angle: -90, 
                                                position: 'insideLeft',
                                                fill: '#9CA3AF',
                                                fontSize: 11,
                                                dy: 50
                                            }}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend 
                                            wrapperStyle={{ fontSize: '11px', color: '#E5E7EB' }}
                                            iconType="circle"
                                            iconSize={8}
                                            verticalAlign="top" 
                                            height={30}
                                        />
                                        {bars.map(({ dataKey, fill, name, stack }) => (
                                            <Bar 
                                                key={dataKey}
                                                dataKey={dataKey} 
                                                fill={fill} 
                                                name={name}
                                                stackId={stack}
                                                barSize={16} 
                                                radius={[4, 4, 0, 0]}
                                            />
                                        ))}
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default TucumanSolarTechnical;