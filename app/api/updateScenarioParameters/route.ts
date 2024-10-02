// app/api/updateScenarioParameters/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { capacity_based_parameters, economic_parameters } = await req.json();
        console.log('Received data:', { capacity_based_parameters, economic_parameters });

        // Actualizar parámetros basados en capacidad
        if (capacity_based_parameters && Object.keys(capacity_based_parameters).length > 0) {
            for (const [id, data] of Object.entries(capacity_based_parameters)) {
                console.log(`Updating capacity parameter: ${id}`, data);
                await prisma.capacity_based_parameters.update({
                    where: { id: parseInt(id) },
                    data: {
                        value: (data as any).value,
                        updated_at: new Date()
                    }
                });
            }
        }

        // Actualizar parámetros económicos
        if (economic_parameters && Object.keys(economic_parameters).length > 0) {
            for (const [id, data] of Object.entries(economic_parameters)) {
                console.log(`Updating economic parameter: ${id}`, data);
                await prisma.economic_parameters.update({
                    where: { id: parseInt(id) },
                    data: {
                        value: (data as any).value,
                        updated_at: new Date()
                    }
                });
            }
        }

        console.log('All parameters updated successfully');
        return NextResponse.json({ message: 'Parámetros actualizados correctamente' }, { status: 200 });
    } catch (error) {
        console.error('Error al actualizar los parámetros:', error);
        return NextResponse.json({ message: 'Error al actualizar los parámetros', error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}