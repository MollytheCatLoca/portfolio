import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { Building2, Shield, FileText, Zap, Check, Home, DollarSign } from 'lucide-react';

const CatamarcaPotential = () => {
    return (
        <div className= "space-y-4" >
        <h2 className="text-2xl font-bold text-white mb-2" >
            3. Beneficios para la Provincia de Catamarca
                </h2>
                < p className = "text-sm text-gray-300 mb-4" >
                    La implementación de los parques solares All -in -One de BIS Integraciones ofrece múltiples ventajas para Catamarca, potenciando el desarrollo energético y económico de la provincia:
    </p>
        < div className = "grid grid-cols-2 gap-4" >
            <StrategyCard
                    icon={ <Home className="h-6 w-6 text-purple-500" />}
    title = "Beneficios para Municipios"
    description = "Facilita a los municipios el acceso a energía solar, permitiendo financiar proyectos de obra pública con los ahorros generados en las facturas de luz."
    details = {
        [
            "Reducción de costos energéticos municipales",
            "Financiamiento de obras públicas sin aumentar impuestos",
            "Promoción de la autosuficiencia energética local",
                    ]}
        />
        <StrategyCard
                    icon={ <DollarSign className="h-6 w-6 text-green-500" />}
    title = "Excelente Retorno de Inversión"
    description = "Los parques modulares ofrecen un alto retorno de inversión, aprovechando las condiciones favorables del mercado y la alta eficiencia energética."
    details = {
        [
            "Tasas de retorno atractivas",
            "Rápida amortización de la inversión",
            "Incremento en el valor patrimonial",
                    ]}
        />
        <StrategyCard
                    icon={ <Zap className="h-6 w-6 text-yellow-500" />}
    title = "Obras Públicas Financiadas"
    description = "La energía generada permite financiar proyectos públicos, aprovechando los ahorros en gastos energéticos para reinvertir en infraestructura provincial."
    details = {
        [
            "Optimización del presupuesto público",
            "Desarrollo sostenible de la infraestructura",
            "Beneficios directos para la comunidad",
                    ]}
        />
        <StrategyCard
                    icon={ <Building2 className="h-6 w-6 text-blue-500" />}
    title = "Visión de Desarrollo Provincial"
    description = "Implementación de una estrategia energética que impulsa el crecimiento económico y posiciona a Catamarca como líder en energías renovables."
    details = {
        [
            "Atracción de inversiones nacionales e internacionales",
            "Generación de empleo en el sector energético",
            "Impulso a la innovación tecnológica",
                    ]}
        />
        <Card className="bg-gray-800 border-gray-700 col-span-2" >
            <CardHeader>
            <CardTitle className="text-lg font-semibold text-white flex items-center" >
                <Shield className="h-5 w-5 text-purple-500 mr-2" />
                    Impacto Positivo en Catamarca
                        </CardTitle>
                        </CardHeader>
                        < CardContent >
                        <ul className="grid grid-cols-2 gap-2 text-xs text-gray-300" >
                        {
                            [
                                "Reducción de la dependencia de energías fósiles",
                                "Disminución de la huella de carbono provincial",
                                "Fortalecimiento de la economía local",
                                "Mejora en la calidad de vida de los habitantes",
                                "Formación y capacitación en energías renovables",
                            ].map((benefit, index) => (
                                    <li key= { index } className = "flex items-start" >
                                    <Check className="h-4 w-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                                    <span>{ benefit } </span>
                                </li>
                                ))
                        }
                            </ul>
                            </CardContent>
                            </Card>
                            </div>
                            < p className = "text-xs text-gray-300 mt-4" >
                                La adopción de los parques All -in -One de BIS Integraciones permite a Catamarca aprovechar al máximo sus recursos naturales, impulsando un crecimiento sostenible y beneficiando directamente a sus municipios y habitantes.
            </p>
                                    </div>
    );
};

const StrategyCard = ({ icon, title, description, details }) => (
    <Card className= "bg-gray-800 border-gray-700" >
    <CardHeader className="flex flex-row items-center space-x-2 py-2" >
        { icon }
        < CardTitle className = "text-base font-semibold text-white" > { title } </CardTitle>
            </CardHeader>
            < CardContent className = "pt-0" >
                <p className="text-xs text-gray-300 mb-2" > { description } </p>
                    < ul className = "space-y-1" >
                    {
                        details.map((detail, index) => (
                            <li key= { index } className = "flex items-start" >
                            <Check className="h-3 w-3 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-400" > { detail } </span>
                        </li>
                        ))
                    }
                        </ul>
                        </CardContent>
                        </Card>
);

export default CatamarcaPotential;
