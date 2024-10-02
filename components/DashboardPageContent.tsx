'use client';

import { useQueryParams } from '@/context/QueryParamsContext';
import { Suspense, useEffect, useState, useCallback, useMemo } from 'react';
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
import SavingsVsCostsChart from '@/components/dashboard/SavingsVsCostsChart';

interface DashboardPageContentProps {
    initialScenarios: any[];
    initialQueryParams: {
        provincia: string;
        localidad: string;
        capacidad: string;
        area: string;
        scenarioId: string;
    };
}

export default function DashboardPageContent({ initialScenarios, initialQueryParams }: DashboardPageContentProps) {
    const router = useRouter();
    const { queryParams, setQueryParams } = useQueryParams();
    const [generalScenarios, setGeneralScenarios] = useState<any[]>(initialScenarios);
    const [dbScenario, setDbScenario] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    const fetchData = useCallback(async () => {
        if (dataLoaded) return; // Si los datos ya se cargaron, no hacer nada
        if (!queryParams.provincia || !queryParams.localidad || !queryParams.capacidad || !queryParams.area || !queryParams.scenarioId) {
            setError("Faltan parámetros necesarios para la simulación");
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const data = await getParquesSolaresData(queryParams);
            if (Array.isArray(data) && data.length > 0) {
                setGeneralScenarios(data);
                console.log("Escenarios generales cargados:", data.map(s => ({ id: s.id, name: s.name })));
            } else {
                throw new Error("No se encontraron escenarios generales para los parámetros proporcionados");
            }

            const response = await fetch(`/api/scenarios/${queryParams.scenarioId}`);
            if (!response.ok) {
                throw new Error(`Error al obtener el escenario: ${response.statusText}`);
            }
            const specificScenario = await response.json();
            setDbScenario(specificScenario);
            console.log("Escenario específico de la DB cargado:", specificScenario);

            setDataLoaded(true); // Marcar que los datos se han cargado
        } catch (error) {
            console.error("Error al cargar los datos:", error);
            setError(error instanceof Error ? error.message : "Error desconocido al cargar los datos");
        } finally {
            setIsLoading(false);
        }
    }, [queryParams, dataLoaded]);

    useEffect(() => {
        setQueryParams(initialQueryParams);
    }, [initialQueryParams, setQueryParams]);

    useEffect(() => {
        if (!dataLoaded) {
            fetchData();
        }
    }, [fetchData, dataLoaded]);

    const scenarioName = useMemo(() => dbScenario?.name || generalScenarios[0]?.name || 'Escenario sin nombre', [dbScenario, generalScenarios]);
    const localidad = useMemo(() => queryParams.localidad || 'Localidad no especificada', [queryParams.localidad]);

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

if (!dataLoaded) {
    return <div>Esperando datos...</div>;
}

return (
    <div className= "flex flex-col min-h-screen bg-black-100 text-white" >
    <GlobalHeader 
                parqueName={ `Parque ${localidad} - ${scenarioName}` }
            />
    < main className = "flex-grow pt-4 sm:pt-6" >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
            <div className="space-y-12" >
                <Suspense fallback={ <Skeleton className="h-[200px] w-full bg-gray-800" />}>
                    <GlobalExecutiveSummary scenarios={ generalScenarios } queryParams = { queryParams } />
                        </Suspense>

                        < Suspense fallback = {< Skeleton className = "h-[400px] w-full bg-gray-800" />}>
                            <LocationMap ubicacion={ dbScenario?.ubicacion || generalScenarios[0].ubicacion } terreno = { dbScenario?.terreno || generalScenarios[0].terreno} />
                                </Suspense>

                                < Suspense fallback = {< Skeleton className = "h-[400px] w-full bg-gray-800" />}>
                                    <GlobalEnergyGeneration scenarios={ generalScenarios } />
                                        </Suspense>

                                        < Suspense fallback = {< Skeleton className = "h-[400px] w-full bg-gray-800" />}>
                                            <GlobalFinancialAnalysis scenarios={ generalScenarios } />
                                                </Suspense>

                                                < Suspense fallback = {< Skeleton className = "h-[400px] w-full bg-gray-800" />}>
                                                    <SavingsVsCostsChart scenarios={ generalScenarios } />
                                                        </Suspense>

                                                        < Suspense fallback = {< Skeleton className = "h-[400px] w-full bg-gray-800" />}>
                                                            <GlobalEnvironmentalImpact scenarios={ generalScenarios } />
                                                                </Suspense>

                                                                < Suspense fallback = {< Skeleton className = "h-[400px] w-full bg-gray-800" />}>
                                                                    <TechnicalDetails detallesTecnicos={ dbScenario?.detallesTecnicos || generalScenarios[0].detallesTecnicos } capacidad = { dbScenario?.capacidad || generalScenarios[0].capacidad} />
                                                                        </Suspense>

                                                                        < Suspense fallback = {< Skeleton className = "h-[400px] w-full bg-gray-800 mb-10" />}>
                                                                            <InterpretationCenter impactoSocial={ dbScenario?.impactoSocial || generalScenarios[0].impactoSocial } />
                                                                                </Suspense>
                                                                                </div>
                                                                                </div>
                                                                                </main>
                                                                                < div className = "mt-20 mb-16 w-4/5 mx-auto" >
                                                                                    <Footer_Energy_Dash scenarios={ generalScenarios } />
                                                                                        </div>
                                                                                        </div>
    );
}