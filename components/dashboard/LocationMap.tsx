'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { MapPin } from 'lucide-react';
import MapWrapper from './MapWrapper';

type LocationMapProps = {
    ubicacion?: {
        ciudad: string;
        provincia: string;
        coordenadas: {
            lat: number;
            lon: number;
        };
        descripcion: string;
    };
    terreno?: {
        area: number;
        unidad: string;
        tipo: string;
        elevacionPromedio: number;
        unidadElevacion: string;
        irradiacionAnual: number;
        unidadIrradiacion: string;
    };
};

export default function LocationMap({ ubicacion, terreno }: LocationMapProps) {
    if (!ubicacion || !terreno) {
        return (
            <Card className= "bg-black-200 border-gray-800 mt-10" >
            <CardContent>Cargando datos del mapa...</CardContent>
                </Card>
        );
    }
    console.log('Nuevas coordenadas:', ubicacion.coordenadas.lat);
    return (
        <Card className= "bg-black-200 border-gray-800" >
        <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center" >
            <MapPin className="mr-2" /> Ubicación del Parque Solar
                </CardTitle>
                </CardHeader>
                < CardContent >
                <div className="mb-4" >
                    <p className="text-gray-300" > { ubicacion.ciudad }, { ubicacion.provincia } </p>
                        < p className = "text-sm text-gray-400" > { ubicacion.descripcion } </p>
                            </div>
                            < div style = {{ height: '400px', width: '100%' }
}>
    <MapWrapper
lat={ ubicacion.coordenadas.lat }
lon = { ubicacion.coordenadas.lon }
ciudad = { ubicacion.ciudad }
    />
    </div>
    < div className = "mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm" >
        <div>
        <p className="text-gray-400" > Área del terreno </p>
            < p className = "font-semibold text-white" > { terreno.area } { terreno.unidad } </p>
                </div>
                < div >
                <p className="text-gray-400" > Elevación promedio </p>
                    < p className = "font-semibold text-white" > { terreno.elevacionPromedio } { terreno.unidadElevacion } </p>
                        </div>
                        < div >
                        <p className="text-gray-400" > Irradiación anual </p>
                            < p className = "font-semibold text-white" > { terreno.irradiacionAnual } { terreno.unidadIrradiacion } </p>
                                </div>
                                </div>
                                </CardContent>
                                </Card>
    );
}