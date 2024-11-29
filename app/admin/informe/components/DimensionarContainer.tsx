'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import DimensionarForm from './DimensionarForm';


const DimensionarContainer: React.FC = () => {
    return (
        <div className= "space-y-6" >
        {/* Sección de Dimensionamiento */ }
        < div >
            < Card className = "bg-[#131825] border-none shadow-lg" >
                <CardContent className="p-4" >
                    <DimensionarForm />
                    </CardContent>
                    </Card>
                    </div>

    {/* Sección de Análisis */ }

    </div>
    );
};

export default DimensionarContainer;