import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { CheckCircle, Users, Lightbulb, ShieldCheck, Globe } from 'lucide-react';

const Opcion3 = () => {
    const steps = [
        'Identificación de clientes potenciales: Empresas con alto consumo energético y buen perfil crediticio.',
        'Propuesta de valor: Presentación del modelo de PPA híbrido y sus beneficios.',
        'Gestión de financiamiento: Asistencia al cliente para obtener leasing con garantía SGR (BIS provee este soporte).',
        'Instalación del parque: BIS instala el sistema en las instalaciones del cliente.',
        'Operación y mantenimiento: ENERSA opera el parque, garantizando eficiencia y mantenimiento.',
        'Monitoreo y ajustes: Seguimiento del rendimiento y ajuste de términos según sea necesario.',
    ];

    const benefits = [
        'Empoderamiento del cliente en la transición energética',
        'Beneficios fiscales para el cliente asociados al leasing',
        'Reducción de la huella de carbono y contribución a la sostenibilidad',
        'Incremento de capacidad sin depender de CAMMESA',
        'Educación y capacitación en gestión energética',
        'Fortalecimiento de la relación cliente-empresa',
    ];

    return (
        <div className= "transform scale-90" >
        <div className="space-y-3" >
            <h2 className="text-2xl font-bold text-white mb-3" >
                <span className="text-purple" > Opción 3: </span> Modelo Prosumer (Prosumidores)
                    </h2>
                    < p className = "text-sm text-gray-300 mb-3" >
                        Clientes de SAPEM se convierten en productores y consumidores de energía mediante generación distribuida, aprovechando beneficios fiscales y fortaleciendo la colaboración público - privada.
        </p>
                            < div className = "grid grid-cols-2 gap-3" >
                                <FeatureCard
            icon={ <Users className="h-5 w-5 text-blue-500" />}
    title = "Participación del Cliente"
    details = {
        [
            'Clientes se convierten en prosumidores',
            'Generación distribuida en sus instalaciones',
            'Uso de su capacidad de endeudamiento',
            ]}
        />
        <FeatureCard
            icon={ <ShieldCheck className="h-5 w-5 text-green-500" />}
    title = "Beneficios Fiscales"
    details = {
        [
            'Cliente obtiene beneficios fiscales del leasing',
            'Utilización de Sociedades de Garantía Recíproca (SGRs)',
            'Acceso a financiamiento seguro y respaldado',
            ]}
        />
        <FeatureCard
            icon={ <Lightbulb className="h-5 w-5 text-yellow-500" />}
    title = "Operación por SAPEM"
    details = {
        [
            'ENERSA opera y mantiene el parque',
            'Garantiza eficiencia y rendimiento',
            'Cliente se beneficia sin gestionar la operación',
            ]}
        />
        <FeatureCard
            icon={ <Globe className="h-5 w-5 text-purple-500" />}
    title = "Marco Normativo"
    details = {
        [
            'Basado en iniciativas como REM MDI y Resolución 235/2024',
            'Promueve la colaboración público-privada',
            'Contribuye a objetivos de sostenibilidad',
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

export default Opcion3;
