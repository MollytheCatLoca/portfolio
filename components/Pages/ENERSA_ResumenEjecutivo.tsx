"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, Layers, Zap, Users, Lightbulb } from 'lucide-react';

const CustomAccordionItem = ({ title, icon, summary, details }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className= "mb-2 border border-gray-700 rounded-lg overflow-hidden" >
        <button
        className="w-full flex items-center justify-between p-3 bg-gray-700 text-white hover:bg-gray-600 transition-colors"
    onClick = {() => setIsOpen(!isOpen)}
      >
    <div className="flex items-center space-x-2" >
        { icon }
        < span className = "font-semibold" > { title } </span>
            </div>
            < ChevronDown className = {`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
                </button>
{
    isOpen && (
        <div className="p-3 bg-gray-750" >
            <p className="text-xs text-gray-300 mb-2" > { summary } </p>
                < ul className = "list-disc list-inside text-xs text-gray-400" >
                {
                    details.map((detail, idx) => (
                        <li key= { idx } > { detail } </li>
                    ))
                }
                    </ul>
                    </div>
      )
}
</div>
  );
};

const ResumenEjecutivo = () => {
    const opciones = [
        {
            title: 'Opción 1: Compra vía Leasing',
            icon: <Layers className="h-5 w-5 text-purple-500" />,
      summary: 'SAPEM adquiere parques "All In One" mediante leasing, aprovechando beneficios fiscales y fortaleciendo la fidelización de clientes.',
            details: [
                'Generadores pagados en 5-6 años con vida útil adicional de 20 años.',
                'Beneficios fiscales asociados al leasing.',
                'Flexibilidad para reubicar parques según necesidad.',
            ],
        },
        {
            title: 'Opción 2: Compra Directa',
            icon: <Zap className="h-5 w-5 text-green-500" />,
      summary: 'SAPEM utiliza su liquidez para comprar directamente los parques, manteniendo control total y optimizando el retorno de inversión.',
            details: [
                'Inversión directa sin endeudamiento.',
                'Control total sobre los activos.',
                'Posibilidad de refinanciar activos en el futuro.',
            ],
        },
        {
            title: 'Opción 3: Modelo Prosumer',
            icon: <Users className="h-5 w-5 text-blue-500" />,
      summary: 'Clientes de SAPEM se convierten en prosumidores, generando y consumiendo energía, con beneficios fiscales y operativos.',
            details: [
                'Empoderamiento del cliente en la transición energética.',
                'Beneficios fiscales del leasing para el cliente.',
                'Operación y mantenimiento a cargo de ENERSA.',
            ],
        },
        {
            title: 'Opción 4: Generador Comunitario',
            icon: <Lightbulb className="h-5 w-5 text-yellow-500" />,
      summary: 'Creación de un pool de empresas que co-invierten en un parque solar, aprovechando normativas recientes y modelos de financiación flexibles.',
            details: [
                'Sinergias empresariales y colaboración.',
                'Mayor capacidad instalada y eficiencia.',
                'Reducción de costos energéticos y dependencia de CAMMESA.',
            ],
        },
    ];

    return (
        <div className= "transform scale-105 mt-10" >
        <div className= "space-y-4 " >
            <Card className="bg-gray-800 border-gray-700" >
                <CardHeader className="p-4" >
                    <CardTitle className="text-2xl font-bold text-blue-500" >
                        Resumen Ejecutivo de Propuestas
                            </CardTitle>
                            </CardHeader>
                            < CardContent className = "p-4" >
                                <p className="text-sm text-gray-300 mb-4" >
                                    Presentamos cuatro opciones estratégicas para impulsar la generación de energía solar en La Rioja, aprovechando las ventajas del modelo All In One de BIS Integraciones.
          </p>
                                        < div className = "grid grid-cols-1 md:grid-cols-2 gap-4" >
                                        {
                                            opciones.map((opcion, index) => (
                                                <CustomAccordionItem key= { index } { ...opcion } />
            ))
                                        }
                                            </div>
                                            </CardContent>
                                            </Card>
                                            </div>
                                            </div>
  );
};

export default ResumenEjecutivo;