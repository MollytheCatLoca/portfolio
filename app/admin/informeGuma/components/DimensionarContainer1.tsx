'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/Card3";
import DimensionarForm1 from './DimensionarForm1';
import AnalisisParqueSolar1 from './AnalisisParqueSolar1';

const DimensionarContainer1: React.FC = () => {
    return (
        <div className= "space-y-6" >
        {/* Sección de Dimensionamiento */ }
        < div >

        <Card className = "bg-[#131825] border-none shadow-lg" >
            <CardContent className="p-4" >
                <DimensionarForm1 />
                </CardContent>
                </Card>
                </div>


                </div>
    );
};

export default DimensionarContainer1;