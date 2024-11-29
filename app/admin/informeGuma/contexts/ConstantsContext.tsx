'use client';

import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';

// Definición explícita de la estructura
export interface TechnicalConstants {
    contractedPowerKVA: number;
    contractedPowerKW: number;
    injectionLimitKW: number;
    costPerKW: number;
    referencePowerMW: number;
    referenceAnnualGenerationMWH: number;
    maxCurtailmentPercentage: number;
    daysPerYear: number;
    hoursPico: number;
    hoursValle: number;
    hoursResto: number;
    hoursGeneration: number;
    OyMLeasing: number;
    OyMSLeasing: number;
}

// Nuevas interfaces para DetailedMetrics
export interface ValoresAnuales {
    generacionTotal: number;
    autoconsumo: number;
    inyeccion: number;
    curtailment: number;
}

export interface Porcentajes {
    ahorroTotal: number;
    autoconsumo: number;
    inyeccion: number;
    curtailment: number;
}

export interface DetailedMetrics {
    capacityMW: number;
    valoresAnuales: ValoresAnuales;
    porcentajes: Porcentajes;
}

export interface ConsumptionConstants {
    annualConsumption: number;
    picoMonthly: number;
    valleMonthly: number;
    restoMonthly: number;
}

export interface PowerConstants {
    installedPowerKW: number;
}


export interface InvoiceConstantsGuma {
    exchangeRate: number;
    totalInvoiceAmountDollars: number;
    taxesNonRecoverable: number;
    nonAbsorbableTaxes: number;
    fixedChargesAnnualDollars: number;
    reactivePowerChargesDollars: number;
    energyPricePerMW: number;
}

// Primero, añadimos la nueva interfaz para los datos de la empresa
export interface CompanyConstants {
    companyName: string;
    latitude?: number | null;
    longitude?: number | null;
    address?: string | null;
}


export interface Constants {
    technical: TechnicalConstants;
    consumption: ConsumptionConstants;
    power: PowerConstants;
    invoice: InvoiceConstants;
    invoiceGuma: InvoiceConstantsGuma;
    detailedMetrics: DetailedMetrics | null;
    company: CompanyConstants | null;

}

// Valores por defecto
const DEFAULT_TECHNICAL: TechnicalConstants = {
    contractedPowerKVA: 0,
    contractedPowerKW: 0,
    injectionLimitKW: 0,
    costPerKW: 0,
    referencePowerMW: 0,
    referenceAnnualGenerationMWH: 0,
    maxCurtailmentPercentage: 0,
    daysPerYear: 365,
    hoursPico: 5,
    hoursValle: 6,
    hoursResto: 13,
    hoursGeneration: 8,
    OyMLeasing: 30000,
    OyMSLeasing: 60000
};

const DEFAULT_CONSUMPTION: ConsumptionConstants = {
    annualConsumption: 0,
    picoMonthly: 0,
    valleMonthly: 0,
    restoMonthly: 0
};

const DEFAULT_POWER: PowerConstants = {
    installedPowerKW: 0
};

const DEFAULT_INVOICE: InvoiceConstants = {
    exchangeRate: 0,
    totalInvoiceAmountPesos: 0,
    taxesPercentage: 0,
    fixedChargesPesos: 0,
    reactivePowerChargesPesos: 0
};

const DEFAULT_INVOICE_GUMA: InvoiceConstantsGuma = {
    exchangeRate: 0,
    totalInvoiceAmountDollars: 0,
    taxesNonRecoverable: 0,
    nonAbsorbableTaxes: 0,
    fixedChargesAnnualDollars: 0,
    reactivePowerChargesDollars: 0,
    energyPricePerMW: 0
};

const DEFAULT_COMPANY: CompanyConstants = {
    companyName: 'Test',
    latitude: null,
    longitude: null,
    address: null
};

// Valores por defecto
const DEFAULT_DETAILED_METRICS: DetailedMetrics = {
    capacityMW: 0,
    valoresAnuales: {
        generacionTotal: 0,
        autoconsumo: 0,
        inyeccion: 0,
        curtailment: 0
    },
    porcentajes: {
        ahorroTotal: 0,
        autoconsumo: 0,
        inyeccion: 0,
        curtailment: 0
    }
};

// Añadimos los valores por defecto para company




export const DEFAULT_CONSTANTS: Constants = {
    technical: DEFAULT_TECHNICAL,
    consumption: DEFAULT_CONSUMPTION,
    power: DEFAULT_POWER,
    invoiceGuma: DEFAULT_INVOICE_GUMA,
    detailedMetrics: DEFAULT_DETAILED_METRICS,
    company: DEFAULT_COMPANY,
};





interface ConstantsContextType {
    constants: Constants;
    updateTechnicalConstant: (key: keyof TechnicalConstants, value: number) => Promise<void>;
    updateConsumptionConstant: (key: keyof ConsumptionConstants, value: number) => Promise<void>;
    updatePowerConstant: (key: keyof PowerConstants, value: number) => Promise<void>;
    updateInvoiceConstantGuma: (key: keyof InvoiceConstantsGuma, value: number) => Promise<void>;
    updateDetailedMetrics: (key: keyof DetailedMetrics, value: number) => Promise<void>;
    updateCompanyData: (key: keyof CompanyConstants, value: string | number) => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

export const ConstantsContext = createContext<ConstantsContextType | undefined>(undefined);

export const ConstantsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [constants, setConstants] = useState<Constants>(DEFAULT_CONSTANTS);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Función auxiliar para verificar y limpiar datos técnicos
    const cleanTechnicalData = (data: any): TechnicalConstants => {
        // Si los datos vienen anidados, los desanidamos
        if (data.technical && typeof data.technical === 'object') {
            return {
                ...DEFAULT_TECHNICAL,
                ...data.technical
            };
        }
        return {
            ...DEFAULT_TECHNICAL,
            ...data
        };
    };

    // Funciones de actualización
    const updateTechnicalConstant = useCallback(async (key: keyof TechnicalConstants, value: number) => {
        try {
            // Verificamos si el valor viene anidado
            const newTechnical = cleanTechnicalData({
                ...constants.technical,
                [key]: value
            });

            const updatedConstants = {
                ...constants,
                technical: newTechnical
            };

            await axios.post('/api/constantsGUMA', updatedConstants);
            setConstants(updatedConstants);
        } catch (err) {
            console.error('Error updating technical constant:', err);
            throw new Error('Error al actualizar constante técnica');
        }
    }, [constants]);

    const updateConsumptionConstant = useCallback(async (key: keyof ConsumptionConstants, value: number) => {
        try {
            const updatedConstants = {
                ...constants,
                consumption: {
                    ...constants.consumption,
                    [key]: value
                }
            };

            await axios.post('/api/constantsGUMA', updatedConstants);
            setConstants(updatedConstants);
        } catch (err) {
            throw new Error('Error al actualizar constante de consumo');
        }
    }, [constants]);

    const updatePowerConstant = useCallback(async (key: keyof PowerConstants, value: number) => {
        try {
            const updatedConstants = {
                ...constants,
                power: {
                    ...constants.power,
                    [key]: value
                }
            };

            await axios.post('/api/constantsGUMA', updatedConstants);
            setConstants(updatedConstants);
        } catch (err) {
            throw new Error('Error al actualizar constante de potencia');
        }
    }, [constants]);

    // En ConstantsContext.tsx



    const updateInvoiceConstantGuma = useCallback(async (key: keyof InvoiceConstantsGuma, value: any) => {
        try {
            const updatedConstants = {
                ...constants,
                invoiceGuma: {
                    ...constants.invoiceGuma,
                    [key]: value
                }
            };

            await axios.post('/api/constantsGUMA', updatedConstants);
            setConstants(updatedConstants);
        } catch (err) {
            throw new Error('Error al actualizar constante de potencia');
        }
    }, [constants]);




    const updateCompanyData = useCallback(async (key: keyof CompanyConstants, value: any) => {
        try {
            // Si el valor ya viene estructurado (como en el caso del submit del form)
            if (typeof value === 'object' && value.company) {
                const updatedConstants = {
                    ...constants,
                    company: value.company  // Usamos directamente la estructura correcta
                };
                await axios.post('/api/constantsGUMA', updatedConstants);
                setConstants(updatedConstants);
            } else {
                // Para actualizaciones individuales
                const updatedConstants = {
                    ...constants,
                    company: {
                        ...constants.company,
                        [key]: value
                    }
                };
                await axios.post('/api/constantsGUMA', updatedConstants);
                setConstants(updatedConstants);
            }
        } catch (err) {
            console.error('Error updating invoice constant:', err);
            throw new Error('Error al actualizar constante de facturación');
        }
    }, [constants]);



    // Implementación de la función de actualización

    const updateDetailedMetrics = useCallback(async (newDetailedMetrics) => {
        try {
            const updatedConstants = {
                ...constants,
                detailedMetrics: newDetailedMetrics // Evitar niveles adicionales aquí
            };
            await axios.post('/api/constantsGUMA', updatedConstants);
            setConstants(updatedConstants);
        } catch (err) {
            console.error('Error updating detailed metrics:', err);
            throw new Error('Error al actualizar las métricas detalladas');
        }
    }, [constants]);




    // Y para actualizaciones más específicas (por ejemplo, solo valoresAnuales)
    const updateDetailedMetricsSection = useCallback(async (
        section: 'valoresAnuales' | 'porcentajes',
        key: string,
        value: number
    ) => {
        try {
            const updatedConstants = {
                ...constants,
                detailedMetrics: {
                    ...constants.detailedMetrics,
                    [section]: {
                        ...constants.detailedMetrics?.[section],
                        [key]: value
                    }
                }
            };
            await axios.post('/api/constantsGUMA', updatedConstants);
            setConstants(updatedConstants);
        } catch (err) {
            console.error('Error updating detailed metrics section:', err);
            throw new Error('Error al actualizar sección de métricas');
        }
    }, [constants]);




    // Cargar constantes iniciales
    const fetchConstants = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/api/constantsGUMA');
            const data = response.data;

            // Limpiamos y validamos cada sección
            const validatedData: Constants = {
                technical: cleanTechnicalData(data.technical || {}),
                consumption: {
                    ...DEFAULT_CONSUMPTION,
                    ...(data.consumption || {})
                },
                power: {
                    ...DEFAULT_POWER,
                    ...(data.power || {})
                },
                invoice: {
                    ...DEFAULT_INVOICE,
                    ...(data.invoice || {})
                },
                invoiceGuma: {
                    ...DEFAULT_INVOICE_GUMA,
                    ...(data.invoiceGuma || {})
                },
                company: {
                    ...DEFAULT_COMPANY,
                    ...(data.company || {}),
                },
                detailedMetrics: {
                    ...DEFAULT_DETAILED_METRICS,
                    ...(data.detailedMetrics || {}),
                    valoresAnuales: {
                        ...DEFAULT_DETAILED_METRICS.valoresAnuales,
                        ...(data.detailedMetrics?.valoresAnuales || {})
                    },
                    porcentajes: {
                        ...DEFAULT_DETAILED_METRICS.porcentajes,
                        ...(data.detailedMetrics?.porcentajes || {})
                    }
                }
            };

            setConstants(validatedData);
            setError(null);
        } catch (err) {
            setError('Error al cargar las constantes');
            console.error('Error loading constants:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchConstants();
    }, [fetchConstants]);

    // Sistema de reintentos
    useEffect(() => {
        if (error) {
            const retryTimer = setTimeout(fetchConstants, 5000);
            return () => clearTimeout(retryTimer);
        }
    }, [error, fetchConstants]);

    return (
        <ConstantsContext.Provider
            value= {{
        constants,
            updateTechnicalConstant,
            updateConsumptionConstant,
            updatePowerConstant,
            updateInvoiceConstantGuma,
            updateDetailedMetrics,
            updateDetailedMetricsSection,
            updateCompanyData,
            isLoading,
            error
    }
}
        >
    { children }
    </ConstantsContext.Provider>
    );
};

export const useConstants = () => {
    const context = useContext(ConstantsContext);
    if (context === undefined) {
        throw new Error('useConstants must be used within a ConstantsProvider');
    }
    return context;
};