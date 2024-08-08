import React from 'react';
import { imageItems_Consulting, navItems, companies_Energy, testimonials_Consulting } from "@/data";
import { FloatingNav } from "@/components/ui/FloatingNav";
import Hero_Financing from "@/components/Hero-Financing";
import ChatCompNew from "@/components/ChatCompNew";
import Footer_Energy from "@/components/Footer-Energy";
import Benefits from '@/components/Benefits';
import Services from '@/components/Services';

// Definimos los tipos si no están ya definidos en un archivo de declaración
type NavItem = {
    name: string;
    link: string;
};

// Definimos las props del componente (aunque en este caso no hay props)
interface AppProps { }

const App: React.FC<AppProps> = () => {
    return (
        <main className= "relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 dark" >
        <div className="max-w-7xl w-full" >
            <FloatingNav navItems={ navItems as NavItem[] } />

                < Hero_Financing />
                <Services />
                < div style = { { transform: 'scale(0.95)', transformOrigin: 'center' }
}>
    <Benefits /></div >
    <ChatCompNew />
    < Footer_Energy />

    </div>
    </main>
  );
};

export default App;

// Comentarios originales mantenidos
//** <Collaboration />
//<Services />
//<Roadmap />