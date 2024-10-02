import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const { name, description, validez_capacidad_min, validez_capacidad_max } = await req.json();

        // Fetch BASE_1 scenario
        const baseScenario = await prisma.scenarios.findUnique({
            where: { id: 'BASE_1' },
            include: {
                capacity_based_parameters: true,
                economic_parameters: true,
            },
        });

        if (!baseScenario) {
            return NextResponse.json({ message: 'BASE_1 scenario not found' }, { status: 404 });
        }

        // Create new scenario
        const newScenario = await prisma.scenarios.create({
            data: {
                id: `SCENARIO_${Date.now()}`, // Generate a unique ID
                name,
                description: description || `Copy of BASE_1 created at ${new Date().toISOString()}`,
                validez_capacidad_min,
                validez_capacidad_max,
                capacity_based_parameters: {
                    create: baseScenario.capacity_based_parameters.map(param => ({
                        category: param.category,
                        capacity_min: param.capacity_min,
                        capacity_max: param.capacity_max,
                        value: param.value,
                    })),
                },
                economic_parameters: {
                    create: baseScenario.economic_parameters.map(param => ({
                        category: param.category,
                        name: param.name,
                        value: param.value,
                    })),
                },
            },
        });

        return NextResponse.json({ message: 'Scenario created successfully', scenario: newScenario }, { status: 201 });
    } catch (error) {
        console.error('Error creating scenario:', error);
        return NextResponse.json({ message: 'Error creating scenario', error: error.message }, { status: 500 });
    }
}