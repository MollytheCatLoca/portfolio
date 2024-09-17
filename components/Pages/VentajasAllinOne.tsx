import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { DollarSign, Building, Shield, FileText, Check } from 'lucide-react';

const VentajasAllinOne = () => {
    return (
        <div className= "space-y-4" >
        <h2 className="text-2xl font-bold text-white mb-4" >
            <span className = "text-purple" > Financiación </span >por su Estructura Modular
                </h2>
                < p className = "text-sm text-gray-300 mb-4" >
                    La estructura modular de los parques All -in -One de BIS Integraciones ofrece múltiples ventajas en términos de financiamiento, adaptándose a proyectos de diferentes escalas:
    </p>
        < div className = "grid grid-cols-2 gap-4" >
            <FinancingCard
          icon={ <DollarSign className="h-6 w-6 text-blue-500" />}
    title = "Leasing"
    description = "Ideal para proyectos entre 300 kW y 3 MW, aprovechando líneas de crédito con condiciones favorables, incluyendo tasas competitivas y plazos de hasta 60 meses."
    details = {
        [
            "Flexibilidad en la estructuración de pagos",
            "Posibilidad de incluir opciones de compra al final del contrato",
            "Beneficios fiscales potenciales para el arrendatario"
        ]}
        />
        <FinancingCard
          icon={ <Building className="h-6 w-6 text-green-500" />}
    title = "Fideicomisos"
    description = "Permiten la adquisición del parque solar y la venta de energía generada, garantizando un flujo de ingresos constante y fortaleciendo la infraestructura energética."
    details = {
        [
            "Separación patrimonial que reduce riesgos",
            "Estructura flexible adaptable a múltiples inversores",
            "Facilita la gestión y distribución de beneficios"
        ]}
        />
        <FinancingCard
          icon={ <Shield className="h-6 w-6 text-yellow-500" />}
    title = "Sociedades de Garantía Recíproca (SGRs)"
    description = "Utilizadas para respaldar créditos en proyectos de 1 MW a 10 MW, facilitando el acceso a financiamiento seguro y respaldado."
    details = {
        [
            "Mejora las condiciones de acceso al crédito",
            "Reduce los requerimientos de garantías propias",
            "Posibilidad de obtener tasas más competitivas"
        ]}
        />
        <FinancingCard
          icon={ <FileText className="h-6 w-6 text-purple-500" />}
    title = "Obligaciones Negociables (ONs)"
    description = "Emisión de títulos de deuda para proyectos de gran escala, ampliando las fuentes de financiamiento y permitiendo la expansión modular."
    details = {
        [
            "Acceso a mercados de capitales más amplios",
            "Posibilidad de estructurar pagos acordes al flujo del proyecto",
            "Mejora el perfil financiero de la empresa emisora"
        ]}
        />
        </div>
        < Card className = "bg-gray-800 border-gray-700 mt-4" >
            <CardHeader>
            <CardTitle className="text-lg font-semibold text-white" > Beneficios de la Estructura Modular de Financiación </CardTitle>
                </CardHeader>
                < CardContent >
                <ul className="grid grid-cols-2 gap-2 text-xs text-gray-300" >
                {
                    [
                        "Adaptabilidad a diferentes tamaños y etapas de proyectos",
                        "Optimización de costos financieros",
                        "Diversificación de fuentes de financiamiento",
                        "Facilita la expansión gradual y el escalamiento",
                        "Mejora la viabilidad y sostenibilidad a largo plazo"
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
  );
};

const FinancingCard = ({ icon, title, description, details }) => (
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

export default VentajasAllinOne;