"use client"
import { useMemo } from 'react';
import React from 'react';
import { Sun, Battery, Cpu, Gauge, LayoutGrid } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card3";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
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

    const panel = {
        modelo: "TrinaSolar 550W",
        potencia: 550,
        eficiencia: 21.3,
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

    const CustomTooltip = useMemo(() => ({
        backgroundColor: '#2D3748',
        border: '1px solid #4A5568',
        fontSize: '11px',
        color: '#E5E7EB'
      }), []);
    
    const bars = [
        { dataKey: 'generacion', fill: '#4CAF50', name: 'Generación' },
        { dataKey: 'perdidas_temp', fill: '#FFC107', name: 'P.Temp', stack: 'perdidas' },
        { dataKey: 'perdidas_opticas', fill: '#FF9800', name: 'P.Ópt', stack: 'perdidas' },
        { dataKey: 'perdidas_cables', fill: '#F44336', name: 'P.DC', stack: 'perdidas' },
        { dataKey: 'perdidas_inv', fill: '#9C27B0', name: 'P.Inv', stack: 'perdidas' }
      ];
  

    
      return (
        <div className="w-[280mm] h-[140mm] bg-gray-900 p-6">
            <div className="flex gap-6 h-full">
                {/* Left Column */}
                <div className="w-[45%] flex flex-col gap-3">
                    {/* System Configuration */}
                    <Card className="bg-gray-800 border-gray-700 h-[19%]">
                        <CardContent className="p-1">
                            <div className="flex items-center gap-3 mb-2">
                                <Cpu className="h-4 w-4 text-blue-400 flex-shrink-0" />
                                <h2 className="text-sm font-bold text-white truncate">CONFIGURACIÓN DEL SISTEMA</h2>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                {[
                                    { label: 'Potencia DC:', value: `${equipmentData.configuracion.potenciaDC} kWp` },
                                    { label: 'Potencia AC:', value: `${equipmentData.configuracion.potenciaAC} kW` },
                                    { label: 'DC/AC Ratio:', value: equipmentData.configuracion.dcAcRatio },
                                    { label: 'Strings Total:', value: equipmentData.configuracion.stringsPorInversor * equipmentData.inversores.cantidad }
                                ].map((item, i) => (
                                    <div key={i} className="bg-gray-700 p-1 rounded flex justify-between">
                                        <span className="text-gray-300 truncate">{item.label}</span>
                                        <span className="font-bold ml-1">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
    
                    {/* Modules */}
                    <Card className="bg-gray-800 border-gray-700 h-[24%]">
                        <CardContent className="p-2">
                            <div className="flex items-center gap-3 mb-2">
                                <LayoutGrid className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                                <h3 className="text-xs font-bold text-white truncate">
                                    MÓDULOS FOTOVOLTAICOS [{equipmentData.paneles.cantidad}x]
                                </h3>
                            </div>
                            <div className="bg-gray-700 p-1 rounded text-xs">
                                <div className="mb-2 pb-0 border-b border-gray-600">
                                    <span className="font-bold truncate block">{equipmentData.paneles.modelo}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-x-2 gap-y-0">
                                    {[
                                        { label: 'Potencia:', value: `${equipmentData.paneles.potencia}W` },
                                        { label: 'Voc:', value: `${equipmentData.paneles.voc}V` },
                                        { label: 'Isc:', value: `${equipmentData.paneles.isc}A` },
                                        { label: 'Vmpp:', value: `${equipmentData.paneles.vmpp}V` },
                                        { label: 'Impp:', value: `${equipmentData.paneles.impp}A` },
                                        { label: 'Eficiencia:', value: `${equipmentData.paneles.eficiencia}%` }
                                    ].map((item, i) => (
                                        <div key={i} className="flex justify-between">
                                            <span className="text-gray-300 truncate">{item.label}</span>
                                            <span className="ml-1">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
    
                    {/* Technical Configuration */}
                    <Card className="bg-gray-800 border-gray-700 h-[24%]">
                        <CardContent className="p-2">
                            <div className="flex items-center gap-3 mb-2">
                                <Gauge className="h-4 w-4 text-purple-400 flex-shrink-0" />
                                <h3 className="text-xs font-bold text-white truncate">
                                    CONFIGURACIÓN TÉCNICA
                                </h3>
                            </div>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-0 text-xs">
                                {[
                                    { label: 'Vmpp Range:', value: `${equipmentData.configuracion.vmpptMin}V - ${equipmentData.configuracion.vmpptMax}V` },
                                    { label: 'Impp String:', value: `${equipmentData.configuracion.corrienteString}A` },
                                    { label: 'Módulos Total:', value: equipmentData.paneles.cantidad },
                                    { label: 'Módulos/String:', value: equipmentData.configuracion.modulesPorString }
                                ].map((item, i) => (
                                    <div key={i} className="bg-gray-700 p-2 rounded flex justify-between">
                                        <span className="text-gray-300 truncate">{item.label}</span>
                                        <span className="ml-1">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
    
                    {/* Inverters */}
                    <Card className="bg-gray-800 border-gray-700 h-[24%]">
                        <CardContent className="p-2">
                            <div className="flex items-center gap-3 mb-2">
                                <Battery className="h-4 w-4 text-green-400 flex-shrink-0" />
                                <h3 className="text-xs font-bold text-white truncate">
                                    INVERSORES [{equipmentData.inversores.cantidad}x]
                                </h3>
                            </div>
                            <div className="bg-gray-700 p-1 rounded text-xs">
                                <div className="mb-2 pb-0 border-b border-gray-600">
                                    <span className="font-bold truncate block">{equipmentData.inversores.modelo}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-x-2 gap-y-0">
                                    {[
                                        { label: 'Potencia:', value: `${equipmentData.inversores.potencia}kW` },
                                        { label: 'Eficiencia:', value: `${equipmentData.inversores.eficiencia}%` },
                                        { label: 'MPPT Range:', value: `${equipmentData.inversores.mpptRangeMin}-${equipmentData.inversores.mpptRangeMax}V` },
                                        { label: 'Max I:', value: `${equipmentData.inversores.maxInputCurrent}A` },
                                        { label: 'Strings/MPPT:', value: equipmentData.inversores.stringsPerMPPT },
                                        { label: 'Max Strings:', value: equipmentData.inversores.maxStrings }
                                    ].map((item, i) => (
                                        <div key={i} className="flex justify-between">
                                            <span className="text-gray-300 truncate">{item.label}</span>
                                            <span className="ml-1">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
    
                {/* Right Column - Chart */}
                <div className="w-[55%] h-full">
                    <Card className="bg-gray-800 border-gray-700 h-full">
                        <CardContent className="p-3 h-full flex flex-col">
                            <div className="flex items-center gap-1 mb-2">
                                <Sun className="h-4 w-4 text-yellow-400" />
                                <h2 className="text-sm font-bold text-white truncate">RENDIMIENTO DEL SISTEMA</h2>
                            </div>
                            <div className="h-[90%]">
                                <ResponsiveContainer>
                                    <BarChart 
                                        data={chartData} 
                                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                                    >
                                        <XAxis 
                                            dataKey="mes" 
                                            tick={{ fill: '#E5E7EB', fontSize: 11 }} 
                                        />
                                        <YAxis 
                                            tick={{ fill: '#E5E7EB', fontSize: 11 }} 
                                        />
                                        <Tooltip contentStyle={CustomTooltip} />
                                        <Legend 
                                            wrapperStyle={{ fontSize: '11px', color: '#E5E7EB' }} 
                                            verticalAlign="top" 
                                            height={36}
                                        />
                                        {bars.map(({ dataKey, fill, name, stack }) => (
                                            <Bar 
                                                key={dataKey}
                                                dataKey={dataKey} 
                                                fill={fill} 
                                                name={name}
                                                stackId={stack}
                                                barSize={20} 
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
