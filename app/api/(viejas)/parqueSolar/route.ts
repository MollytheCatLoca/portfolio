import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

let parqueSolarData: any = null;

async function readParqueSolarData() {
    if (!parqueSolarData) {
        const filePath = path.join(process.cwd(), 'data', 'parqueSolarData.json');
        const fileContents = await fs.readFile(filePath, 'utf8');
        parqueSolarData = JSON.parse(fileContents);
    }
    return parqueSolarData;
}

async function writeParqueSolarData(data: any) {
    const filePath = path.join(process.cwd(), 'data', 'parqueSolarData.json');
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    parqueSolarData = data;
}

export async function GET() {
    const data = await readParqueSolarData();
    return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
    const updates = await request.json();
    const currentData = await readParqueSolarData();
    const updatedData = { ...currentData, ...updates };
    await writeParqueSolarData(updatedData);
    return NextResponse.json(updatedData);
}