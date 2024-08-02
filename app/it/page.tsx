import React from 'react';
import { navItems, gridItems_IT, projects_IT, companies_IT, workExperience_IT, testimonials_IT } from '@/data';
import Grid from '@/components/Grid';
import RecentProjects from '@/components/RecentProjects';
import Clients from '@/components/Clients';
import Experience from '@/components/Experience';
import { FloatingNav } from '@/components/ui/FloatingNav';
import Hero_IT from '@/components/Hero-IT';
import Footer_IT from '@/components/Footer-IT';
import Approach_IT from '@/components/Approach-IT';
import ChatCompNew from '@/components/ChatCompNew';

const IT = () => {
  return (
    <main className= "relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 dark" >
    <div className="max-w-7xl w-full" >
      <FloatingNav navItems={ navItems } />
        < h1 className = "text-white text-center text-4xl" > Bienvenido a BIS IT </h1>
          < Hero_IT />
          <Grid gridItems={ gridItems_IT } />
            < RecentProjects projects = { projects_IT } />
              <Clients companies={ companies_IT } testimonials = { testimonials_IT } />
                <Experience workExperience={ workExperience_IT } />
                  < Approach_IT />
                  <ChatCompNew />
                  < Footer_IT />
                  </div>
                  </main>
  );
};

export default IT;
