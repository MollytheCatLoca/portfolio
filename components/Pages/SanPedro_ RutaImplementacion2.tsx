"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { Layout, DollarSign, ActivitySquare } from 'lucide-react';

const RutaImplementacion2 = ({ transform = 'scale(1)' }) => {
    const pasos = [
        {
            icon: <Layout className="h-6 w-6 text-purple-500" />,
            title: "Diseño del Cluster Generador",
            detalles: [
                "Planificación y diseño del cluster, considerando la instalación modular de parques solares All-In-One.",
                "Preparación de la infraestructura necesaria, incluyendo el acceso y distribución energética para las empresas.",
                "El sistema All-In-One es altamente escalable, permitiendo una integración progresiva de las empresas."
            ]
        },
        {
            icon: <DollarSign className="h-6 w-6 text-green-500" />,
            title: "Financiamiento, Leasing e Instalación",
            detalles: [
                "Desarrollar los contratos de leasing entre las empresas y los proveedores de equipos.",
                "Coordinar con entidades financieras para estructurar los modelos de leasing.",
                "Instalación progresiva: Comenzar la construcción e instalación de generadores solares de manera modular y escalable.",
                "La cooperativa eléctrica estará a cargo de la operación y el mantenimiento de los generadores."
            ]
        },
        {
            icon: <ActivitySquare className="h-6 w-6 text-red-500" />,
            title: "Monitoreo y Evaluación del Desempeño del Cluster",
            detalles: [
                "Seguimiento del desempeño energético del cluster para asegurar la eficiencia y sostenibilidad a largo plazo.",
                "Evaluación continua de la viabilidad económica y medioambiental del proyecto, ajustando estrategias según sea necesario."
            ]
        }
    ];

    return (
        <div className= "space-y-4 text-white bg-[#121212] p-4" style = {{ transform }
}>
    <h2 className="text-2xl font-bold mb-4 mt-5" >
        <span className="text-blue-500" > Ruta de Implementación </span> (Parte 2)
            </h2>

            < div className = "space-y-4" style = {{ transform: 'scale(0.95)' }}>
                {
                    pasos.map((paso, index) => (
                        <Card key= { index } className = "bg-gray-800 border-gray-700" >
                        <CardHeader className="flex flex-row items-center space-x-2 p-4" >
                        { paso.icon }
                    < CardTitle className = "text-lg font-semibold" >
                    { index + 4}. { paso.title }
</CardTitle>
    </CardHeader>
    < CardContent >
    <ul className="list-disc list-inside space-y-2" >
    {
        paso.detalles.map((detalle, idx) => (
            <li key= { idx } className = "text-sm text-gray-300" > { detalle } </li>
        ))
    }
        </ul>
        </CardContent>
        </Card>
                ))}
</div>
    </div>
    );
};

export default RutaImplementacion2;