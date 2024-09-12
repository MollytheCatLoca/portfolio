// components/DashboardPDFContent.tsx
import React, { useEffect, useState } from 'react';
import { getParquesSolaresData } from '@/lib/apiSolar';
import GlobalHeader from '@/components/dashboard/GlobalHeader';
import GlobalExecutiveSummary from '@/components/dashboard/GlobalExecutiveSummary';
import LocationMap from '@/components/dashboard/LocationMap';
import GlobalEnergyGeneration from '@/components/dashboard/GlobalEnergyGeneration';
import GlobalFinancialAnalysis from '@/components/dashboard/GlobalFinancialAnalysis';
import GlobalEnvironmentalImpact from '@/components/dashboard/GlobalEnvironmentalImpact';
import TechnicalDetails from '@/components/dashboard/TechnicalDetails';
import InterpretationCenter from '@/components/dashboard/InterpretationCenter';
import Footer_Energy from '@/components/Footer-Energy';

export default function DashboardPDFContent({ sceneData }) {
    const [scenarios, setScenarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('DashboardPDFContent received sceneData:', JSON.stringify(sceneData, null, 2));

        const fetchData = async () => {
            if (!sceneData || !sceneData.queryParams) {
                setError("No se recibieron parámetros válidos");
                setIsLoading(false);
                return;
            }

            const { provincia, localidad, capacidad, area } = sceneData.queryParams;

            if (!provincia || !localidad || !capacidad || !area) {
                setError("Faltan parámetros necesarios para la simulación");
                setIsLoading(false);
                return;
            }

            try {
                const data = await getParquesSolaresData(sceneData.queryParams);
                console.log("Datos obtenidos OK:", data);
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

        fetchData();
    }, [sceneData]);

    if (isLoading) {
        return <div>Cargando datos...</div>;
    }

    if (error) {
        return <div>Error: { error } </div>;
    }

    if (!scenarios || scenarios.length === 0) {
        return <div>No se encontraron escenarios.</div>;
    }

    const parqueName = scenarios[0].nombre.split(' - ')[0];

    return (
        <div className= "flex flex-col min-h-screen bg-black-100 text-white" >
        <GlobalHeader parqueName={ `Parque ${scenarios[0].ubicacion.ciudad}` } />
            < main className = "flex-grow pt-4 sm:pt-6" >
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
                    <div className="space-y-12" >
                        <GlobalExecutiveSummary scenarios={ scenarios } queryParams = { sceneData.queryParams } />
                            <LocationMap ubicacion={ scenarios[0].ubicacion } terreno = { scenarios[0].terreno } />
                                <GlobalEnergyGeneration scenarios={ scenarios } />
                                    < GlobalFinancialAnalysis scenarios = { scenarios } />
                                        <GlobalEnvironmentalImpact scenarios={ scenarios } />
                                            < TechnicalDetails detallesTecnicos = { scenarios[0].detallesTecnicos } capacidad = { scenarios[0].capacidad } />
                                                <InterpretationCenter impactoSocial={ scenarios[0].impactoSocial } />
                                                    </div>
                                                    </div>
                                                    </main>
                                                    < div className = "mt-20 mb-16 w-4/5 mx-auto" >
                                                        <Footer_Energy />
                                                        </div>
                                                        </div>
    );
}