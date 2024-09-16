import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { Sun, Zap, LineChart, Package, Clock, DollarSign } from 'lucide-react';

const ExecutiveIntro = ({ simulationData }) => {
    return (
        <section className= "mt-8" >
        <Card className="bg-black-200 border-gray-800" >
            <CardHeader>
            <CardTitle className="text-2xl font-bold text-white" >
                Sistema All - In - One para Parques Fotovoltaicos
                    </CardTitle>
                    </CardHeader>
                    < CardContent >
                    <p className="text-gray-300 mb-6" >
                        BIS INTEGRACIONES presenta su revolucionario sistema All - In - One para parques solares fotovoltaicos,
                            junto con un simulador avanzado que evalúa integralmente su implementación.
          </p>

                                < div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
                                    <FeatureCard 
              icon={ <LineChart className="h-6 w-6 text-blue-500" />}
    title = "Simulador Avanzado"
    description = "Proyecciones detalladas basadas en ubicación y potencia deseada, considerando variables técnicas y económicas clave."
        />
        <FeatureCard 
              icon={ <Package className="h-6 w-6 text-green-500" />}
    title = "Containerización Integral"
    description = "Integración completa de componentes en contenedores estándar, optimizando espacio y logística."
        />
        <FeatureCard 
              icon={ <Zap className="h-6 w-6 text-yellow-500" />}
    title = "Sistema Plug-In Avanzado"
    description = "Strings de paneles preensamblados para instalación rápida y segura mediante conexiones simples."
        />
        <FeatureCard 
              icon={ <Clock className="h-6 w-6 text-purple-500" />}
    title = "Simplicidad y Rapidez"
    description = "Minimiza tiempos y costos de instalación, acelerando la puesta en marcha del proyecto."
        />
        <FeatureCard 
              icon={ <Sun className="h-6 w-6 text-orange-500" />}
    title = "Modularidad y Escalabilidad"
    description = "Permite expandir el parque solar de manera gradual y flexible, adaptándose a necesidades y recursos."
        />
        <FeatureCard 
              icon={ <DollarSign className="h-6 w-6 text-indigo-500" />}
    title = "Flexibilidad Financiera"
    description = "Facilita acceso a diversas fuentes de financiamiento, permitiendo instalación progresiva y optimización del ROI."
        />
        </div>

        < div className = "mt-6 p-4 bg-gray-800 rounded-lg" >
            <p className = "text-gray-300" >
                La combinación del sistema All - In - One y nuestro simulador avanzado posiciona a BIS Integraciones 
              a la vanguardia del sector energético, ofreciendo soluciones innovadoras que simplifican la
    planificación, financiamiento e implementación de proyectos solares.
            </p>
        </div>
        </CardContent>
        </Card>
        </section>
  );
};

const FeatureCard = ({ icon, title, description }) => (
    <Card className= "bg-gray-800 border-gray-700" >
    <CardHeader className="flex flex-row items-center space-x-2" >
        { icon }
        < CardTitle className = "text-lg font-semibold text-white" > { title } </CardTitle>
            </CardHeader>
            < CardContent >
            <p className="text-sm text-gray-300" > { description } </p>
                </CardContent>
                </Card>
);

export default ExecutiveIntro;

