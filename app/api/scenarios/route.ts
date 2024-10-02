import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()



export async function GET() {
    try {
        const scenarios = await prisma.scenarios.findMany({
            include: {
                economic_parameters: true,
                capacity_based_parameters: true,
            },
        });
        return NextResponse.json(scenarios);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching scenarios' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const scenario = await prisma.scenarios.create({
            data: {
                ...json,
                economic_parameters: {
                    create: json.economic_parameters,
                },
                capacity_based_parameters: {
                    create: json.capacity_based_parameters,
                },
            },
        });
        return NextResponse.json(scenario);
    } catch (error) {
        return NextResponse.json({ error: 'Error creating scenario' }, { status: 500 });
    }
}