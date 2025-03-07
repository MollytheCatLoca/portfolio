'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/Card3';
import { 
    MapPin, Building2, Globe2, Navigation, 
    Sun, Wind, Thermometer, CloudRain,
    Battery, Zap, Calendar, ArrowUpRight
} from 'lucide-react';
import { useConstants } from '../contexts/ConstantsContext';

function calculateRegion(lat, lon) {
    if (lat && lon) {
        if (lat < -40) return "Patagonia";
        if (lat < -35) return "Región Pampeana Sur";
        if (lat < -30) return "Región Pampeana Norte";
        if (lat < -25) return "Región Norte";
        if (lat >= -25) return "Región NOA";
    }
    return "N/A";
}

// Función para calcular datos climáticos aproximados según la región
function calculateClimateData(lat, lon) {
    const region = calculateRegion(lat, lon);
    const data = {
        'Patagonia': {
            solarHours: 8,
            windSpeed: '45-60',
            avgTemp: '8-15',
            rainfall: '200-400'
        },
        'Región Pampeana Sur': {
            solarHours: 9,
            windSpeed: '30-45',
            avgTemp: '12-18',
            rainfall: '400-800'
        },
        'Región Pampeana Norte': {
            solarHours: 10,
            windSpeed: '25-40',
            avgTemp: '15-22',
            rainfall: '800-1200'
        },
        'Región Norte': {
            solarHours: 11,
            windSpeed: '20-35',
            avgTemp: '18-25',
            rainfall: '1000-1400'
        },
        'Región NOA': {
            solarHours: 12,
            windSpeed: '15-30',
            avgTemp: '20-28',
            rainfall: '200-600'
        }
    };
    return data[region] || {
        solarHours: 10,
        windSpeed: '30-40',
        avgTemp: '15-20',
        rainfall: '600-800'
    };
}

// Función para calcular potencial solar aproximado
function calculateSolarPotential(lat) {
    // Valores aproximados basados en la latitud
    if (Math.abs(lat) < 30) return 'Alto';
    if (Math.abs(lat) < 35) return 'Medio-Alto';
    if (Math.abs(lat) < 40) return 'Medio';
    return 'Medio-Bajo';
}

export default function CompanyPresentation() {
    const { constants } = useConstants();
    const { company } = constants;

    if (!company || !company.companyName) {
        return (
            <Card className="bg-black-200 border-gray-800 mt-4">
                <CardContent>Cargando datos de la empresa...</CardContent>
            </Card>
        );
    }

    const region = calculateRegion(company.latitude, company.longitude);
    const climateData = calculateClimateData(company.latitude, company.longitude);
    const solarPotential = calculateSolarPotential(company.latitude);
    const currentDate = new Date().toLocaleDateString('es-AR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    return (
        <Card className="bg-black-200 border-gray-800">
            <CardContent className="p-6">
                {/* Header con nombre de empresa */}
                <div className="flex items-center gap-2 mb-6">
                    <Building2 className="h-6 w-6 text-blue-400" />
                    <h2 className="text-xl font-bold text-white">
                        {company.companyName}
                    </h2>
                </div>

                {/* Cards en línea */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card className="bg-[#1a1f2e] border-none">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <MapPin className="h-4 w-4 text-red-400" />
                                <p className="text-sm font-medium text-gray-300">Dirección</p>
                            </div>
                            <p className="text-sm text-gray-400 truncate" title={company.address}>
                                {company.address}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1a1f2e] border-none">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Globe2 className="h-4 w-4 text-green-400" />
                                <p className="text-sm font-medium text-gray-300">Latitud</p>
                            </div>
                            <p className="text-sm font-semibold text-white">
                                {company.latitude || 'N/A'}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1a1f2e] border-none">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Globe2 className="h-4 w-4 text-yellow-400" />
                                <p className="text-sm font-medium text-gray-300">Longitud</p>
                            </div>
                            <p className="text-sm font-semibold text-white">
                                {company.longitude || 'N/A'}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1a1f2e] border-none">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Navigation className="h-4 w-4 text-purple-400" />
                                <p className="text-sm font-medium text-gray-300">Región</p>
                            </div>
                            <p className="text-sm font-semibold text-white">
                                {region}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Contenedor flex para mapa y datos */}
                <div className="flex gap-4">
                    {/* Mapa estático con overlay */}
                    <div className="relative w-2/3">
                        <div className="rounded-xl shadow-lg overflow-hidden">
                            <img 
                                src="/maps/static_map.png" 
                                alt="Map Static" 
                                style={{ 
                                    height: '80mm', 
                                    width: '100%', 
                                    objectFit: 'cover' 
                                }} 
                            />
                            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black opacity-30"></div>
                            <div className="absolute bottom-4 left-4 text-white font-semibold bg-black/50 rounded-md px-3 py-2 flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {company.companyName}
                            </div>
                        </div>
                    </div>

                    {/* Panel de datos climatológicos y energéticos */}
                    <div className="w-1/3 space-y-4">
                        <Card className="bg-[#1a1f2e] border-none">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-white font-semibold">Datos del Sitio</h3>
                                    <span className="text-xs text-gray-400">{currentDate}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Sun className="h-4 w-4 text-yellow-400" />
                                                <span className="text-xs text-gray-400">Horas Sol/día</span>
                                            </div>
                                            <p className="text-sm font-semibold text-white">{climateData.solarHours}h</p>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Wind className="h-4 w-4 text-blue-400" />
                                                <span className="text-xs text-gray-400">Velocidad Viento</span>
                                            </div>
                                            <p className="text-sm font-semibold text-white">{climateData.windSpeed} km/h</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Thermometer className="h-4 w-4 text-red-400" />
                                                <span className="text-xs text-gray-400">Temp. Media</span>
                                            </div>
                                            <p className="text-sm font-semibold text-white">{climateData.avgTemp}°C</p>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <CloudRain className="h-4 w-4 text-blue-300" />
                                                <span className="text-xs text-gray-400">Precip. Anual</span>
                                            </div>
                                            <p className="text-sm font-semibold text-white">{climateData.rainfall} mm</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Potencial Energético */}
                                <div className="mt-8 mb-5 pt-4 border-t border-gray-700">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Battery className="h-4 w-4 text-green-400" />
                                            <span className="text-sm text-gray-300">Potencial Solar</span>
                                        </div>
                                        <span className="text-sm font-semibold text-white">{solarPotential}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Zap className="h-4 w-4 text-yellow-400" />
                                            <span className="text-sm text-gray-300">Irradiancia Est.</span>
                                        </div>
                                        <span className="text-sm font-semibold text-white">
                                            {(5.2 - Math.abs(company.latitude) / 20).toFixed(2)
                                            } kWh/m²
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}