import React from 'react';
import { navItems, gridItems_AllinOne, projects_Energy, companies_Energy, workExperience_Energy, testimonials_AllInOne } from '@/data';
import { FloatingNav } from '@/components/ui/FloatingNav';
import Footer_Energy from '@/components/Footer-Energy';
import ChatCompNew from '@/components/ChatCompNew';
import Hero_AllinOne from '@/components/Hero-AllInOne';
import Grid from '@/components/Grid3';
import Clients from '@/components/ClientsCards';
import { CardProvider } from '@/context/CardContext';
import Link from 'next/link';
//**  < Clients companies = { companies_Energy } testimonials = { testimonials_AllInOne } />
const AllInOne = () => {
  return (
    <CardProvider>
    <main className= "relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 dark" >
    <div className="max-w-7xl w-full" >
      <FloatingNav navItems={ navItems } />
        < h1 className = "text-white text-center text-4xl" > </h1>
          < Hero_AllinOne />
          <Grid gridItems={ gridItems_AllinOne } />

            < ChatCompNew />
            <div className='mb-10' > </div>
              < Link href = "/contactus" >
                <Footer_Energy />
                </Link>
                </div>
                </main>
                </CardProvider>
  );
};

export default AllInOne;