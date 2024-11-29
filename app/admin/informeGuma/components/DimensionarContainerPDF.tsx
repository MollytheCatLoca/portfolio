'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import DimensionarForm from './DimensionarFormPDF';


const DimensionarContainer: React.FC = () => {
    return (
        <div className= "space-y-1" >
        {/* Sección de Dimensionamiento */ }
        < div >

        <Card className = "bg-[#131825] border-none shadow-lg" >
            <CardContent className="p-4" >
                <DimensionarForm />
                </CardContent>
                </Card>
                </div>



                </div>
    );
};

export default DimensionarContainer;