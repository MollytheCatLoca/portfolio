'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/Card3';
import { 
    MapPin, Building2, Globe2, Navigation, 
    Sun, Wind, Thermometer, CloudRain,
    Battery, Zap, Calendar
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
            <Card className="bg-[#0A0F1C] border-gray-800 mt-4">
                <CardContent className="p-4">
                    <div className="flex items-center justify-center">
                        <p className="text-gray-400">Cargando datos de la empresa...</p>
                    </div>
                </CardContent>
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
        <Card className="bg-[#0A0F1C] border-gray-800">
            <CardContent className="p-4">
                {/* Header con nombre de empresa */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-blue-400" />
                        <div>
                            <h2 className="text-lg font-bold text-white">
                                {company.companyName}
                            </h2>
                            <p className="text-xs text-gray-400">
                                Análisis de Ubicación
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-400">
                        <Calendar className="h-3.5 w-3.5 mr-1.5" />
                        {currentDate}
                    </div>
                </div>

                {/* Cards en grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <LocationCard 
                        icon={<MapPin className="h-4 w-4 text-red-400" />}
                        title="Dirección"
                        value={company.address}
                    />
                    <LocationCard 
                        icon={<Globe2 className="h-4 w-4 text-green-400" />}
                        title="Latitud"
                        value={company.latitude || 'N/A'}
                    />
                    <LocationCard 
                        icon={<Globe2 className="h-4 w-4 text-yellow-400" />}
                        title="Longitud"
                        value={company.longitude || 'N/A'}
                    />
                    <LocationCard 
                        icon={<Navigation className="h-4 w-4 text-purple-400" />}
                        title="Región"
                        value={region}
                    />
                </div>

                {/* Contenedor flex para mapa y datos */}
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Mapa estático con overlay */}
                    <div className="relative flex-1 md:w-2/3">
                        <div className="rounded-lg overflow-hidden border border-gray-800">
                            <img 
                                src="/maps/static_map.png" 
                                alt="Map Static" 
                                style={{ 
                                    height: '65mm', 
                                    width: '100%', 
                                    objectFit: 'cover',
                                    objectPosition: 'center'
                                }} 
                            />
                            {/* Sólo gradiente en la parte inferior para mejorar visibilidad */}
                            <div className="absolute left-0 right-0 bottom-0 h-12 bg-gradient-to-t from-black to-transparent opacity-40"></div>
                            
                            {/* Punto de ubicación */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div className="w-3 h-3 bg-red-500 rounded-full relative">
                                    <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                                </div>
                            </div>
                            
                            <div className="absolute bottom-3 left-3 text-white bg-black/60 rounded-md px-2 py-1 text-xs">
                                <div className="font-medium">{company.companyName}</div>
                                <div className="text-gray-300 text-[10px]">{region}</div>
                            </div>
                        </div>
                    </div>

                    {/* Panel de datos climatológicos y energéticos */}
                    <div className="md:w-1/3 space-y-3">
                        <Card className="bg-[#1a1f2e] border-none">
                            <CardContent className="p-3">
                                <div className="flex items-center justify-between mb-3 pb-1 border-b border-gray-700">
                                    <h3 className="text-sm text-white font-medium">Datos del Sitio</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <ClimateDataCard 
                                        icon={<Sun className="h-4 w-4 text-yellow-400" />}
                                        title="Horas Sol/día"
                                        value={`${climateData.solarHours}h`}
                                    />
                                    <ClimateDataCard 
                                        icon={<Wind className="h-4 w-4 text-blue-400" />}
                                        title="Velocidad Viento"
                                        value={`${climateData.windSpeed} km/h`}
                                    />
                                    <ClimateDataCard 
                                        icon={<Thermometer className="h-4 w-4 text-red-400" />}
                                        title="Temp. Media"
                                        value={`${climateData.avgTemp}°C`}
                                    />
                                    <ClimateDataCard 
                                        icon={<CloudRain className="h-4 w-4 text-blue-300" />}
                                        title="Precip. Anual"
                                        value={`${climateData.rainfall} mm`}
                                    />
                                </div>

                                {/* Potencial Energético */}
                                <div className="mt-3 pt-3 border-t border-gray-700">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Battery className="h-4 w-4 text-green-400" />
                                            <span className="text-xs text-gray-300">Potencial Solar</span>
                                        </div>
                                        <span className="text-xs font-medium text-white">{solarPotential}</span>
                                    </div>
                                    
                                    {/* Barra de progreso para potencial solar */}
                                    <div className="w-full h-1.5 bg-gray-700 rounded-full mb-3">
                                        <div 
                                            className="h-full bg-gradient-to-r from-yellow-500 to-green-500 rounded-full" 
                                            style={{ 
                                                width: `${solarPotential === 'Alto' ? 90 : 
                                                    solarPotential === 'Medio-Alto' ? 75 : 
                                                    solarPotential === 'Medio' ? 50 : 35}%` 
                                            }}
                                        ></div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Zap className="h-4 w-4 text-yellow-400" />
                                            <span className="text-xs text-gray-300">Irradiancia Est.</span>
                                        </div>
                                        <span className="text-xs font-medium text-white">
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

// Componente para tarjetas de ubicación
const LocationCard = ({ icon, title, value }) => (
    <div className="bg-[#1a1f2e] rounded-lg p-2.5 border border-gray-800">
        <div className="flex items-center gap-1.5 mb-1.5">
            {icon}
            <p className="text-xs text-gray-400">{title}</p>
        </div>
        <p className="text-xs text-white truncate" title={value}>
            {value}
        </p>
    </div>
);

// Componente para tarjetas de datos climáticos
const ClimateDataCard = ({ icon, title, value }) => (
    <div className="bg-[#151b2a] rounded-lg p-2 border border-gray-800">
        <div className="flex items-center gap-1.5 mb-1">
            {icon}
            <p className="text-[10px] text-gray-400">{title}</p>
        </div>
        <p className="text-sm font-medium text-white">
            {value}
        </p>
    </div>
);