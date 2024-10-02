import { Suspense } from 'react';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { prisma } from '@/lib/prisma'; // Importamos la instancia singleton de Prisma

const ScenarioTable = dynamic(() => import('@/components/admin/ScenarioTable'), {
    loading: () => <p>Loading scenarios table...</p>,
  ssr: false, // Ensure it only runs on the client-side
});

async function getScenarios() {
    try {
        const scenarios = await prisma.scenarios.findMany({
            orderBy: { updated_at: 'desc' },
        });
        return scenarios;
    } catch (error) {
        console.error('Error fetching scenarios:', error);
        throw error; // Propagamos el error para manejarlo en el componente
    }
}

export default async function ScenariosPage() {
    let scenarios = [];
    let error = null;

    try {
        scenarios = await getScenarios();
    } catch (e) {
        error = e;
    }

    return (
        <div className= "container mx-auto p-4" >
        <h1 className="text-2xl font-bold mb-4" > Manage Scenarios </h1>
            < Link href = "/admin/scenarios/new" passHref >
                <Button as="a" color = "primary" className = "mb-4" >
                    Create New Scenario
                        </Button>
                        </Link>
                        < Suspense fallback = {< div > Loading scenarios...</div>
}>
    {
        error?(
          <p className = "text-red-500" > Error loading scenarios.Please try again later.</p>
        ) : scenarios.length > 0 ? (
            <ScenarioTable scenarios= { scenarios } />
        ) : (
                <p>No scenarios available </p>
            )}
</Suspense>
    </div>
  );
}