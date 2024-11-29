//api/quotations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


// GET - Obtener todas las cotizaciones con filtros opcionales
export async function GET(req: NextRequest) {
    try {
        // Obtener parámetros de búsqueda de la URL
        const searchParams = req.nextUrl.searchParams;
        const clientName = searchParams.get('clientName');
        const minPower = searchParams.get('minPower');
        const maxPower = searchParams.get('maxPower');
        const status = searchParams.get('status');

        // Construir el where dinámicamente
        let where: any = {};

        if (clientName) {
            where.plant = {
                client: {
                    company_name: {
                        contains: clientName,
                        mode: 'insensitive'
                    }
                }
            };
        }

        if (status) {
            where.status = status;
        }

        if (minPower || maxPower) {
            where.technical_data = {
                some: {
                    AND: []
                }
            };

            if (minPower) {
                where.technical_data.some.AND.push({
                    contracted_power_kw: {
                        gte: parseFloat(minPower)
                    }
                });
            }

            if (maxPower) {
                where.technical_data.some.AND.push({
                    contracted_power_kw: {
                        lte: parseFloat(maxPower)
                    }
                });
            }
        }

        const quotations = await prisma.quotations.findMany({
            where,
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
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return NextResponse.json(quotations);
    } catch (error) {
        console.error('Error fetching quotations:', error);
        return NextResponse.json(
            { message: 'Error fetching quotations', error: error.message },
            { status: 500 }
        );
    }
}


export async function POST(req: NextRequest) {
    try {
        const { clientName, plantAddress, latitude, longitude, technical_data, consumption_data, power_data, invoice_data, detailed_metrics } = await req.json();

        // Verifica si el cliente ya existe, si no lo crea
        let client = await prisma.clients.findUnique({
            where: { company_name: clientName },
        });

        if (!client) {
            client = await prisma.clients.create({
                data: {
                    company_name: clientName,
                },
            });
        }

        // Verifica si la planta ya existe para este cliente, si no la crea
        let plant = await prisma.plants.findFirst({
            where: {
                client_id: client.id,
                address: plantAddress,
            },
        });

        if (!plant) {
            plant = await prisma.plants.create({
                data: {
                    client_id: client.id,
                    address: plantAddress,
                    latitude,
                    longitude,
                },
            });
        }

        // Verificar si ya existe una cotización idéntica (sin verificar created_at)
        const existingQuotation = await prisma.quotations.findFirst({
            where: {
                plant_id: plant.id,
                status: "pendiente",
                technical_data: {
                    some: {
                        contracted_power_kva: technical_data.contractedPowerKVA,
                        contracted_power_kw: technical_data.contractedPowerKW,
                        injection_limit_kw: technical_data.injectionLimitKW,
                        cost_per_kw: technical_data.costPerKW,
                        reference_power_mw: technical_data.referencePowerMW,
                        reference_annual_generation_mwh: technical_data.referenceAnnualGenerationMWH,
                        max_curtailment_percentage: technical_data.maxCurtailmentPercentage,
                        hours_pico: technical_data.hoursPico,
                        hours_valle: technical_data.hoursValle,
                        hours_resto: technical_data.hoursResto,
                        hours_generation: technical_data.hoursGeneration,
                        oym_leasing: technical_data.OyMLeasing,
                        oyms_leasing: technical_data.OyMSLeasing,
                        duracion_leasing: technical_data.duracionLeasing,
                        vida_util: technical_data.vidaUtil,
                        tasa_interes: technical_data.tasaInteres,
                    },
                },
                consumption_data: {
                    some: {
                        annual_consumption: consumption_data?.annualConsumption,
                        pico_monthly: consumption_data?.picoMonthly,
                        valle_monthly: consumption_data?.valleMonthly,
                        resto_monthly: consumption_data?.restoMonthly,
                    },
                },
                power_data: {
                    some: {
                        installed_power_kw: power_data?.installedPowerKW,
                    },
                },
                invoice_data: {
                    some: {
                        exchange_rate: invoice_data?.exchangeRate,
                        total_invoice_amount_pesos: invoice_data?.totalInvoiceAmountPesos,
                        taxes_percentage: invoice_data?.taxesPercentage,
                        fixed_charges_pesos: invoice_data?.fixedChargesPesos,
                        reactive_power_charges_pesos: invoice_data?.reactivePowerChargesPesos,
                        price_energy_mwh: invoice_data?.priceEnergyMWh,
                    },
                },
                detailed_metrics: {
                    some: {
                        capacity_mw: detailed_metrics?.capacityMW,
                        total_generation: detailed_metrics?.valoresAnuales.generacionTotal,
                        self_consumption: detailed_metrics?.valoresAnuales.autoconsumo,
                        injection: detailed_metrics?.valoresAnuales.inyeccion,
                        curtailment: detailed_metrics?.valoresAnuales.curtailment,
                        ahorro_total: detailed_metrics?.porcentajes.ahorroTotal,
                        autoconsumo: detailed_metrics?.porcentajes.autoconsumo,
                        inyeccion: detailed_metrics?.porcentajes.inyeccion,
                        curtailment_percentage: detailed_metrics?.porcentajes.curtailment,
                    },
                },
            },
        });

        if (existingQuotation) {
            return NextResponse.json({ message: 'Cotización idéntica ya existe. No se creó una nueva.' }, { status: 200 });
        }

        // Crear la nueva cotización
        const quotation = await prisma.quotations.create({
            data: {
                plant_id: plant.id,
                status: "pendiente",
                quotation_name: "Cotización Dummy",
                technical_data: {
                    create: {
                        contracted_power_kva: technical_data.contractedPowerKVA,
                        contracted_power_kw: technical_data.contractedPowerKW,
                        injection_limit_kw: technical_data.injectionLimitKW,
                        cost_per_kw: technical_data.costPerKW,
                        reference_power_mw: technical_data.referencePowerMW,
                        reference_annual_generation_mwh: technical_data.referenceAnnualGenerationMWH,
                        max_curtailment_percentage: technical_data.maxCurtailmentPercentage,
                        hours_pico: technical_data.hoursPico,
                        hours_valle: technical_data.hoursValle,
                        hours_resto: technical_data.hoursResto,
                        hours_generation: technical_data.hoursGeneration,
                        oym_leasing: technical_data.OyMLeasing,
                        oyms_leasing: technical_data.OyMSLeasing,
                        duracion_leasing: technical_data.duracionLeasing,
                        vida_util: technical_data.vidaUtil,
                        tasa_interes: technical_data.tasaInteres,
                    },
                },
                consumption_data: {
                    create: {
                        annual_consumption: consumption_data?.annualConsumption,
                        pico_monthly: consumption_data?.picoMonthly,
                        valle_monthly: consumption_data?.valleMonthly,
                        resto_monthly: consumption_data?.restoMonthly,
                    },
                },
                power_data: {
                    create: {
                        installed_power_kw: power_data?.installedPowerKW,
                    },
                },
                invoice_data: {
                    create: {
                        exchange_rate: invoice_data?.exchangeRate,
                        total_invoice_amount_pesos: invoice_data?.totalInvoiceAmountPesos,
                        taxes_percentage: invoice_data?.taxesPercentage,
                        fixed_charges_pesos: invoice_data?.fixedChargesPesos,
                        reactive_power_charges_pesos: invoice_data?.reactivePowerChargesPesos,
                        price_energy_mwh: invoice_data?.priceEnergyMWh,
                    },
                },
                detailed_metrics: {
                    create: {
                        capacity_mw: detailed_metrics?.capacityMW,
                        total_generation: detailed_metrics?.valoresAnuales.generacionTotal,
                        self_consumption: detailed_metrics?.valoresAnuales.autoconsumo,
                        injection: detailed_metrics?.valoresAnuales.inyeccion,
                        curtailment: detailed_metrics?.valoresAnuales.curtailment,
                        ahorro_total: detailed_metrics?.porcentajes.ahorroTotal,
                        autoconsumo: detailed_metrics?.porcentajes.autoconsumo,
                        inyeccion: detailed_metrics?.porcentajes.inyeccion,
                        curtailment_percentage: detailed_metrics?.porcentajes.curtailment,
                    },
                },
            },
        });

        return NextResponse.json({
            message: 'Cotización creada con éxito',
            quotation,
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating quotation:', error);
        return NextResponse.json({ message: 'Error creating quotation', error: error.message }, { status: 500 });
    }
}

// Agregamos las funciones de utilidad para el servicio
export async function updateQuotationStatus(id: number, status: string) {
    try {
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

        return updatedQuotation;
    } catch (error) {
        throw new Error(`Error updating quotation status: ${error.message}`);
    }
}
