import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { AlertTriangle, Lightbulb, Sun, Battery, Zap, Building } from 'lucide-react';

const ResumenEjecutivo = ({ transform = 'scale(1)' }) => {
    const solucionPropuesta = [
        {
            icon: <Sun className="h-6 w-6 text-yellow-500" />,
            title: "Cluster Generador de Energía Solar",
            description: "Creación de un cluster en terrenos de 20 hectáreas, mediante convenio entre la municipalidad y la UBA, aprovechando tierras disponibles en la zona."
        },
        {
            icon: <Battery className="h-6 w-6 text-green-500" />,
            title: "Parques Solares All-In-One",
            description: "Instalación de parques solares modulares mediante leasing para empresas locales, permitiendo ajustar la capacidad de generación al consumo energético actual y futuro de cada empresa."
        },
        {
            icon: <Zap className="h-6 w-6 text-blue-500" />,
            title: "Generación Distribuida",
            description: "Integración de la energía generada bajo el marco de la ley de generación distribuida, con operación y mantenimiento a cargo de la cooperativa eléctrica, garantizando continuidad sin necesidad de gestión por parte de las empresas."
        },
        {
            icon: <Building className="h-6 w-6 text-purple-500" />,
            title: "Mejora de Capacidad y Protección",
            description: "Aumento de la capacidad de generación energética del municipio en 20 MW, asegurando que las empresas no se vean afectadas por futuros aumentos del costo de la energía (50% proyectado)."
        }
    ];

    return (
        <div className= "space-y-2 text-white bg-[#121212] p-4 " style = {{ transform: 'scale(0.95)' }
}>
    <h2 className="text-2xl font-bold mb-2 mt-2" >
        <span className="text-blue-500" > Resumen Ejecutivo: </span> Problemática y Solución Propuesta
            </h2>

            < Card className = "bg-gray-800 border-gray-700 mb-2" style = {{ transform: 'scale(0.90)' }}>
                <CardHeader>
                <CardTitle className="flex items-center text-lg font-semibold text-red-500" >
                    <AlertTriangle className="h-6 w-6 mr-2" />
                        Problemática
                        </CardTitle>
                        </CardHeader>
                        < CardContent >
                        <p className="text-sm" >
                            El municipio de San Pedro enfrenta una limitación en su capacidad de crecimiento debido a la imposibilidad de ampliar el suministro energético más allá de los 42 MW generados por la cooperativa eléctrica actual.Esto frena el desarrollo empresarial y la atracción de nuevas inversiones.
                    </p>
                                </CardContent>
                                </Card>

                                < Card className = "bg-gray-800 border-gray-700" style = {{ transform: 'scale(0.90)' }}>
                                    <CardHeader>
                                    <CardTitle className="flex items-center text-lg font-semibold text-green-500" >
                                        <Lightbulb className="h-6 w-6 mr-2" />
                                            Solución Propuesta
                                                </CardTitle>
                                                </CardHeader>
                                                < CardContent >
                                                <div className="grid grid-cols-1 gap-2" >
                                                {
                                                    solucionPropuesta.map((item, index) => (
                                                        <Card key= { index } className = "bg-gray-700 border-gray-600" >
                                                        <CardHeader className="flex flex-row items-center space-x-2 p-3" >
                                                        { item.icon }
                                                    < CardTitle className = "text-md font-semibold" >
                                                    { item.title }
                                                    </CardTitle>
                                                    </CardHeader>
                                                    < CardContent className = "pt-0 pb-3 px-3" >
                                                    <p className="text-sm text-gray-300" > { item.description } </p>
                                                    </CardContent>
                                                    </Card>
                                                    ))
                                                }
                                                    </div>
                                                    </CardContent>
                                                    </Card>
                                                    </div>
    );
};

export default ResumenEjecutivo;