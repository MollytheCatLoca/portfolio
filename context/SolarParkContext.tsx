// contexts/SolarParkContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ParqueSolar } from '../types/solarPark';
import { parqueSolarData as initialData } from '@/data/parqueDashSim';

interface SolarParkContextType {
    solarParkData: ParqueSolar;
    updateSolarParkData: (newData: Partial<ParqueSolar>) => void;
}

const SolarParkContext = createContext<SolarParkContextType | undefined>(undefined);

export function SolarParkProvider({ children }: { children: ReactNode }) {
    const [solarParkData, setSolarParkData] = useState<ParqueSolar>(initialData);

    const updateSolarParkData = (newData: Partial<ParqueSolar>) => {
        setSolarParkData(prevData => ({
            ...prevData,
            ...newData
        }));
    };

    return (
        <SolarParkContext.Provider value= {{ solarParkData, updateSolarParkData }
}>
    { children }
    </SolarParkContext.Provider>
  );
}

export function useSolarPark() {
    const context = useContext(SolarParkContext);
    if (context === undefined) {
        throw new Error('useSolarPark must be used within a SolarParkProvider');
    }
    return context;
}