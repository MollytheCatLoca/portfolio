"use client"
import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems, RECENT_PROJECT_HOME } from "@/data";
import Hero_Home from '@/components/Hero-Home';
import RecentProjects from '@/components/RecenProjectss-Home';
import ChatCompNew2 from '@/components/ChatCompNew2';
import Link from 'next/link';

const Home = () => {

  const [refreshHero, setRefreshHero] = useState(false);

  useEffect(() => {
    // Set the refreshHero state to true to trigger a re-render of the Hero component
    setRefreshHero(true);

    // Forzar recarga de estilos CSS
    const links = document.querySelectorAll('link[rel=stylesheet]');
    links.forEach(link => {
      const href = link.href;
      link.href = '';
      link.href = href;
    });
  }, []);


  return (
    <main className= "relative bg-black-100 flex justify-center overflow-clip items-center flex-col  mx-auto sm:px-5 px-1 dark" >
    <div className="w-full" >

      <FloatingNav navItems={ navItems } />

  { refreshHero && <Hero_Home /> }

  <div className = "scale-95" > <RecentProjects projects={ RECENT_PROJECT_HOME } /></div >

    <ChatCompNew2 />
    < Link href = "/contactus" >
      <Footer />
      </Link>
      </div>
      </main>
  );
};

export default Home;