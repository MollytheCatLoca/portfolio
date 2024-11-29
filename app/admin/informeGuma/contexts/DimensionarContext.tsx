'use client';

import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { Constants, useConstants } from './ConstantsContext';

export interface DimensioningData {
    installedPowerKW?: number;
    desiredPowerKW?: number;
    estimatedProduction?: number;
    panelCount?: number;
    inverterSize?: number;
    [key: string]: any;
}

interface DimensioningContextType {
    dimensioningData: DimensioningData | null;
    setDimensioningData: React.Dispatch<React.SetStateAction<DimensioningData | null>>;
    updateDimensioning: (key: string, value: any) => void;
    calculateDimensioning: (contractedPower?: number, annualConsumption?: number) => void;
    isLoading: boolean;
    error: string | null;
}

export const DimensioningContext = createContext<DimensioningContextType | undefined>(undefined);

export const DimensioningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [dimensioningData, setDimensioningData] = useState<DimensioningData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { constants } = useConstants();

    const updateDimensioning = useCallback((key: string, value: any) => {
        setDimensioningData(prev => ({
            ...prev,
            [key]: value
        }));
    }, []);

    const calculateDimensioning = useCallback((contractedPower?: number, annualConsumption?: number) => {
        if (!contractedPower || !annualConsumption) return;

        try {
            setIsLoading(true);

            // Aquí va tu lógica de cálculo
            const calculatedData: DimensioningData = {
                desiredPowerKW: contractedPower,
                estimatedProduction: annualConsumption * 1.1, // Ejemplo
                panelCount: Math.ceil(contractedPower * 1000 / 400), // Ejemplo con paneles de 400W
                inverterSize: contractedPower
            };

            setDimensioningData(calculatedData);
            setError(null);
        } catch (err) {
            setError('Error en el cálculo del dimensionamiento');
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Efecto para recalcular cuando cambian las constantes relevantes
    useEffect(() => {
        if (constants?.technical?.contractedPowerKW && constants?.consumption?.annualConsumption) {
            calculateDimensioning(
                constants.technical.contractedPowerKW,
                constants.consumption.annualConsumption
            );
        }
    }, [constants?.technical?.contractedPowerKW, constants?.consumption?.annualConsumption, calculateDimensioning]);

    return (
        <DimensioningContext.Provider
      value= {{
        dimensioningData,
            setDimensioningData,
            updateDimensioning,
            calculateDimensioning,
            isLoading,
            error
    }
}
    >
    { children }
    </DimensioningContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useDimensioning = () => {
    const context = useContext(DimensioningContext);
    if (context === undefined) {
        throw new Error('useDimensioning must be used within a DimensioningProvider');
    }
    return context;
};