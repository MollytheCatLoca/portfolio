// app/api/scenarios/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Caché simple en memoria
const cache: { [key: string]: { data: any; timestamp: number } } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = params.id;

    // Verificar si los datos están en caché y son recientes
    if (cache[id] && Date.now() - cache[id].timestamp < CACHE_DURATION) {
        console.log(`Returning cached data for scenario ${id}`);
        return NextResponse.json(cache[id].data);
    }

    try {
        const scenario = await prisma.scenarios.findUnique({
            where: { id: id },
            include: {
                capacity_based_parameters: true,
                economic_parameters: true,
            },
        });

        if (!scenario) {
            return NextResponse.json({ error: 'Escenario no encontrado' }, { status: 404 });
        }

        // Almacenar en caché
        cache[id] = { data: scenario, timestamp: Date.now() };

        return NextResponse.json(scenario);
    } catch (error) {
        console.error('Error al obtener el escenario:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}