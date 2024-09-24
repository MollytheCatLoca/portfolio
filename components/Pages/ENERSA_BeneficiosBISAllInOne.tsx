import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { Package, Clock, TrendingUp, ShieldCheck, Globe, LineChart, Check } from 'lucide-react';

const BeneficiosBISAllInOne = () => {
    const beneficios = [
        {
            icon: <Package className="h-6 w-6 text-purple-500" />,
            title: 'Solución Integral',
            description: 'Ingeniería completa en contenedores, facilitando la instalación y reducción de tiempos.',
        },
        {
            icon: <Clock className="h-6 w-6 text-green-500" />,
            title: 'Rápida Implementación',
            description: 'Entrega de parques en tan solo 60 días, acelerando la puesta en marcha de proyectos.',
        },
        {
            icon: <TrendingUp className="h-6 w-6 text-blue-500" />,
            title: 'Escalabilidad Modular',
            description: 'Permite incrementar la capacidad instalada de forma gradual y según necesidades.',
        },
        {
            icon: <ShieldCheck className="h-6 w-6 text-yellow-500" />,
            title: 'Financiación Flexible',
            description: 'Adaptable a diferentes modelos financieros como leasing, fideicomisos y ONs.',
        },
        {
            icon: <Globe className="h-6 w-6 text-teal-500" />,
            title: 'Sostenibilidad',
            description: 'Contribuye a la reducción de emisiones y promueve el uso de energías limpias.',
        },
        {
            icon: <LineChart className="h-6 w-6 text-indigo-500" />,
            title: 'Simulador Avanzado',
            description: 'Proyecciones detalladas basadas en ubicación y potencia deseada, considerando variables técnicas y económicas clave.',
        },
    ];

    return (
        <section className= "mt-7" >
        <Card className="bg-black-200 border-gray-800" >
            <CardHeader className="pb-5" >
                <CardTitle className="text-2xl font-bold text-white" >
                    Beneficios < span className = "text-blue-500" > Parques All In One </span>
                        </CardTitle>
                        </CardHeader>
                        < CardContent >
                        <p className="text-gray-300 mb-5" >
                            BIS INTEGRACIONES presenta su revolucionario sistema All In One para parques solares fotovoltaicos,
                                ofreciendo una solución integral que optimiza la implementación y operación de proyectos energéticos.
                    </p>

                                    < div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" >
                                    {
                                        beneficios.map((beneficio, index) => (
                                            <FeatureCard
                                key= { index }
                                icon = { beneficio.icon }
                                title = { beneficio.title }
                                description = { beneficio.description }
                                            />
                        ))
                                    }
                                        </div>

                                        < div className = "mt-5 p-4 bg-gray-800 rounded-lg" >
                                            <h3 className="text-xl font-bold mb-2" >
                                                <span className="text-blue-500" > Ventajas </span> Clave
                                                    </h3>
                                                    < div className = "grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-300" >
                                                        <div className="flex items-center space-x-2" >
                                                            <Check className="h-4 w-4 text-green-500" />
                                                                <span>Reducción de costos operativos y de instalación </span>
                                                                    </div>
                                                                    < div className = "flex items-center space-x-2" >
                                                                        <Check className="h-4 w-4 text-green-500" />
                                                                            <span>Flexibilidad para proyectos de distintas escalas </span>
                                                                                </div>
                                                                                < div className = "flex items-center space-x-2" >
                                                                                    <Check className="h-4 w-4 text-green-500" />
                                                                                        <span>Optimización de recursos y eficiencia energética </span>
                                                                                            </div>
                                                                                            < div className = "flex items-center space-x-2" >
                                                                                                <Check className="h-4 w-4 text-green-500" />
                                                                                                    <span>Mejora en gestión y mantenimiento de parques </span>
                                                                                                        </div>
                                                                                                        < div className = "flex items-center space-x-2" >
                                                                                                            <Check className="h-4 w-4 text-green-500" />
                                                                                                                <span>Incremento de competitividad en el mercado </span>
                                                                                                                    </div>
                                                                                                                    </div>
                                                                                                                    < p className = "mt-3 text-gray-300" >
                                                                                                                        La combinación del sistema All In One y nuestro simulador avanzado posiciona a BIS Integraciones
                            a la vanguardia del sector energético, simplificando la planificación, financiamiento e implementación de proyectos solares.
                        </p>
        </div>
        </CardContent>
        </Card>
        </section>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <Card className= "bg-gray-800 border-gray-700" >
    <CardHeader className="flex flex-row items-center space-x-2 py-3" >
        { icon }
        < CardTitle className = "text-lg font-semibold text-white" > { title } </CardTitle>
            </CardHeader>
            < CardContent className = "py-2" >
                <p className="text-sm text-gray-300" > { description } </p>
                    </CardContent>
                    </Card>
);

export default BeneficiosBISAllInOne;