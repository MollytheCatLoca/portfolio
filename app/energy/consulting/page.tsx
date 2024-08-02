import CarouselV02 from "@/components/carousel-v02"
import { imageItems_Consulting, navItems, companies_Energy, testimonials_Consulting } from "@/data"
import { FloatingNav } from "@/components/ui/FloatingNav"
import Hero_Consulting from "@/components/Hero-Consulting"
import Clients from "@/components/Clients"
import ChatCompNew from "@/components/ChatCompNew"
import Footer_Energy from "@/components/Footer-Energy"
import { Divide } from "lucide-react"

export default function ConsultingPage() {

    return (
        <main className= "relative bg-black-100 flex flex-col justify-center items-center overflow-hidden mx-auto sm:px-10 px-5 dark" >
        <div className="max-w-7xl w-full" >
            <FloatingNav navItems={ navItems } />
                < div className = "w-full flex flex-col items-center" >
                    <Hero_Consulting />
                    < CarouselV02 imageItems = { imageItems_Consulting } />
                        <Clients companies={ companies_Energy } testimonials = { testimonials_Consulting } />
                            <ChatCompNew />
                            < Footer_Energy />
                            </div>
                            </div>
                            </main>
  )
}