'use client';
import React from 'react';
import { Card, CardContent } from components/ui/Card3;
import { 
    Sun, 
    Battery, 
    DollarSign, 
    Calendar,
    Zap,
    BarChart3,
    Sparkles,
    CheckCircle2
} from 'lucide-react';

import { SOLAR_PARK_DATA, ENERGY_PRODUCTION_DATA,SOLAR_BUDGET_DATA } from '../data/solarParkData';


export default function ProjectSummary() {
    return (
        <Card className="bg-black-200 border-gray-800" style={{ width: '270mm', height: '210mm' }}>
            <CardContent className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-yellow-400" />
                        <div>
                            <h2 className="text-xl font-bold text-white">Resumen del Proyecto Solar</h2>
                            <p className="text-sm text-gray-400">Parque Solar Fotovoltaico</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-[#1a1f2e] px-3 py-1 rounded-lg">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-white">Estado: Listo para Construcción</span>
                    </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <Card className="bg-[#1a1f2e] border-none">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Sun className="h-4 w-4 text-yellow-400" />
                                <h3 className="text-sm font-semibold text-white">Potencia Nominal</h3>
                            </div>
                            <p className="text-2xl font-bold text-white">
                                {SOLAR_PARK_DATA.capacities.installed.value} MWp
                            </p>
                            <p className="text-xs text-gray-400 mt-1">DC Instalada</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1a1f2e] border-none">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Battery className="h-4 w-4 text-green-400" />
                                <h3 className="text-sm font-semibold text-white">Producción Anual</h3>
                            </div>
                            <p className="text-2xl font-bold text-white">
                                {ENERGY_PRODUCTION_DATA.summary.firstYear.production} GWh
                            </p>
                            <p className="text-xs text-gray-400 mt-1">Primer Año</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1a1f2e] border-none">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-4 w-4 text-blue-400" />
                                <h3 className="text-sm font-semibold text-white">CAPEX Total</h3>
                            </div>
                            <p className="text-2xl font-bold text-white">
                                {(SOLAR_BUDGET_DATA.projectMetrics.capex / 1000000).toFixed(1)}M USD
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{SOLAR_BUDGET_DATA.projectMetrics.usdWpRatio} USD/Wp</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1a1f2e] border-none">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="h-4 w-4 text-purple-400" />
                                <h3 className="text-sm font-semibold text-white">Plazo de Obra</h3>
                            </div>
                            <p className="text-2xl font-bold text-white">
                                {SOLAR_BUDGET_DATA.projectMetrics.executionTime}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">Meses</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Technical Specifications */}
                    <Card className="bg-[#1a1f2e] border-none">
                        <CardContent className="p-4">
                            <h3 className="text-sm font-semibold text-white mb-4">Especificaciones Técnicas</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                                    <span className="text-sm text-gray-400">Módulos Solares</span>
                                    <span className="text-sm text-white">605/610W N-TYPE</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                                    <span className="text-sm text-gray-400">Cantidad de Módulos</span>
                                    <span className="text-sm text-white">4,920 unidades</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                                    <span className="text-sm text-gray-400">Inversores</span>
                                    <span className="text-sm text-white">20 x 150kW</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                                    <span className="text-sm text-gray-400">Estructura</span>
                                    <span className="text-sm text-white">Tracker 1 eje</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-400">Conexión</span>
                                    <span className="text-sm text-white">MT 33kV</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Performance Metrics */}
                    <Card className="bg-[#1a1f2e] border-none">
                        <CardContent className="p-4">
                            <h3 className="text-sm font-semibold text-white mb-4">Métricas de Rendimiento</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                                    <span className="text-sm text-gray-400">Performance Ratio</span>
                                    <span className="text-sm text-white">{ENERGY_PRODUCTION_DATA.summary.firstYear.performanceRatio}%</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                                    <span className="text-sm text-gray-400">Producción Específica</span>
                                    <span className="text-sm text-white">{ENERGY_PRODUCTION_DATA.summary.firstYear.specificProduction} kWh/kWp</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                                    <span className="text-sm text-gray-400">GHI Anual</span>
                                    <span className="text-sm text-white">{SOLAR_PARK_DATA.solarResource.ghi.value} kWh/m²</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                                    <span className="text-sm text-gray-400">Factor de Potencia</span>
                                    <span className="text-sm text-white">{SOLAR_PARK_DATA.technicalSpecs.powerFactor.value}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-400">Ganancia Bifacial</span>
                                    <span className="text-sm text-white">{ENERGY_PRODUCTION_DATA.summary.firstYear.bifacialGain}%</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Project Notes */}
                <Card className="bg-[#1a1f2e] border-none mt-4">
                    <CardContent className="p-4">
                        <p className="text-xs text-gray-400 leading-relaxed">
                            {SOLAR_PARK_DATA.projectNotes.dimensioning}
                        </p>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}