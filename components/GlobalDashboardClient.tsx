'use client';

import React, { useEffect, useState } from 'react';
import GlobalHeader from './dashboard/GlobalHeader';
import GlobalExecutiveSummary from '@/components/dashboard/GlobalExecutiveSummary'
import LocationMap from '@/components/dashboard/LocationMap'
import GlobalEnergyGeneration from '@/components/dashboard/GlobalEnergyGeneration'
import GlobalFinancialAnalysis from '@/components/dashboard/GlobalFinancialAnalysis'
import GlobalEnvironmentalImpact from '@/components/dashboard/GlobalEnvironmentalImpact'
import TechnicalDetails from '@/components/dashboard/TechnicalDetails'
import InterpretationCenter from '@/components/dashboard/InterpretationCenter'
import Footer_Energy from './Footer-Energy';

import { Skeleton } from '@/components/ui/skeleton'
type SolarParkData = {
    parque_buenos_aires: any[]; // Ajusta este tipo según la estructura real de tus datos
};

const GlobalDashboardClient: React.FC = () => {
    const [data, setData] = useState<SolarParkData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
            const url = `${baseUrl}/api/solarParks`;

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
                }

                const jsonData: SolarParkData = await response.json();
                setData(jsonData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error loading dashboard data: { error } </div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    const scenarios = data.parque_buenos_aires;
    const parqueName = scenarios[0].nombre.split(' - ')[0]; // Obtiene el nombre del parque sin el escenario

    return (
        <div className= "flex flex-col min-h-screen bg-black-100 text-white" >
        <GlobalHeader parqueName={ parqueName } />
            < main className = "flex-grow pt-16 sm:pt-20" >
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
                    <GlobalExecutiveSummary scenarios={ scenarios } />
                        < LocationMap ubicacion = { scenarios[0].ubicacion } terreno = { scenarios[0].terreno } />
                            <GlobalEnergyGeneration scenarios={ scenarios } />
                                < GlobalFinancialAnalysis scenarios = { scenarios } />
                                    <GlobalEnvironmentalImpact scenarios={ scenarios } />
                                        < TechnicalDetails detallesTecnicos = { scenarios[0].detallesTecnicos } capacidad = { scenarios[0].capacidad } />
                                            <InterpretationCenter impactoSocial={ scenarios[0].impactoSocial } />

                                                </div>
                                                </main>
                                                < Footer_Energy />
                                                </div>
    );
};

export default GlobalDashboardClient;