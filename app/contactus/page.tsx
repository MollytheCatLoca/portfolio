"use client"
import React from 'react';
import { navItems } from "@/data";
import { FloatingNav } from "@/components/ui/FloatingNav";
import Hero from "@/components/Hero-Contact";
import ChatCompNew from "@/components/ChatCompNew";
import Footer from "@/components/Footer";
import { ContactForm } from "@/components/contact-form";
import MapaArgentina from "@/components/MapaArgentina";

export default function ContactPage() {
    return (
        <main className= "relative bg-gradient-itemsrelative bg-black-100 flex justify-center overflow-clip items-center flex-col  mx-auto sm:px-5 px-1 dark-b from-[#000B18] to-[#111928] min-h-screen" >
        <div className="fixed top-0 left-0 right-0 z-50" >
            <FloatingNav navItems={ navItems } />
                </div>
                < div className = "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
                    <Hero className="w-full" />
                        <div className="mt-16" >
                            <div className="max-w-4xl mx-auto flex flex-col items-center" >
                                <ContactForm className="w-full mb-16" />
                                    <MapaArgentina className="w-full mb-20" />
                                        </div>
                                        </div>
                                        < ChatCompNew />
                                        </div>
                                        < Footer />
                                        </main>
  );
}