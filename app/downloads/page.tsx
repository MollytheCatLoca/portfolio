"use client";
import React from 'react';
import { navItems } from "@/data";
import { FloatingNav } from "@/components/ui/FloatingNav";
import DownloadablePresentation from '@/components/DownloadablePresentation';
import Hero from '@/components/Hero-Down';
import Footer from "@/components/Footer";
import { Spotlight } from "@/components/ui/Spotlight";
import ChatCompNew from '@/components/ChatCompNew';
import Link from 'next/link';

const DownloadPage = () => {
    return (
        <main className= "relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 dark" >

        <FloatingNav navItems={ navItems } />

            < Hero />
            <div className = "z-50" >

                <DownloadablePresentation />
                </div>
                < ChatCompNew />

                <Link href="/contactus" >

                    <Footer />

                    </Link>

                    </main>
    );
};

export default DownloadPage;
