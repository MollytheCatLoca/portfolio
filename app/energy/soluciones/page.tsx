import React from 'react';
import { imageItems_Consulting, navItems, companies_Energy, testimonials_Consulting } from "@/data";
import { FloatingNav } from "@/components/ui/FloatingNav";
import Hero_Soluciones from '@/components/Hero-Soluciones';
import ChatCompNew2 from "@/components/ChatCompNew2";
import Footer_Energy from "@/components/Footer-Energy";
import Benefits_Soluciones from '@/components/Benefits_Soluciones';
import Services_Soluciones from '@/components/Services_Soluciones';

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

                < Hero_Soluciones />
                <Services_Soluciones />
                < div style = { { transform: 'scale(0.95)', transformOrigin: 'center' }
}>
    <Benefits_Soluciones /></div >
    <ChatCompNew2 />
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