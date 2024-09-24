import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { Handshake, Users, BarChart } from 'lucide-react'; // Cambiado ChartBar por BarChart

const RutaImplementacion1 = ({ transform = 'scale(1)' }) => {
    const pasos = [
        {
            icon: <Handshake className="h-6 w-6 text-blue-500" />,
            title: "Convenio con la UBA",
            detalles: [
                "Establecer un acuerdo para la utilización de 20 hectáreas de terrenos disponibles de la UBA.",
                "Negociación de los términos que permitan el uso a largo plazo, con la posibilidad de que la UBA participe activamente en el proyecto."
            ]
        },
        {
            icon: <Users className="h-6 w-6 text-green-500" />,
            title: "Reclutamiento de Empresas y Modelos de Adhesión al Cluster",
            detalles: [
                "Convocatoria y sensibilización: Realizar reuniones con las empresas locales para exponer los beneficios de unirse al cluster generador de energía solar.",
                "Generación de incentivos: Definir beneficios fiscales y/o financieros que faciliten la adhesión de las empresas al proyecto.",
                "Modelos de adhesión: Desarrollar contratos y acuerdos que incluyan opciones flexibles de leasing.",
                "Dimensionamiento del cluster: Evaluar la demanda de las empresas interesadas y ajustar el tamaño del cluster según las necesidades energéticas proyectadas."
            ]
        },
        {
            icon: <BarChart className="h-6 w-6 text-yellow-500" />,  
            title: "Análisis de Viabilidad Técnica y Económica",
            detalles: [
                "Realizar estudios preliminares para determinar la capacidad exacta de generación solar en la zona y los costos asociados.",
                "Definir las necesidades de inversión para cada empresa y los modelos de leasing aplicables."
            ]
        }
    ];

    return (
        <div className= "space-y-4 text-white bg-[#121212] p-4" style = {{ transform }
}>
    <h2 className="text-2xl font-bold mb-4 mt-5" >
        <span className="text-blue-500" > Ruta de Implementación </span> (Parte 1)
            </h2>
            < div className = "space-y-4" style = {{ transform: 'scale(0.95)' }} >
                {
                    pasos.map((paso, index) => (
                        <Card key= { index } className = "bg-gray-800 border-gray-700" >
                        <CardHeader className="flex flex-row items-center space-x-2 p-4" >
                        { paso.icon }
                    < CardTitle className = "text-lg font-semibold" >
                    { index + 1}. { paso.title }
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

export default RutaImplementacion1;