// app/api/clients/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        const clients = await prisma.clients.findMany({
            orderBy: {
                company_name: 'asc'
            }
        });

        return NextResponse.json(clients);
    } catch (error) {
        console.error('Error fetching clients:', error);
        return NextResponse.json(
            { message: 'Error fetching clients', error: error.message },
            { status: 500 }
        );
    }
}