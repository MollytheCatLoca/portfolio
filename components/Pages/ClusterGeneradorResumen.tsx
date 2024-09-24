import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { Users, Building, Sun, Zap } from 'lucide-react';

const ClusterGeneradorResumen = () => {
    const caracteristicas = [
        {
            icon: <Users className="h-5 w-5 text-blue-500" />,
            title: "Asociación Público-Privada",
            details: [
                "Colaboración entre municipio y empresas locales",
                "Municipio como vector del cluster",
                "Participación activa de la UBA"
            ]
        },
        {
            icon: <Building className="h-5 w-5 text-green-500" />,
            title: "Financiamiento Privado",
            details: [
                "Modelo de leasing para adquisición de parques solares",
                "Reducción de riesgos financieros para empresas",
                "Flexibilidad en la inversión según necesidades"
            ]
        },
        {
            icon: <Sun className="h-5 w-5 text-yellow-500" />,
            title: "Generación Distribuida",
            details: [
                "Aprovechamiento de 20 hectáreas de terreno",
                "Integración a la red bajo ley de generación distribuida",
                "Aumento de 20 MW en la capacidad energética"
            ]
        },
        {
            icon: <Zap className="h-5 w-5 text-purple-500" />,
            title: "Beneficios del Modelo",
            details: [
                "Crecimiento económico sostenible",
                "Protección contra aumentos en tarifas eléctricas",
                "Fomento de energías renovables y sostenibilidad"
            ]
        }
    ];

    return (
        <div className= "space-y-4 text-white bg-[#121212] p-4 mt-20" >
        <h2 className="text-2xl font-bold mb-4" >
            <span className="text-blue-500" > Cluster Generador de Energía Solar </span> en San Pedro
                </h2>
                < p className = "text-sm text-gray-300 mb-4 " style = {{ transform: 'scale(0.95)' }
} >
    Modelo innovador de asociación público - privada para el desarrollo energético sostenible,
        impulsando el crecimiento económico y la autonomía energética del municipio.
            </p>
            < div className = "grid grid-cols-2 gap-4" >
            {
                caracteristicas.map((caract, index) => (
                    <FeatureCard key= { index } { ...caract } />
                ))
            }
                </div>
                </div>
    );
};

const FeatureCard = ({ icon, title, details }) => (
    <Card className= "bg-gray-800 border-gray-700" >
    <CardHeader className="flex items-center space-x-2 p-2" >
        { icon }
        < CardTitle className = "text-sm font-semibold text-white" > { title } </CardTitle>
            </CardHeader>
            < CardContent className = "p-4" >
                <ul className="space-y-1" >
                {
                    details.map((detail, index) => (
                        <li key= { index } className = "flex items-start" >
                        <span className="text-green-500 mr-2" >•</span>
                    < span className = "text-xs text-gray-400" > { detail } </span>
                    </li>
                    ))
                }
                    </ul>
                    </CardContent>
                    </Card>
);

export default ClusterGeneradorResumen;