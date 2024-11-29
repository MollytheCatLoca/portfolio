'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import DimensionarForm from './DimensionarForm';
import AnalisisParqueSolar from './AnalisisParqueSolar';

const DimensionarContainer: React.FC = () => {
    return (
        <div className= "space-y-6" >
        {/* Sección de Dimensionamiento */ }
        < div >
        <div className="text-sm text-gray-400 font-medium px-2 mb-2" >
            Dimensionamiento
            </div>
            < Card className = "bg-[#131825] border-none shadow-lg" >
                <CardContent className="p-4" >
                    <DimensionarForm />
                    </CardContent>
                    </Card>
                    </div>

    {/* Sección de Análisis */ }
    <div>
        <div className="text-sm text-gray-400 font-medium px-2 mb-2" >
            Análisis Detallado
                </div>
                < AnalisisParqueSolar />
                </div>
                </div>
    );
};

export default DimensionarContainer;