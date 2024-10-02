// app/api/scenarios/delete/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = params.id;

    if (id === 'BASE_1') {
        return NextResponse.json(
            { error: 'Cannot delete BASE_1 scenario' },
            { status: 400 }
        );
    }

    try {
        // Use a transaction to ensure all operations succeed or fail together
        const deletedScenario = await prisma.$transaction(async (tx) => {
            // Delete related records
            await tx.capacity_based_parameters.deleteMany({
                where: { scenario_id: id },
            });

            await tx.economic_parameters.deleteMany({
                where: { scenario_id: id },
            });

            // Delete the scenario
            return tx.scenarios.delete({
                where: { id },
            });
        });

        return NextResponse.json(
            { message: 'Scenario deleted successfully', deletedScenario },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting scenario:', error);
        return NextResponse.json(
            { error: 'An error occurred while deleting the scenario' },
            { status: 500 }
        );
    }
}