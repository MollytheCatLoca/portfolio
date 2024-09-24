import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { CheckCircle, DollarSign, Users, TrendingUp, Settings } from 'lucide-react';

const Opcion2 = () => {
    const steps = [
        'Planificación financiera: SAPEM determina el presupuesto disponible para inversiones en energía solar.',
        'Selección de proveedores: Confirmación de BIS y un pool de proveedores como socios estratégicos.',
        'Adquisición e instalación: Compra e instalación de los parques solares en ubicaciones estratégicas.',
        'Formalización de comodatos: Establecimiento de acuerdos legales con los clientes beneficiarios.',
        'Operación y mantenimiento: SAPEM gestiona la operación y mantenimiento de los parques.',
        'Evaluación continua: Análisis de rendimiento y planificación de futuras inversiones.',
    ];

    const benefits = [
        'Control total sobre los activos sin intermediarios financieros',
        'Mejora en el plazo de retorno de inversión',
        'Estrategia complementaria combinable con otras opciones',
        'Fidelización y retención de clientes',
        'Posibilidad de refinanciar activos en el futuro',
        'Optimización del flujo de caja y reservas',
    ];

    return (
        <div className= "transform scale-95" >
        <div className="space-y-3" >
            <h2 className="text-2xl font-bold text-white mb-3" >
                <span className="text-purple" > Opción 2: </span> Compra Directa de SAPEM a BIS
                    </h2>
                    < p className = "text-sm text-gray-300 mb-3" >
                        ENERSA utiliza su liquidez para comprar directamente los parques solares a BIS, entregándolos en comodato a sus clientes y manteniendo control total sobre los activos.
        </p>
                            < div className = "grid grid-cols-2 gap-3" >
                                <FeatureCard
            icon={ <DollarSign className="h-5 w-5 text-green-500" />}
    title = "Inversión Directa"
    details = {
        [
            'Utilización de recursos propios de SAPEM',
            'No implica endeudamiento ni costos financieros asociados al leasing',
            'Optimización del retorno de inversión',
            ]}
        />
        <FeatureCard
            icon={ <Users className="h-5 w-5 text-blue-500" />}
    title = "Fidelización de Clientes"
    details = {
        [
            'Entrega de parques en comodato a clientes',
            'Mejora en la relación comercial',
            'Asegura la continuidad de los clientes',
            ]}
        />
        <FeatureCard
            icon={ <Settings className="h-5 w-5 text-yellow-500" />}
    title = "Control Total"
    details = {
        [
            'SAPEM mantiene control completo sobre los activos',
            'Sin intermediarios financieros',
            'Flexibilidad en la gestión de los parques',
            ]}
        />
        <FeatureCard
            icon={ <TrendingUp className="h-5 w-5 text-purple-500" />}
    title = "Estrategia Complementaria"
    details = {
        [
            'Combinable con otras opciones para maximizar beneficios',
            'Contribuye a un plan integral de expansión',
            'Alineación con objetivos estratégicos de ENERSA',
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

export default Opcion2;
