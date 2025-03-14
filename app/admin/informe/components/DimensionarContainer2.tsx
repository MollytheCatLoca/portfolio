'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/Card3";
import { useConstants } from '../contexts/ConstantsContext';
import AnalisisParqueSolar2 from './AnalisisParqueSolar2';

const DimensionarContainer2: React.FC = () => {
    const { constants, isLoading } = useConstants();
    const [isReady, setIsReady] = useState(false);

    // Este efecto se encarga de verificar cuando los datos están listos
    useEffect(() => {
        if (!isLoading && constants && constants.detailedMetrics) {
            // Verificamos si tenemos datos reales
            const hasRealData = 
                constants.detailedMetrics.capacityMW > 0 && 
                constants.detailedMetrics.valoresAnuales && 
                constants.detailedMetrics.valoresAnuales.generacionTotal > 0;
            
            setIsReady(true);
            
            // Log para debugging
            console.log("DimensionarContainer2 datos cargados:", {
                isLoading,
                hasRealData,
                capacityMW: constants.detailedMetrics.capacityMW,
                generacionTotal: constants.detailedMetrics.valoresAnuales?.generacionTotal
            });
        }
    }, [constants, isLoading]);

    return (
        <div className="space-y-6">
            {/* Estado de carga */}
            {isLoading && (
                <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="flex items-center justify-center p-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                        <span className="ml-3 text-gray-400">Cargando datos del parque solar...</span>
                    </CardContent>
                </Card>
            )}

            {/* Sección de Análisis */}
            <div>
                <div className="text-sm text-gray-400 font-medium px-2 mb-2">
                    {isReady ? (
                        <div className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                            Datos actualizados
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                            Esperando datos
                        </div>
                    )}
                </div>
                
                {/* Pasamos una key para forzar el re-renderizado cuando los datos cambian */}
                <AnalisisParqueSolar2 key={`analysis-${isReady ? 'ready' : 'loading'}-${constants?.detailedMetrics?.capacityMW || 0}`} />
            </div>
        </div>
    );
};

export default DimensionarContainer2;