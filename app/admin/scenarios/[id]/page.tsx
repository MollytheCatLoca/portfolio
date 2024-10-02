import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ScenarioDetail from '@/components/admin/ScenarioDetail';

interface Parameter {
    id: number;
    category: string;
    value: number;
    [key: string]: any;
}

interface Scenario {
    id: string;
    name: string;
    description: string;
    capacity_based_parameters: Parameter[];
    economic_parameters: Parameter[];
    [key: string]: any;
}

async function getScenarios(currentId: string): Promise<{ currentScenario: Scenario; baseScenario: Scenario }> {
    try {
        const [currentScenario, baseScenario] = await Promise.all([
            prisma.scenarios.findUnique({
                where: { id: currentId },
                include: {
                    capacity_based_parameters: true,
                    economic_parameters: true,
                },
            }),
            prisma.scenarios.findUnique({
                where: { id: 'BASE_1' },
                include: {
                    capacity_based_parameters: true,
                    economic_parameters: true,
                },
            }),
        ]);

        if (!currentScenario || !baseScenario) {
            notFound();
        }

        return { currentScenario, baseScenario } as { currentScenario: Scenario; baseScenario: Scenario };
    } catch (error) {
        console.error('Error fetching scenarios:', error);
        throw error;
    }
}

export default async function ScenarioPage({ params }: { params: { id: string } }) {
    try {
        const { currentScenario, baseScenario } = await getScenarios(params.id);

        // Preparamos los datos para el componente ScenarioDetail
        const scenarioData = {
            ...currentScenario,
            capacity_based_parameters: currentScenario.capacity_based_parameters.map(param => ({
                ...param,
                baseValue: baseScenario.capacity_based_parameters.find(p => p.category === param.category)?.value
            })),
            economic_parameters: currentScenario.economic_parameters.map(param => ({
                ...param,
                baseValue: baseScenario.economic_parameters.find(p => p.category === param.category)?.value
            }))
        };

        return (
            <div className= "container mx-auto p-4" >
            <ScenarioDetail scenario={ scenarioData } />
                </div>
    );
    } catch (error) {
        console.error('Error rendering scenario page:', error);
        return (
            <div className= "container mx-auto p-4" >
            <h1 className="text-2xl font-bold text-red-600" > Error </h1>
                < p > An error occurred while loading the scenario.Please try again later.</p>
                    </div>
    );
    }
}