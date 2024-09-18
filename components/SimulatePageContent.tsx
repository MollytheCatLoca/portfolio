"use client"

import React from 'react';
import { useQueryParams } from '@/context/QueryParamsContext';
import { useRouter } from 'next/navigation';
import { FloatingNav } from "@/components/ui/FloatingNav";
import HeroSimulate from "@/components/Hero-Simulate";
import Footer from "@/components/Footer";
import { SimulationForm } from "@/components/SimulationForm";
import Link from 'next/link';

export default function SimulatePage() {
    const { setQueryParams } = useQueryParams();
    const router = useRouter();

    const handleSimulationSubmit = (formData: {
        provincia: string;
        localidad: string;
        capacidad: string;
        area: string;
    }) => {
        //console.log("SimulatePage: Form submitted with data", formData);
        setQueryParams(formData);
        router.push(`/energy/dashboard?provincia=${formData.provincia}&localidad=${formData.localidad}&capacidad=${formData.capacidad}&area=${formData.area}`);
    };

    const navItems = [
        { name: "Home", link: "/" },
        { name: "Energy", link: "/energy" },
        { name: "All In One", link: "/energy/all-in-one" },

    ];

    return (
        <main className= "relative bg-gradient-itemsrelative bg-black-100 flex justify-center overflow-clip items-center flex-col  mx-auto sm:px-5 px-1 dark-b from-[#000B18] to-[#111928] min-h-screen" >
        <div className="fixed top-0 left-0 right-0 z-50" >
            <FloatingNav navItems={ navItems } />
                </div>
                < div className = "w-full max-w-7xl mx-auto px-1 sm:px-4 lg:px-1" >
                    <HeroSimulate className="w-full" />
                        <div className="mt-1" >
                            <div className="relative max-w-4xl mx-auto flex flex-col items-center gap-2" >
                                <SimulationForm className="w-full mb-16" onSubmit = { handleSimulationSubmit } />
                                    </div>
                                    </div>
                                    </div>
                                    < Link href = "/" >
                                        <Footer />
                                        </Link>
                                        </main>
    );
}