export interface ConsumptionInput {
    annualConsumption?: number;
    picoMonthly?: number;
    valleMonthly?: number;
    restoMonthly?: number;
}

export function calculateMonthlyConsumption(input: ConsumptionInput) {
    const { annualConsumption, picoMonthly, valleMonthly, restoMonthly } = input;

    if (picoMonthly !== undefined && valleMonthly !== undefined && restoMonthly !== undefined) {
        // Si se proporcionan valores mensuales, utilizarlos directamente
        return {
            PICO_CONSUMPTION_KWH_PER_MONTH: picoMonthly,
            VALLE_CONSUMPTION_KWH_PER_MONTH: valleMonthly,
            RESTO_CONSUMPTION_KWH_PER_MONTH: restoMonthly,
        };
    } else if (annualConsumption !== undefined) {
        // Distribuir el consumo anual según proporciones predeterminadas
        const pico = (annualConsumption * 0.30) / 12;
        const valle = (annualConsumption * 0.30) / 12;
        const resto = (annualConsumption * 0.40) / 12;

        return {
            PICO_CONSUMPTION_KWH_PER_MONTH: pico,
            VALLE_CONSUMPTION_KWH_PER_MONTH: valle,
            RESTO_CONSUMPTION_KWH_PER_MONTH: resto,
        };
    } else {
        throw new Error("Debe proporcionar valores mensuales detallados o el consumo anual total.");
    }
}

// Función para calcular el pago anual de leasing proporcionalmente
export function calculateAnnualLeasingPayment(
    installedPowerKW: number,
    referencePowerKW: number = 300,
    referenceLeasingPayment: number = 58500
) {
    // Proporcionalidad basada en la potencia instalada y la cuota de leasing de referencia
    return (installedPowerKW / referencePowerKW) * referenceLeasingPayment;
}

// Función principal de cálculo de parámetros
export function calcularParametros(
    installedPowerKW: number,
    consumptionData: any,
    invoiceData: any,
    constants: any,
    monthlyConsumptions: any
) {
    // Extraer constantes
    const {
        contractedPowerKW,
        injectionLimitKW,
        referenceAnnualGenerationMWH,
        referencePowerMW,
        hoursGeneration,
        daysPerYear,
        maxCurtailmentPercentage,
        costPerKW,
        hoursPico,
        hoursValle,
        hoursResto,
    } = constants;

    // Continuar con la implementación de la lógica de cálculo usando los parámetros y constantes
    // ...

    // Retornar el resultado
    const result = {
        // Agrega aquí los valores calculados
    };

    return result;
}
