import React from 'react';
import { gridItems_Energy, projects_Energy, companies_Energy, workExperience_Energy, testimonials_Energy } from '@/data';
import Grid from '@/components/Grid';
import RecentProjects from '@/components/RecentProjects';
import Clients from '@/components/Clients';
import Experience from '@/components/Experience';
import { FloatingNav } from '@/components/ui/FloatingNav';
import Hero_Energy from '@/components/Hero-Energy';
import Footer_Energy from '@/components/Footer-Energy';
import Approach_Energy from '@/components/Approach-Energy';
import ChatCompNew2 from '@/components/ChatCompNew2';
import Link from 'next/link';
/**  <Grid gridItems={ gridItems_Energy } />*/
const Energy = () => {

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Energy", link: "/energy" },
    { name: "All In One", link: "/energy/all-in-one" },
    { name: "Simulate", link: "/energy/simulate" },
    { name: "PPTs", link: "/downloads" },

  ];


  return (
    <main className= "relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 dark" >
    <div className="max-w-7xl w-full" >
      <FloatingNav navItems={ navItems } />
        < h1 className = "text-white text-center text-4xl" > Bienvenido a BIS ENERGIA </h1>
          < Hero_Energy />

          <RecentProjects projects = { projects_Energy } />
            < Clients companies = { companies_Energy } testimonials = { testimonials_Energy } />
              <Experience workExperience={ workExperience_Energy } />
                < Approach_Energy />
                <ChatCompNew2 />
                < Link href = "/contactus" >
                  <Footer_Energy />
                  </Link>
                  </div>
                  </main>
  );
};

export default Energy;