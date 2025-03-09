import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const min = searchParams.get('min');

    if (!category || !min) {
        return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
    }

    try {
        // Buscar el escenario BASE_1 y obtener el valor con la categoría y min correctos
        const baseScenario = await prisma.scenarios.findUnique({
            where: { id: 'BASE_1' },
            include: {
                capacity_based_parameters: {
                    where: {
                        category: category,
                        capacity_min: parseFloat(min), // Buscar exactamente el min correspondiente
                    },
                },
            },
        });

        if (!baseScenario || baseScenario.capacity_based_parameters.length === 0) {
            return NextResponse.json({ error: 'Parámetro no encontrado en BASE_1' }, { status: 404 });
        }

        const baseValue = baseScenario.capacity_based_parameters[0].value;

        return NextResponse.json({ baseValue });
    } catch (error) {
        console.error('Error al obtener el valor base:', error);
        return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
    }
}
