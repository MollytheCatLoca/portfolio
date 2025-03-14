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
    duracionLeasing: number;
    vidaUtil: number;
    tasaInteres: number;
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

export interface InvoiceConstants {
    exchangeRate: number;
    totalInvoiceAmountPesos: number;
    taxesPercentage: number;
    fixedChargesPesos: number;
    reactivePowerChargesPesos: number;
    priceEnergyMWh?: number;
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
    OyMSLeasing: 60000,
    duracionLeasing: 6,
    vidaUtil: 25,
    tasaInteres: 6
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
    reactivePowerChargesPesos: 0,
    priceEnergyMWh: 0
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
    invoice: DEFAULT_INVOICE,
    detailedMetrics: DEFAULT_DETAILED_METRICS,
    company: DEFAULT_COMPANY,
};





interface ConstantsContextType {
    constants: Constants;
    updateTechnicalConstant: (key: keyof TechnicalConstants, value: number) => Promise<void>;
    updateConsumptionConstant: (key: keyof ConsumptionConstants, value: number) => Promise<void>;
    updatePowerConstant: (key: keyof PowerConstants, value: number) => Promise<void>;
    updateInvoiceConstant: (key: keyof InvoiceConstants, value: number) => Promise<void>;
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

            await axios.post('/api/constants', updatedConstants);
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

            await axios.post('/api/constants', updatedConstants);
            setConstants(updatedConstants);
        } catch (err) {
            throw new Error('Error al actualizar constante de consumo');
        }
    }, [constants]);

    // Modificar otras funciones de actualización de manera similar
    const updatePowerConstant = useCallback(async (key: keyof PowerConstants, value: number) => {
        try {
            setConstants((prevConstants) => {
                const updatedConstants = {
                    ...prevConstants,
                    power: {
                        ...prevConstants.power,
                        [key]: value
                    }
                };

                axios.post('/api/constants', updatedConstants).catch((err) => {
                    console.error('Error updating power constant:', err);
                });

                return updatedConstants;
            });
        } catch (err) {
            throw new Error('Error al actualizar constante de potencia');
        }
    }, []);


    // En ConstantsContext.tsx

    const updateInvoiceConstant = useCallback(async (key: keyof InvoiceConstants, value: any) => {
        try {
            // Si el valor ya viene estructurado (como en el caso del submit del form)
            if (typeof value === 'object' && value.invoice) {
                const updatedConstants = {
                    ...constants,
                    invoice: value.invoice  // Usamos directamente la estructura correcta
                };
                await axios.post('/api/constants', updatedConstants);
                setConstants(updatedConstants);
            } else {
                // Para actualizaciones individuales
                const updatedConstants = {
                    ...constants,
                    invoice: {
                        ...constants.invoice,
                        [key]: value
                    }
                };
                await axios.post('/api/constants', updatedConstants);
                setConstants(updatedConstants);
            }
        } catch (err) {
            console.error('Error updating invoice constant:', err);
            throw new Error('Error al actualizar constante de facturación');
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
                await axios.post('/api/constants', updatedConstants);
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
                await axios.post('/api/constants', updatedConstants);
                setConstants(updatedConstants);
            }
        } catch (err) {
            console.error('Error updating invoice constant:', err);
            throw new Error('Error al actualizar constante de facturación');
        }
    }, [constants]);





    // Función de actualización de detailedMetrics
    // En updateDetailedMetrics, añade estos logs:
    const updateDetailedMetrics = useCallback(async (newDetailedMetrics) => {
        try {
            console.log("ConstantsContext: Actualizando detailedMetrics:", newDetailedMetrics);
            
            setConstants((prevConstants) => {
                const capacityMW = newDetailedMetrics.capacityMW;
                let newInstalledPowerKW = prevConstants.power.installedPowerKW;

                if (typeof capacityMW === 'number') {
                    newInstalledPowerKW = capacityMW * 1000;
                    console.log("ConstantsContext: Calculando nuevo installedPowerKW:", newInstalledPowerKW);
                }

                const updatedConstants = {
                    ...prevConstants,
                    detailedMetrics: newDetailedMetrics,
                    power: {
                        ...prevConstants.power,
                        installedPowerKW: newInstalledPowerKW
                    }
                };

                console.log("ConstantsContext: Nuevos constants a enviar al API:", updatedConstants);
                axios.post('/api/constants', updatedConstants).catch((err) => {
                    console.error('Error updating constants:', err);
                });

                return updatedConstants;
            });
        } catch (err) {
            console.error('Error updating detailed metrics:', err);
            throw new Error('Error al actualizar las métricas detalladas');
        }
    }, []);





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
            await axios.post('/api/constants', updatedConstants);
            setConstants(updatedConstants);
        } catch (err) {
            console.error('Error updating detailed metrics section:', err);
            throw new Error('Error al actualizar sección de métricas');
        }
    }, [constants]);




    // Cargar constantes iniciales
    // En la función fetchConstants, añade estos logs:
    const fetchConstants = useCallback(async () => {
        try {
            console.log("ConstantsContext: Iniciando fetchConstants");
            setIsLoading(true);
            const response = await axios.get('/api/constants');
            const data = response.data;
            console.log("ConstantsContext: Datos recibidos del API:", data);

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

            console.log("ConstantsContext: Datos validados:", validatedData);
            setConstants(validatedData);
            setError(null);
        } catch (err) {
            setError('Error al cargar las constantes');
            console.error('Error loading constants:', err);
        } finally {
            setIsLoading(false);
            console.log("ConstantsContext: Finalizado fetchConstants");
        }
    }, []);


    useEffect(() => {
        console.log("ConstantsContext: useEffect para fectchConstants")
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
            updateInvoiceConstant,
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