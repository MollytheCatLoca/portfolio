'use client';

import { useQueryParams } from '@/context/QueryParamsContext';
import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getParquesSolaresData } from '@/lib/apiSolar';
import GlobalExecutiveSummary from '@/components/dashboard/GlobalExecutiveSummary';
import GlobalHeader from '@/components/dashboard/GlobalHeader';
import LocationMap from '@/components/dashboard/LocationMap';
import GlobalEnergyGeneration from '@/components/dashboard/GlobalEnergyGeneration';
import GlobalFinancialAnalysis from '@/components/dashboard/GlobalFinancialAnalysis';
import GlobalEnvironmentalImpact from '@/components/dashboard/GlobalEnvironmentalImpact';
import TechnicalDetails from '@/components/dashboard/TechnicalDetails';
import InterpretationCenter from '@/components/dashboard/InterpretationCenter';
import Footer_Energy_Dash from './Footer_EnergyDash';
import { Skeleton } from '@/components/ui/skeleton';
import GeneratePDFButton from '@/components/GeneratePDFButton';
import SavingsVsCostsChart from '@/components/dashboard/SavingsVsCostsChart';

interface DashboardPageContentProps {
    initialScenarios: any[];
    initialQueryParams: {
        provincia: string;
        localidad: string;
        capacidad: string;
        area: string;
    };
}

export default function DashboardPageContent({ initialScenarios, initialQueryParams }: DashboardPageContentProps) {
    const router = useRouter();
    const { queryParams, setQueryParams } = useQueryParams();
    const [scenarios, setScenarios] = useState(initialScenarios);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setQueryParams(initialQueryParams);
    }, [initialQueryParams, setQueryParams]);

    useEffect(() => {
        const fetchData = async () => {
            if (!queryParams.provincia || !queryParams.localidad || !queryParams.capacidad || !queryParams.area) {
                console.log("Faltan parámetros, pero no redirigiremos automáticamente");
                setError("Faltan parámetros necesarios para la simulación");
                return;
            }

            setIsLoading(true);
            setError(null);
            try {
                const data = await getParquesSolaresData(queryParams);
                console.log("Datos obtenidos OK");
                if (Array.isArray(data) && data.length > 0) {
                    setScenarios(data);
                } else {
                    setError("No se encontraron escenarios para los parámetros proporcionados");
                }
            } catch (error) {
                console.error("Error al cargar los escenarios:", error);
                setError("Error al cargar los escenarios. Por favor, intente de nuevo.");
            } finally {
                setIsLoading(false);
            }
        };

        if (scenarios.length === 0) {
            fetchData();
        }
    }, [queryParams, scenarios]);

    if (isLoading) {
        return <div>Cargando datos...</div>;
    }

    if (error) {
        return (
            <div>
            <p>{ error } </p>
            < button onClick = {() => router.push('/energy/simulate')
    }>
        Volver a la simulación
            </button>
            </div>
        );
}

if (!scenarios || scenarios.length === 0) {
    return (
        <div>
        No se encontraron escenarios. 
                < button onClick = {() => router.push('/energy/simulate')
}>
    Volver a la simulación
        </button>
        </div>
        );
    }

const parqueName = scenarios[0].nombre.split(' - ')[0];

return (
    <div className= "flex flex-col min-h-screen bg-black-100 text-white" >
    <GlobalHeader parqueName={ `Parque ${scenarios[0].ubicacion.ciudad}` } />
        < main className = "flex-grow pt-4 sm:pt-6" >
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
                <div className="space-y-12" >
                    <Suspense fallback={ <Skeleton className="h-[200px] w-full bg-gray-800" />}>
                        <GlobalExecutiveSummary scenarios={ scenarios } queryParams = { queryParams } />
                            </Suspense>

                            < Suspense fallback = {< Skeleton className = "h-[400px] w-full bg-gray-800" />}>
                                <LocationMap ubicacion={ scenarios[0].ubicacion } terreno = { scenarios[0].terreno } />
                                    </Suspense>

                                    < Suspense fallback = {< Skeleton className = "h-[400px] w-full bg-gray-800" />}>
                                        <GlobalEnergyGeneration scenarios={ scenarios } />
                                            </Suspense>

                                            < Suspense fallback = {< Skeleton className = "h-[400px] w-full bg-gray-800" />}>
                                                <GlobalFinancialAnalysis scenarios={ scenarios } />
                                                    </Suspense>


                                                    < Suspense fallback = {< Skeleton className = "h-[400px] w-full bg-gray-800" />}>
                                                        <SavingsVsCostsChart scenarios={ scenarios } />
                                                            </Suspense>


                                                            < Suspense fallback = {< Skeleton className = "h-[400px] w-full bg-gray-800" />}>
                                                                <GlobalEnvironmentalImpact scenarios={ scenarios } />
                                                                    </Suspense>

                                                                    < Suspense fallback = {< Skeleton className = "h-[400px] w-full bg-gray-800" />}>
                                                                        <TechnicalDetails detallesTecnicos={ scenarios[0].detallesTecnicos } capacidad = { scenarios[0].capacidad } />
                                                                            </Suspense>

                                                                            < Suspense fallback = {< Skeleton className = "h-[400px] w-full bg-gray-800 mb-10" />}>
                                                                                <InterpretationCenter impactoSocial={ scenarios[0].impactoSocial } />
                                                                                    </Suspense>
                                                                                    </div>
                                                                                    </div>
                                                                                    </main>
                                                                                    < div className = "mt-20 mb-16 w-4/5 mx-auto" >

                                                                                        <Footer_Energy_Dash scenarios = { scenarios } />
                                                                                            </div>
                                                                                            </div>
    );
}