import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { CheckCircle, Users, Globe, Layers, Zap } from 'lucide-react';

const Opcion4 = () => {
    const steps = [
        'Convocatoria y organización: Identificación de empresas interesadas y formalización del pool.',
        'Definición del modelo legal: Establecimiento de acuerdos de asociación o constitución del fideicomiso.',
        'Planificación del proyecto: Dimensionamiento del parque y análisis de viabilidad.',
        'Gestión de financiamiento: Negociación de términos financieros y obtención de fondos.',
        'Adquisición e implementación: Compra del parque a BIS y desarrollo del proyecto.',
        'Operación y distribución: Gestión operativa y distribución de energía según participación.',
        'Seguimiento y reporte: Transparencia en la gestión y comunicación de resultados a los participantes.',
    ];

    const benefits = [
        'Sinergias empresariales y colaboración',
        'Escalabilidad y eficiencia en mayor capacidad instalada',
        'Reducción de costos energéticos',
        'Promoción de energías limpias y sostenibilidad',
        'Rápida implementación gracias al modelo leasing',
        'Reducción de dependencia de CAMMESA',
    ];

    return (
        <div className= "transform scale-90" >
        <div className="space-y-1" >
            <h2 className="text-2xl font-bold text-white mb-3" >
                <span className="text-purple" > Opción 4: </span> Modelo Generador Comunitario
                    </h2>
                    < p className = "text-sm text-gray-300 mb-3" >
                        Aprovechando normativas recientes, se crea un pool de empresas que co - invierten en un parque solar de mayor escala, integrándose en el modelo de PPA público - privado de La Rioja.
        </p>
                            < div className = "grid grid-cols-2 gap-3" >
                                <FeatureCard
            icon={ <Users className="h-5 w-5 text-blue-500" />}
    title = "Asociación Empresarial"
    details = {
        [
            'Creación de un pool de empresas',
            'Co-inversión en parques solares',
            'Fortalece relaciones y colaboración',
            ]}
        />
        <FeatureCard
            icon={ <Globe className="h-5 w-5 text-green-500" />}
    title = "Aprovechamiento Normativo"
    details = {
        [
            'Utiliza la Resolución 235/2024 y Ley 27.424',
            'Ampliación de límites de inyección a la red',
            'Promueve la generación distribuida',
            ]}
        />
        <FeatureCard
            icon={ <Layers className="h-5 w-5 text-yellow-500" />}
    title = "Modelos de Financiación"
    details = {
        [
            'Leasing individual o fideicomiso',
            'Emisión de Obligaciones Negociables',
            'Flexibilidad en estructuras financieras',
            ]}
        />
        <FeatureCard
            icon={ <Zap className="h-5 w-5 text-purple-500" />}
    title = "Escalabilidad y Eficiencia"
    details = {
        [
            'Mayor capacidad instalada',
            'Optimización de recursos',
            'Rápida implementación (parques en 60 días)',
            ]}
        />
        </div>
        < Card className = "bg-gray-800 border-gray-700 p-1" >
            <CardHeader className="p-1" >
                <CardTitle className="text-lg font-semibold ml-2" >
                    <span className="text-blue-500" > Pasos </span> a Seguir
                        </CardTitle>
                        </CardHeader>
                        < CardContent className = "p-4" >
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-300" >
                                {
                                    steps.map((step, index) => (
                                        <div key= { index } className = "flex items-start" >
                                        <span className="mr-1 font-bold text-green-500" > { index + 1}.</span>
                                < span > { step } </span>
                                </div>
              ))}
</div>
    </CardContent>
    </Card>
    < Card className = "bg-gray-800 border-gray-700 mt-3 p-2" >
        <CardHeader className="p-2" >
            <CardTitle className="text-lg font-semibold" >
                <span className="text-blue-500" > Beneficios </span> Clave
                    </CardTitle>
                    </CardHeader>
                    < CardContent className = "p-2" >
                        <ul className="grid grid-cols-2 gap-1 text-xs text-gray-300" >
                        {
                            benefits.map((benefit, index) => (
                                <li key= { index } className = "flex items-start" >
                                <CheckCircle className="h-3 w-3 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                                <span>{ benefit } </span>
                            </li>
                            ))
                        }
                            </ul>
                            </CardContent>
                            </Card>
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
                <ul className="space-y-0" >
                {
                    details.map((detail, index) => (
                        <li key= { index } className = "flex items-start" >
                        <CheckCircle className="h-3 w-3 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-400" > { detail } </span>
                    </li>
                    ))
                }
                    </ul>
                    </CardContent>
                    </Card>
);

export default Opcion4;
