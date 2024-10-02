import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { CheckCircle, DollarSign, TrendingUp, Users, Repeat } from 'lucide-react';

const Opcion1 = () => {
    const steps = [
        'Identificación de necesidades y capacidad requerida.',
        'Gestión de financiamiento con soporte de BIS en negociación y presentación.',
        'Adquisición de parques &quot;All In One&quot; de BIS.',
        'Formalización de contratos de comodato con clientes.',
        'Instalación y puesta en marcha de los parques.',
        'Operación y mantenimiento a cargo de SAPEM/BIS.',
        'Monitorización y planificación para expansiones futuras.',
    ];

    const benefits = [
        'Beneficios fiscales del leasing',
        'Elevadas TIRs y retorno de inversión',
        'Fidelización y retención de clientes',
        'Flexibilidad y escalabilidad del modelo',
        'Reducción de dependencia de CAMMESA',
        'Compromiso con la sostenibilidad y energías renovables',
    ];

    return (
        <div className= "space-y-3" >
        <h2 className="text-2xl font-bold text-white mb-3" >
            <span className="text-purple" > Opción 1: </span> Compra de Parques por SAPEM vía Leasing
                </h2>
                < p className = "text-sm text-gray-300 mb-3" >
                    ENERSA adquiere parques solares & quot; all -in -one & quot; a través de un contrato de leasing, aprovechando la modularidad y beneficios fiscales, y fortaleciendo la fidelización de sus clientes.
            </p>
                        < div className = "grid grid-cols-2 gap-3" >
                            <FeatureCard
                    icon={ <DollarSign className="h-5 w-5 text-green-500" />}
    title = "Ventajas Financieras"
    details = {
        [
        'Generadores pagados en 5-6 años con vida útil adicional de 20 años',
        'Beneficios fiscales asociados al leasing',
        'Elevadas TIRs y retorno de inversión',
                    ]}
        />
        <FeatureCard
                    icon={ <Users className="h-5 w-5 text-blue-500" />}
    title = "Fidelización de Clientes"
    details = {
        [
        'Entrega de parques en comodato a grandes clientes',
        'Mejora en la relación comercial',
        'Flexibilidad para reubicar parques si es necesario',
                    ]}
        />
        <FeatureCard
                    icon={ <TrendingUp className="h-5 w-5 text-yellow-500" />}
    title = "Escalabilidad"
    details = {
        [
        'Incremento de capacidad a medida que se obtiene financiamiento',
        'Complementariedad con otras estrategias',
        'Reducción de dependencia de CAMMESA',
                    ]}
        />
        <FeatureCard
                    icon={ <Repeat className="h-5 w-5 text-purple-500" />}
    title = "Flexibilidad Operativa"
    details = {
        [
        'Posibilidad de reubicar parques según necesidad',
        'Adaptabilidad a cambios en contratos con clientes',
        'Optimización de recursos y activos',
                    ]}
        />
        </div>
    {/* El resto del componente permanece igual */ }
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

export default Opcion1;