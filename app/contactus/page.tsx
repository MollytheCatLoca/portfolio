import { imageItems_Consulting, navItems, companies_Energy, testimonials_Consulting } from "@/data";
import { FloatingNav } from "@/components/ui/FloatingNav";
import Hero from "@/components/Hero-Contact";
import Clients from "@/components/Clients";
import ChatCompNew from "@/components/ChatCompNew";
import Footer from "@/components/Footer";
import { ContactForm } from "@/components/contact-form";
import { Divide } from "lucide-react";

export default function ContactPage() {
    return (
        <main className= " bg-black-100 dark" >

        <FloatingNav navItems={ navItems } />

            < Hero />

            <ContactForm />

            < ChatCompNew />
            <Footer />


            </main>
  );
}