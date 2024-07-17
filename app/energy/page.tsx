import React from 'react';
import { navItems, gridItems_Energy, projects_Energy, companies_Energy, workExperience_Energy, testimonials_Energy } from '@/data';
import Grid from '@/components/Grid';
import RecentProjects from '@/components/RecentProjects';
import Clients from '@/components/Clients';
import Experience from '@/components/Experience';
import { FloatingNav } from '@/components/ui/FloatingNav';
import Hero_Energy from '@/components/Hero-Energy';
import Footer_Energy from '@/components/Footer-Energy';
import Approach_Energy from '@/components/Approach-Energy';
import ChatCompNew from '@/components/ChatCompNew';

const Energy = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <h1 className="text-white text-center text-4xl">Bienvenido a BIS ENERGIA</h1>
        <Hero_Energy />
        <Grid gridItems={gridItems_Energy} />
        <RecentProjects projects={projects_Energy} />
        <Clients companies={companies_Energy} testimonials={testimonials_Energy} />
        <Experience workExperience={workExperience_Energy} />
        <Approach_Energy />
        <ChatCompNew />
        <Footer_Energy/>
      </div>
    </main>
  );
};

export default Energy;
