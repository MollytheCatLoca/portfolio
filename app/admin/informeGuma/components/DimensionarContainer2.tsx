'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import DimensionarForm2 from './DimensionarForm2';

import AnalisisParqueSolar2 from './AnalisisParqueSolar2';

const DimensionarContainer2: React.FC = () => {
    return (
        <div className= "space-y-6" >


        {/* Sección de Análisis */ }
        < div >
        <div className="text-sm text-gray-400 font-medium px-2 mb-2" >

            </div>
            < AnalisisParqueSolar2 />
            </div>
            </div>
    );
};

export default DimensionarContainer2;