// calculations.ts

export interface CashFlowData {
    year: number;
    beneficio: number;
}

export interface EnergyData {
    name: string;
    valor: number;
}

export type InvoiceMetrics = {
    monthlyMetrics: {
        totalInvoice: number;
        fixedCharges: number;
        reactivePowerCharges: number;
        taxes: number;
        netEnergyCost: number;
    };
    annualMetrics: {
        totalInvoice: number;
        fixedCharges: number;
        reactivePowerCharges: number;
        taxes: number;
        netEnergyCost: number;
    };
};

export type EnergyCosts = {
    energyCostPerKWh: number;
    netEnergyCostPerKWh: number;
};

export type PlantMetrics = {
    plantCapacityKW: number;
    annualGenerationMWh: number;
    selfConsumptionMWh: number;
    gridInjectionMWh: number;
    curtailmentMWh: number;
};

export type AnnualSavings = {
    totalSavingsWithTaxes: number;
    reactivePowerSavings: number;
    totalAnnualSavings: number;
};

export type NetBenefits = {
    duringLeasing: number;
    afterLeasing: number;
};

export interface Constants {
    // Definir las propiedades de `constants` según su uso en InvoiceAnalysis
}

// Utilidad de conversión de MWh a KWh
const MWhToKWh = (MWh: number): number => MWh * 1000;

// Función para calcular métricas de la factura
export function calculateInvoiceMetrics(constants: Constants): InvoiceMetrics {
    const exchangeRate = constants.invoice.exchangeRate;
    const monthlyMetrics = {
        totalInvoice: constants.invoice.totalInvoiceAmountPesos / exchangeRate,
        fixedCharges: constants.invoice.fixedChargesPesos / exchangeRate,
        reactivePowerCharges: constants.invoice.reactivePowerChargesPesos / exchangeRate,
        taxes: 0,
        netEnergyCost: 0
    };

    monthlyMetrics.taxes = monthlyMetrics.totalInvoice * (constants.invoice.taxesPercentage / 100);
    monthlyMetrics.netEnergyCost = monthlyMetrics.totalInvoice -
        monthlyMetrics.fixedCharges -
        monthlyMetrics.reactivePowerCharges -
        monthlyMetrics.taxes;

    const annualMetrics = Object.entries(monthlyMetrics).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: value * 12
    }), {} as typeof monthlyMetrics);

    return { monthlyMetrics, annualMetrics };
}

// Función para calcular costos de energía
export function calculateEnergyCosts(monthlyNetEnergyCost: number, constants: Constants): EnergyCosts {
    const monthlyConsumption = constants.consumption.annualConsumption / 12;
    const energyCostPerKWh = monthlyNetEnergyCost / monthlyConsumption;
    const netEnergyCostPerKWh = energyCostPerKWh * (1 + constants.invoice.taxesPercentage / 100);
    return { energyCostPerKWh, netEnergyCostPerKWh };
}

// Función para calcular métricas de la planta
export function calculatePlantMetrics(constants: Constants): PlantMetrics {
    return {
        plantCapacityKW: constants.detailedMetrics.capacityMW * 1000,
        annualGenerationMWh: constants.detailedMetrics.valoresAnuales.generacionTotal,
        selfConsumptionMWh: constants.detailedMetrics.valoresAnuales.autoconsumo,
        gridInjectionMWh: constants.detailedMetrics.valoresAnuales.inyeccion,
        curtailmentMWh: constants.detailedMetrics.valoresAnuales.curtailment
    };
}

// Función para calcular los ahorros anuales
export function calculateAnnualSavings(
    plantMetrics: PlantMetrics,
    energyCostPerKWh: number,
    reactivePowerCharges: number,
    constants: Constants
): AnnualSavings {
    const selfConsumptionKWh = MWhToKWh(plantMetrics.selfConsumptionMWh);
    const gridInjectionKWh = MWhToKWh(plantMetrics.gridInjectionMWh);

    const selfConsumptionSavings = selfConsumptionKWh * energyCostPerKWh;
    const gridInjectionSavings = gridInjectionKWh * energyCostPerKWh;

    const selfConsumptionTaxSavings = selfConsumptionSavings * (constants.invoice.taxesPercentage / 100);
    const gridInjectionTaxSavings = gridInjectionSavings * (constants.invoice.taxesPercentage / 100);

    const totalEnergySavings = selfConsumptionSavings + gridInjectionSavings;
    const totalTaxSavings = selfConsumptionTaxSavings + gridInjectionTaxSavings;
    const totalSavingsWithTaxes = totalEnergySavings + totalTaxSavings;

    return {
        totalSavingsWithTaxes,
        reactivePowerSavings: reactivePowerCharges,
        totalAnnualSavings: totalSavingsWithTaxes + reactivePowerCharges
    };
}

// Función para calcular los beneficios netos
export function calculateNetBenefits(
    totalAnnualSavings: number,
    plantCapacityKW: number,
    fixedCharges: number
): NetBenefits {
    const annualLeasingCost = 104000 * (plantCapacityKW / 600);
    return {
        duringLeasing: totalAnnualSavings - annualLeasingCost,
        afterLeasing: totalAnnualSavings - fixedCharges
    };
}

// Función para calcular los beneficios en 25 años
export function calculate25YearBenefits(netBenefits: NetBenefits): number {
    const leasingPeriodBenefits = netBenefits.duringLeasing * 6;
    const postLeasingBenefits = netBenefits.afterLeasing * 19;
    return leasingPeriodBenefits + postLeasingBenefits;
}

// Función para generar datos de flujo de caja para gráficos
export function generateCashFlowData(netBenefits: NetBenefits): CashFlowData[] {
    return Array.from({ length: 25 }, (_, i) => ({
        year: i + 1,
        beneficio: i < 6 ? netBenefits.duringLeasing : netBenefits.afterLeasing
    }));
}

// Función para generar datos de distribución de energía para gráficos
export function generateEnergyData(plantMetrics: PlantMetrics): EnergyData[] {
    return [
        { name: 'Autoconsumo', valor: plantMetrics.selfConsumptionMWh },
        { name: 'Inyección', valor: plantMetrics.gridInjectionMWh },
        { name: 'Curtailment', valor: plantMetrics.curtailmentMWh }
    ];
}

// Función para calcular la primera factura anual
export function calculateFirstInvoiceAnnual(invoiceMetrics: InvoiceMetrics): string {
    return (invoiceMetrics.monthlyMetrics.totalInvoice * 12).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });
}

// Función para calcular el costo anual de leasing
export function calculateAnnualLeasingCost(plantMetrics: PlantMetrics): string {
    const leasingCost = 104000 * (plantMetrics.plantCapacityKW / 600);
    return leasingCost.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });
}

// Función para calcular el total del período de leasing (6 años)
export function calculateTotalLeasingPeriod(netBenefits: NetBenefits): string {
    const totalLeasing = netBenefits.duringLeasing * 6;
    return totalLeasing.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });
}

// Función para calcular el total del período post-leasing (19 años)
export function calculatePostLeasingPeriod(netBenefits: NetBenefits): string {
    const totalPostLeasing = netBenefits.afterLeasing * 19;
    return totalPostLeasing.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });
}

// Función para formatear los cargos fijos anuales
export function formatFixedCharges(invoiceMetrics: InvoiceMetrics): string {
    return invoiceMetrics.annualMetrics.fixedCharges.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });
}

// Función para calcular el total de la factura anual
export function calculateTotalInvoice(invoiceMetrics: InvoiceMetrics): string {
    return invoiceMetrics.annualMetrics.totalInvoice.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });
}

// Función para calcular la generación total
export function calculateTotalGeneration(plantCapacityKW: number): string {
    return `${plantCapacityKW.toLocaleString()} MWh`;
}

// Función para calcular el beneficio durante el leasing
export function calculateDuringLeasing(netBenefits: NetBenefits): string {
    return netBenefits.duringLeasing.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });
}

// Función para calcular el ROI total en 25 años
export function calculateTotalROI(total25YearBenefits: number): string {
    return total25YearBenefits.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });
}

// Función para proyectar el flujo de caja
export function calculateProjectedCashFlow(cashFlowData: CashFlowData[]): number[] {
    return cashFlowData.map((data) => data.beneficio);
}

// Función para calcular la distribución de energía
export function calculateEnergyDistribution(energyData: EnergyData[]): { [key: string]: number } {
    return energyData.reduce((acc, item) => {
        acc[item.name] = item.valor;
        return acc;
    }, {} as { [key: string]: number });
}
