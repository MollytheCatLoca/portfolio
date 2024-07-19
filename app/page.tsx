import React from 'react';
import Footer from '@/components/Footer';
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems, RECENT_PROJECT_HOME } from "@/data";
import Hero from '@/components/Hero';
import RecentProjects from '@/components/RecenProjectss-Home';
import ChatCompNew from '@/components/ChatCompNew';


const Home = () => {
  return (
    <main className="relative bg-black-100 flex justify-center overflow-clip items-center flex-col  mx-auto sm:px-5 px-1">
      <div className="w-full">
        <FloatingNav navItems={navItems} /> 
       
      <Hero />
      <div className="scale-125"> <RecentProjects projects={RECENT_PROJECT_HOME} /></div>
     
      <ChatCompNew />
      <Footer />
      </div>
    </main>
  );
};

export default Home;
