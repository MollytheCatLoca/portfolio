'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/Card2';
import { 
    Sun, 
    Battery, 
    Gauge, 
    Zap,
    ThermometerSun,
    BarChart3,
    Calendar,
    Percent,
    Info
} from 'lucide-react';

import { SOLAR_PARK_DATA } from '../data/solarParkData';

export default function SolarParkSpecs() {
    const {
        capacities,
        solarResource,
        firstYearPerformance,
        twentyFiveYearPerformance,
        technicalSpecs,
        projectNotes
    } = SOLAR_PARK_DATA;

    return (
        <Card className="bg-black-200 border-gray-800">
            <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Sun className="h-6 w-6 text-yellow-400" />
                        <h2 className="text-xl font-bold text-white">
                            Especificaciones Técnicas del Parque Solar
                        </h2>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-right">
                            <p className="text-sm text-gray-400">Capacidad Instalada</p>
                            <p className="text-lg font-bold text-white">
                                {capacities.installed.value} {capacities.installed.unit}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-400">Capacidad de Despacho</p>
                            <p className="text-lg font-bold text-white">
                                {capacities.dispatch.value} {capacities.dispatch.unit} @ fp={capacities.dispatch.powerFactor}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Recurso Solar Card */}
                    <Card className="bg-[#1a1f2e] border-none">
                        <CardContent className="p-4">
                            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                <Sun className="h-4 w-4 text-yellow-400" />
                                Recurso Solar
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-400">GHI</span>
                                    <span className="text-sm font-semibold text-white">
                                        {solarResource.ghi.value} {solarResource.ghi.unit}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-400">DHI</span>
                                    <span className="text-sm font-semibold text-white">
                                        {solarResource.dhi.value} {solarResource.dhi.unit}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-400">Temperatura Media</span>
                                    <span className="text-sm font-semibold text-white">
                                        {solarResource.averageTemperature.value} {solarResource.averageTemperature.unit}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                                    <span className="text-xs text-gray-500">Fuente de datos</span>
                                    <span className="text-xs text-gray-400">{solarResource.dataSource}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Rendimiento Año 1 Card */}
                    <Card className="bg-[#1a1f2e] border-none">
                        <CardContent className="p-4">
                            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                <Gauge className="h-4 w-4 text-green-400" />
                                Rendimiento Energético (Año 1)
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-400">Producción Específica</span>
                                    <span className="text-sm font-semibold text-white">
                                        {firstYearPerformance.specificProduction.value} {firstYearPerformance.specificProduction.unit}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-400">Coeficiente de Rendimiento</span>
                                    <span className="text-sm font-semibold text-white">
                                        {firstYearPerformance.performanceRatio.value} {firstYearPerformance.performanceRatio.unit}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-400">Energía Total Inyectada</span>
                                    <span className="text-sm font-semibold text-white">
                                        {firstYearPerformance.totalInjectedEnergy.value} {firstYearPerformance.totalInjectedEnergy.unit}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-400">Consumo Total</span>
                                    <span className="text-sm font-semibold text-white">
                                        {firstYearPerformance.totalEnergyConsumption.value} {firstYearPerformance.totalEnergyConsumption.unit}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Rendimiento 25 años Card */}
                    <Card className="bg-[#1a1f2e] border-none">
                        <CardContent className="p-4">
                            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-blue-400" />
                                Rendimiento (Media 25 años)
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-400">Producción Específica</span>
                                    <span className="text-sm font-semibold text-white">
                                        {twentyFiveYearPerformance.specificProduction.value} {twentyFiveYearPerformance.specificProduction.unit}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-400">Rendimiento Energético</span>
                                    <span className="text-sm font-semibold text-white">
                                        {twentyFiveYearPerformance.energyYield.value} {twentyFiveYearPerformance.energyYield.unit}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-400">Coeficiente de Rendimiento</span>
                                    <span className="text-sm font-semibold text-white">
                                        {twentyFiveYearPerformance.performanceRatio.value} {twentyFiveYearPerformance.performanceRatio.unit}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Especificaciones Técnicas Card */}
                    <Card className="bg-[#1a1f2e] border-none">
                        <CardContent className="p-4">
                            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                <Zap className="h-4 w-4 text-purple-400" />
                                Especificaciones Técnicas
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-400">Punto de Salida</span>
                                    <span className="text-sm font-semibold text-white">
                                        {technicalSpecs.outputPoint.value} {technicalSpecs.outputPoint.unit}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-400">Factor de Potencia</span>
                                    <span className="text-sm font-semibold text-white">
                                        {technicalSpecs.powerFactor.value}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-400">Potencia Reactiva</span>
                                    <span className="text-sm font-semibold text-white">
                                        {technicalSpecs.reactivePower.value}{technicalSpecs.reactivePower.unit}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-400">Variación de Tensión</span>
                                    <span className="text-sm font-semibold text-white">
                                        {technicalSpecs.voltageVariation.value}{technicalSpecs.voltageVariation.unit}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Project Notes */}
                <div className="mt-6 space-y-4">
                    <Card className="bg-[#1a1f2e] border-none">
                        <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                                <Info className="h-5 w-5 text-blue-400 mt-0.5" />
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-400">
                                        {projectNotes.dimensioning}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {projectNotes.operation}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
}