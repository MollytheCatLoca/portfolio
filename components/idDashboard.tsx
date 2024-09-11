"use client";

import { Suspense } from 'react';
import GlobalHeader from './dashboard/Header';
import ExecutiveSummary from '@/components/dashboard/ExecutiveSummary';
import { Skeleton } from '@/components/ui/skeleton';
import LocationMap from '@/components/dashboard/LocationMap'
import EnergyGeneration from '@/components/dashboard/EnergyGeneration'
import FinancialAnalysis from '@/components/dashboard/FinancialAnalysis'
import EnvironmentalImpact from '@/components/dashboard/EnvironmentalImpact'
import TechnicalDetails from '@/components/dashboard/TechnicalDetails'
import InterpretationCenter from '@/components/dashboard/InterpretationCenter'
import Footer_Energy from '@/components/Footer-Energy'

interface IdDashboardProps {
    data: {
        nombre: any;
        capacidad: any;
        inversion: any;
        produccionAnual: any;
        ahorroCO2: any;
        ubicacion: any;
        terreno: any;
        generacionAnual: any;
        generacionMensual: any;
        analisisFinanciero: any;
        detallesTecnicos: any;
        impactoSocial: any;
    }
}

export default function IdDashboard({ data }: IdDashboardProps) {
    return (
        <div className= "flex flex-col min-h-screen bg-black-100 text-white" >
        <GlobalHeader parqueName={ `Parque ${data.ubicacion.ciudad}` } />
            < main className = "flex-grow pt-4 sm:pt-6" >
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
                    <div className="space-y-12" >
                        <Suspense fallback={ <Skeleton className="h-[200px] w-full bg-gray-800" />}>
                            <ExecutiveSummary 
                                capacidad={ data.capacidad }
    inversion = { data.inversion }
    produccionAnual = { data.produccionAnual }
    ahorroCO2 = { data.ahorroCO2 }
        />
        </Suspense>

        < Suspense fallback = {< Skeleton className = "h-[400px] w-full bg-gray-800" />}>
            <LocationMap 
                                ubicacion={ data.ubicacion }
terreno = { data.terreno }
    />
    </Suspense>

    < Suspense fallback = {< Skeleton className = "h-[400px] w-full bg-gray-800" />}>
        <EnergyGeneration 
                                generacionData={ data.generacionAnual }
generacionMensual = { data.generacionMensual }
    />
    </Suspense>

    < Suspense fallback = {< Skeleton className = "h-[400px] w-full bg-gray-800" />}>
        <FinancialAnalysis
                                inversion={ data.inversion }
analisisFinanciero = { data.analisisFinanciero }
    />
    </Suspense>

    < Suspense fallback = {< Skeleton className = "h-[400px] w-full bg-gray-800" />}>
        <EnvironmentalImpact 
                                ahorroCO2={ data.ahorroCO2 } 
                            />
    </Suspense>

    < Suspense fallback = {< Skeleton className = "h-[400px] w-full bg-gray-800" />}>
        <TechnicalDetails 
                                detallesTecnicos={ data.detallesTecnicos }
capacidad = { data.capacidad }
    />
    </Suspense>

    < Suspense fallback = {< Skeleton className = "h-[400px] w-full bg-gray-800" />}>
        <InterpretationCenter 
                                impactoSocial={ data.impactoSocial } 
                            />
    </Suspense>
    </div>

    < div className = "mt-20 mb-16 w-4/5 mx-auto" > {/* 80% de ancho y centrado */ }
        < Footer_Energy />
        </div>
        </div>

        </main>

        </div>
    );
}