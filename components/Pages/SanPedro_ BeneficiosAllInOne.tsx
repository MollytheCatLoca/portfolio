import React from 'react';
import { Card, CardContent } from '@/components/ui/Card3';
import { Zap, DollarSign, Shield, Network, Wrench } from 'lucide-react';

const BeneficiosAllInOne = ({ transform = 'scale(1)' }) => {
    const beneficios = [
        {
            icon: <Zap className="h-5 w-5 text-yellow-500" />,
            title: "Flexibilidad y escalabilidad",
            description: [
                "Adquisición de parques solares modulares según necesidades.",
                "Permite a las empresas controlar su consumo y evitar sobrecostos, adaptándose a su crecimiento futuro."
            ]
        },
        {
            icon: <DollarSign className="h-5 w-5 text-green-500" />,
            title: "Reducción de riesgos financieros",
            description: [
                "Leasing evita grandes inversiones iniciales.",
                "Mejora el flujo de caja de las empresas, permitiendo una gestión financiera más eficiente y flexible."
            ]
        },
        {
            icon: <Shield className="h-5 w-5 text-blue-500" />,
            title: "Protección frente a aumentos tarifarios",
            description: [
                "Costo fijo de energía asegurado.",
                "Los parques solares propios protegen a las empresas de futuros incrementos en las tarifas eléctricas, ofreciendo estabilidad a largo plazo."
            ]
        },
        {
            icon: <Network className="h-5 w-5 text-purple-500" />,
            title: "Generación distribuida",
            description: [
                "Mayor eficiencia y autonomía energética.",
                "Las empresas se integran al esquema de generación distribuida, optimizando la red eléctrica local y reduciendo pérdidas por transmisión."
            ]
        },
        {
            icon: <Wrench className="h-5 w-5 text-orange-500" />,
            title: "Simplicidad operativa",
            description: [
                "Gestión por cooperativa eléctrica municipal.",
                "Elimina la necesidad de que cada empresa se ocupe del mantenimiento técnico, centralizando la operación y optimizando recursos."
            ]
        }
    ];

    return (
        <div className= "space-y-3 text-white bg-[#121212] p-3" style = {{ transform }
}>
    <h2 className="text-2xl font-bold mb-3 mt-5" >
        <span className="text-blue-500" > Beneficios de los Parques All In One </span> para el Cluster Generador
            </h2>

            < div className = "grid grid-cols-1 gap-3 " style = {{ transform: 'scale(0.95)' }}>
            {
                beneficios.map((beneficio, index) => (
                    <Card key= { index } className = "bg-gray-800 border-gray-700" >
                    <CardContent className="p-3" >
                <div className="flex items-center space-x-3 mb-2" >
                { beneficio.icon }
                < h3 className = "text-lg font-semibold" > { beneficio.title } </h3>
                </div>
                < div className = "space-y-1" >
                {
                    beneficio.description.map((desc, i) => (
                        <p key= { i } className = "text-sm text-gray-300" >
                            { i === 0 ? <strong>{ desc } </strong> : desc}
                </p>
                ))
            }
                </div>
                </CardContent>
                </Card>
                ))}
</div>
    </div>
    );
};

export default BeneficiosAllInOne;