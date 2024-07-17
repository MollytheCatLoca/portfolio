import React from 'react';
import Footer from '@/components/Footer';
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";
import Hero from '@/components/Hero';
import Approach from '@/components/Approach';
//import ChatCompNew from '@/components/ChatCompNew';
import "@/styles/chatbot.css";
//import ChatPopup from '@/components/ChatPopup';
import ChatCompNew from '@/components/ChatCompNew';


const Home = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
      <FloatingNav navItems={navItems} />
      <Hero />
      <Approach />
      <Footer />
      <ChatCompNew />
      </div>
    </main>
  );
};

export default Home;