// app/energy/dashboard-pdf/page.tsx
'use client';

import { useEffect, useState } from 'react';
import DashboardPDFContent from "@/components/DashboardPDFContent";

export default function DashboardPDFPage() {
    const [sceneData, setSceneData] = useState(null);

    useEffect(() => {
        console.log('Initial window.initialSceneData:', window.initialSceneData);

        const timeout = setTimeout(() => {
            if (window.initialSceneData) {
                console.log('Setting sceneData:', window.initialSceneData);
                setSceneData(window.initialSceneData);
            } else {
                console.error('No initialSceneData found after timeout');
            }
        }, 1000); // Espera 1 segundo

        return () => clearTimeout(timeout);
    }, []);

    if (!sceneData) {
        return <div>Cargando datos... Por favor espere.</div>;
    }

    return <DashboardPDFContent sceneData={ sceneData } />;
}