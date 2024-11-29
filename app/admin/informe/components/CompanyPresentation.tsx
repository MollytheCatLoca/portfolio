'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { MapPin, Building2, Globe2, Navigation } from 'lucide-react';
import MapWrapper from '@/components/dashboard/MapWrapper';
import { useConstants } from '../contexts/ConstantsContext';

function calculateRegion(lat, lon) {
    // Regiones aproximadas de Argentina
    if (lat && lon) {
        if (lat < -40) return "Patagonia";
        if (lat < -35) return "Región Pampeana Sur";
        if (lat < -30) return "Región Pampeana Norte";
        if (lat < -25) return "Región Norte";
        if (lat >= -25) return "Región NOA";
    }
    return "N/A";
}

export default function CompanyPresentation() {
    const { constants } = useConstants();
    const { company } = constants;

    if (!company || !company.companyName) {
        return (
            <Card className= "bg-black-200 border-gray-800 mt-4" >
            <CardContent>Cargando datos de la empresa...</CardContent>
                </Card>
        );
    }

    const region = calculateRegion(company.latitude, company.longitude);

    return (
        <Card className= "bg-black-200 border-gray-800" >
        <CardContent className="p-6" >
            {/* Header con nombre de empresa */ }
            < div className = "flex items-center gap-2 mb-6" >
                <Building2 className="h-6 w-6 text-blue-400" />
                    <h2 className="text-xl font-bold text-white" >
                        { company.companyName }
                        </h2>
                        </div>

    {/* Cards en línea */ }
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6" >
        <Card className="bg-[#1a1f2e] border-none" >
            <CardContent className="p-4" >
                <div className="flex items-center gap-2 mb-2" >
                    <MapPin className="h-4 w-4 text-red-400" />
                        <p className="text-sm font-medium text-gray-300" > Dirección </p>
                            </div>
                            < p className = "text-sm text-gray-400 truncate" title = { company.address } >
                                { company.address }
                                </p>
                                </CardContent>
                                </Card>

                                < Card className = "bg-[#1a1f2e] border-none" >
                                    <CardContent className="p-4" >
                                        <div className="flex items-center gap-2 mb-2" >
                                            <Globe2 className="h-4 w-4 text-green-400" />
                                                <p className="text-sm font-medium text-gray-300" > Latitud </p>
                                                    </div>
                                                    < p className = "text-sm font-semibold text-white" >
                                                        { company.latitude || 'N/A' }
                                                        </p>
                                                        </CardContent>
                                                        </Card>

                                                        < Card className = "bg-[#1a1f2e] border-none" >
                                                            <CardContent className="p-4" >
                                                                <div className="flex items-center gap-2 mb-2" >
                                                                    <Globe2 className="h-4 w-4 text-yellow-400" />
                                                                        <p className="text-sm font-medium text-gray-300" > Longitud </p>
                                                                            </div>
                                                                            < p className = "text-sm font-semibold text-white" >
                                                                                { company.longitude || 'N/A' }
                                                                                </p>
                                                                                </CardContent>
                                                                                </Card>

                                                                                < Card className = "bg-[#1a1f2e] border-none" >
                                                                                    <CardContent className="p-4" >
                                                                                        <div className="flex items-center gap-2 mb-2" >
                                                                                            <Navigation className="h-4 w-4 text-purple-400" />
                                                                                                <p className="text-sm font-medium text-gray-300" > Región </p>
                                                                                                    </div>
                                                                                                    < p className = "text-sm font-semibold text-white" >
                                                                                                        { region }
                                                                                                        </p>
                                                                                                        </CardContent>
                                                                                                        </Card>
                                                                                                        </div>

    {/* Mapa */ }
    {
        company.latitude && company.longitude && (
            <div className="w-full h-[400px] rounded-xl overflow-hidden" >
                <MapWrapper
                            lat={ company.latitude }
        lon = { company.longitude }
        ciudad = { company.companyName }
            />
            </div>
                )
    }
    </CardContent>
        </Card>
    );
}