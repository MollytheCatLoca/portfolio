// app/api/quotations/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const quotationId = parseInt(params.id, 10);

        if (isNaN(quotationId)) {
            return NextResponse.json({ message: 'ID de cotización inválido' }, { status: 400 });
        }

        const quotation = await prisma.quotations.findUnique({
            where: { id: quotationId },
            include: {
                plant: { include: { client: true } },
                technical_data: true,
                consumption_data: true,
                power_data: true,
                invoice_data: true,
                detailed_metrics: true,
            },
        });

        if (!quotation) {
            return NextResponse.json({ message: 'Cotización no encontrada' }, { status: 404 });
        }

        // Construir el JSON con la estructura requerida para constants
        const constantsData = {
            company: {
                companyName: quotation.plant.client.company_name,
                address: quotation.plant.address,
                latitude: quotation.plant.latitude,
                longitude: quotation.plant.longitude,
            },
            technical: {
                contractedPowerKVA: quotation.technical_data[0]?.contracted_power_kva || 0,
                contractedPowerKW: quotation.technical_data[0]?.contracted_power_kw || 0,
                injectionLimitKW: quotation.technical_data[0]?.injection_limit_kw || 0,
                costPerKW: quotation.technical_data[0]?.cost_per_kw || 0,
                referencePowerMW: quotation.technical_data[0]?.reference_power_mw || 0,
                referenceAnnualGenerationMWH: quotation.technical_data[0]?.reference_annual_generation_mwh || 0,
                maxCurtailmentPercentage: quotation.technical_data[0]?.max_curtailment_percentage || 0,
                hoursPico: quotation.technical_data[0]?.hours_pico || 0,
                hoursValle: quotation.technical_data[0]?.hours_valle || 0,
                hoursResto: quotation.technical_data[0]?.hours_resto || 0,
                hoursGeneration: quotation.technical_data[0]?.hours_generation || 0,
                OyMLeasing: quotation.technical_data[0]?.oym_leasing || 0,
                OyMSLeasing: quotation.technical_data[0]?.oyms_leasing || 0,
                duracionLeasing: quotation.technical_data[0]?.duracion_leasing || 0,
                vidaUtil: quotation.technical_data[0]?.vida_util || 0,
                tasaInteres: quotation.technical_data[0]?.tasa_interes || 0,
            },
            consumption: {
                annualConsumption: quotation.consumption_data[0]?.annual_consumption || 0,
                picoMonthly: quotation.consumption_data[0]?.pico_monthly || 0,
                valleMonthly: quotation.consumption_data[0]?.valle_monthly || 0,
                restoMonthly: quotation.consumption_data[0]?.resto_monthly || 0,
            },
            power: {
                installedPowerKW: quotation.power_data[0]?.installed_power_kw || 0,
            },
            invoice: {
                exchangeRate: quotation.invoice_data[0]?.exchange_rate || 0,
                totalInvoiceAmountPesos: quotation.invoice_data[0]?.total_invoice_amount_pesos || 0,
                taxesPercentage: quotation.invoice_data[0]?.taxes_percentage || 0,
                fixedChargesPesos: quotation.invoice_data[0]?.fixed_charges_pesos || 0,
                reactivePowerChargesPesos: quotation.invoice_data[0]?.reactive_power_charges_pesos || 0,
                priceEnergyMWh: quotation.invoice_data[0]?.price_energy_mwh || 0,
            },
            detailedMetrics: {
                capacityMW: quotation.detailed_metrics[0]?.capacity_mw || 0,
                valoresAnuales: {
                    generacionTotal: quotation.detailed_metrics[0]?.total_generation || 0,
                    autoconsumo: quotation.detailed_metrics[0]?.self_consumption || 0,
                    inyeccion: quotation.detailed_metrics[0]?.injection || 0,
                    curtailment: quotation.detailed_metrics[0]?.curtailment || 0,
                },
                porcentajes: {
                    ahorroTotal: quotation.detailed_metrics[0]?.ahorro_total || 0,
                    autoconsumo: quotation.detailed_metrics[0]?.autoconsumo || 0,
                    inyeccion: quotation.detailed_metrics[0]?.inyeccion || 0,
                    curtailment: quotation.detailed_metrics[0]?.curtailment_percentage || 0,
                },
            },
        };

        // Guardar el JSON en constantsAUX.json
        const constantsFilePath = path.join(process.cwd(), 'app', 'admin', 'informe', 'data', 'constants.json');
        await fs.writeFile(constantsFilePath, JSON.stringify(constantsData, null, 2));

        return NextResponse.json({
            message: 'Datos guardados en constants.json',
            data: constantsData,
            originalQuotation: quotation
        }, { status: 200 });

    } catch (error) {
        console.error('Error al obtener la cotización:', error);
        return NextResponse.json({ message: 'Error al obtener la cotización', error: error.message }, { status: 500 });
    }
}

// Mantener el PATCH para actualizar el estado
export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const { status } = await req.json();

        const updatedQuotation = await prisma.quotations.update({
            where: { id },
            data: { status },
            include: {
                plant: {
                    include: {
                        client: true
                    }
                },
                technical_data: true,
                consumption_data: true,
                power_data: true,
                invoice_data: true,
                detailed_metrics: true
            }
        });

        return NextResponse.json(updatedQuotation);
    } catch (error) {
        console.error('Error updating quotation:', error);
        return NextResponse.json(
            { message: 'Error al actualizar la cotización', error: error.message },
            { status: 500 }
        );
    }
}