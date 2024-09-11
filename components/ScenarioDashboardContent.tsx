'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryParams } from '@/context/QueryParamsContext';
import { getParqueSolarData } from '@/lib/apiSolar';
import IdDashboard from './idDashboard';

interface ScenarioDashboardContentProps {
    initialScenario: any;
    id: string;
}

export default function ScenarioDashboardContent({ initialScenario, id }: ScenarioDashboardContentProps) {
    const router = useRouter();
    const { queryParams, setQueryParams } = useQueryParams();
    const [scenario, setScenario] = useState(initialScenario);
    const [isLoading, setIsLoading] = useState(!initialScenario);
    const [error, setError] = useState<string | null>(null);

    // Sincronizar queryParams con la URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const currentQueryParams = {
            provincia: params.get('provincia') || '',
            localidad: params.get('localidad') || '',
            capacidad: params.get('capacidad') || '',
            area: params.get('area') || ''
        };

        console.log("Syncing query params with URL:", currentQueryParams);
        setQueryParams(currentQueryParams);
    }, [router.query]); // Se ejecuta cuando los parámetros de la URL cambian

    const handleBackToDashboard = () => {
        //console.log("queryParams before redirection:", queryParams);

        const params = queryParams ? new URLSearchParams(queryParams).toString() : '';
        //console.log("Generated URL params:", params);

        const url = `/energy/dashboard?${params}`;
        //console.log("Final URL:", url);

        router.push(url);
    };

    useEffect(() => {
        const updateScenario = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const scenarioId = parseInt(id, 10);

                if (isNaN(scenarioId)) {
                    throw new Error(`Invalid scenario ID: ${id}`);
                }

                //console.log("Fetching scenario data for ID:", scenarioId, "with params:", queryParams);
                const updatedScenario = await getParqueSolarData(scenarioId, queryParams);
                //console.log("Received scenario data:", updatedScenario);
                console.log("Received scenario data:");
                if (!updatedScenario) {
                    throw new Error(`No se encontró el escenario con ID: ${scenarioId}`);
                }

                setScenario(updatedScenario);
            } catch (error) {
                console.error('Error al actualizar el escenario:', error);
                setError(error.message || 'Error al cargar el escenario');
            } finally {
                setIsLoading(false);
            }
        };

        if (!initialScenario) {
            updateScenario();
        }
    }, [id, queryParams, initialScenario]);

    if (isLoading) {
        return <div>Cargando escenario...</div>;
    }

    if (error) {
        return (
            <div>
            <p>{ error } </p>
            < button onClick = { handleBackToDashboard } > Volver al dashboard </button>
                </div>
        );
    }

    if (!scenario) {
        return (
            <div>
            <p>No se pudo cargar el escenario.</p>
                < button onClick = { handleBackToDashboard } > Volver al dashboard </button>
                    </div>
        );
    }

    return (
        <>

        <IdDashboard data = { scenario } queryParams = { queryParams } />
            </>
    );
}