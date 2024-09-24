import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { Building, GraduationCap, Factory, CheckCircle } from 'lucide-react';

const VentajasActores = ({ transform = 'scale(1)' }) => {
    const actores = [
        {
            icon: <Building className="h-6 w-6 text-blue-500" />,
            title: "Municipalidad de San Pedro",
            ventajas: [
                "Crecimiento económico sostenido al permitir la expansión energética necesaria para nuevas inversiones y el desarrollo empresarial.",
                "Consolidación como un municipio pionero en la adopción de energías renovables y la ley de generación distribuida.",
                "Aumento en la recaudación de impuestos gracias al crecimiento del parque industrial y la instalación de nuevas empresas."
            ]
        },
        {
            icon: <GraduationCap className="h-6 w-6 text-green-500" />,
            title: "UBA",
            ventajas: [
                "Aprovechamiento de terrenos infrautilizados mediante un convenio que posiciona a la universidad como un actor clave en el desarrollo energético de la región.",
                "Posibilidad de desarrollar proyectos de investigación y desarrollo en colaboración con empresas locales y la municipalidad.",
                "Generación de ingresos adicionales mediante el uso de los terrenos para actividades de alto impacto."
            ]
        },
        {
            icon: <Factory className="h-6 w-6 text-yellow-500" />,
            title: "Empresas",
            ventajas: [
                "Acceso a energía limpia y a costos controlados, minimizando el impacto de los aumentos en las tarifas energéticas.",
                "Mejora en la sostenibilidad de sus operaciones y cumplimiento con normativas ambientales, lo que puede ser un diferenciador competitivo.",
                "Flexibilidad para escalar su generación de energía según su crecimiento sin necesidad de inversiones iniciales elevadas."
            ]
        }
    ];

    return (
        <div className= "space-y-4 text-white bg-[#121212] p-4" style = {{ transform }
}>
    <h2 className="text-2xl font-bold mb-4 mt-5" >
        <span className="text-blue-500" > Ventajas </span> para los Actores Clave
            </h2>

            < div className = "grid grid-cols-1 gap-4" style = {{ transform: 'scale(0.95)' }} >
            {
                actores.map((actor, index) => (
                    <Card key= { index } className = "bg-gray-800 border-gray-700" >
                    <CardHeader className="flex flex-row items-center space-x-2 p-4" >
                    { actor.icon }
                < CardTitle className = "text-lg font-semibold" >
                { actor.title }
                </CardTitle>
                </CardHeader>
                < CardContent >
                <ul className="space-y-2" >
                {
                    actor.ventajas.map((ventaja, idx) => (
                        <li key= { idx } className = "flex items-start" >
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-300" > { ventaja } </span>
                    </li>
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

export default VentajasActores;