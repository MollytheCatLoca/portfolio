import React from 'react';
import { navItems, gridItems_Vial, projects_Vial, companies_Vial, workExperience_Vial, testimonials_Vial } from '@/data';
import Grid from '@/components/Grid';
import RecentProjects from '@/components/RecentProjects';
import Clients from '@/components/Clients';
import Experience from '@/components/Experience';
import { FloatingNav } from '@/components/ui/FloatingNav';
import Hero_Vial from '@/components/Hero-Vial';
import Footer_Vial from '@/components/Footer-Vial';
import Approach_Vial from '@/components/Approach-Vial';
import ChatCompNew from '@/components/ChatCompNew';

const Vial = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <h1 className="text-white text-center text-4xl">Bienvenido a BIS VIAL</h1>
        <Hero_Vial />
        <Grid gridItems={gridItems_Vial} />
        <RecentProjects projects={projects_Vial} />
        <Clients companies={companies_Vial} testimonials={testimonials_Vial} />
        <Experience workExperience={workExperience_Vial} />
        <Approach_Vial />
        <ChatCompNew />
        <Footer_Vial/>
      </div>
    </main>
  );
};

export default Vial;
