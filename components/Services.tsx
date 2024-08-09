import Section from "./Section";
import Heading from "./Heading2";
import {
    PhotoChatMessage,
    Gradient,
    VideoBar,
    VideoChatMessage,
} from "./design/Services";
import Generating from "./Generating";

const Services: React.FC = () => {
    const brainwaveServicesIcons = [
        "/recording-03.svg",
        "/recording-01.svg",
        "/disc-02.svg",
        "/chrome-cast.svg",
        "/sliders-04.svg"
    ];

    const service1 = "/services/Chess.png"; // Foto principal
    const service2 = "/services/FIN_Globe.jpg"; // Foto segunda
    const service3 = "/services/FIN_Estoca.jpg";
    const check = "/check.svg";
    const brainwaveServices = [
        "Gestión de Leasing",
        "Gestión de Fideicomisos",
        "Estructuración de ONs",
        "Gestión de SGRs"
    ];

    const brainwaveServices2 = [
        "Optimización de Costos",
        "Financiamiento de Proyectos",
        "Evaluación de Riesgos",
        "Planificación Fiscal"
    ];


    return (

        <Section id= "how-to-use" >
        <div className="container" >
            <div className="relative" >

                {/* Primera sección con imagen a la izquierda y texto a la derecha */ }
                < div className = "relative z-1 flex items-center h-[39rem] mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem] sm:transform sm:scale-[0.8] sm:origin-center sm:text-sm" >
                    {/* Contenedor de la imagen con gradiente */ }
                    < div className = "absolute top-0 left-0 w-1/2 h-full overflow-hidden" >
                        <div className="relative w-full h-full" >
                            <img
                    className="w-full h-full object-cover max-h-[100%]"
    alt = "Smartest AI"
    src = { service1 }
        />
        {/* Gradiente de la izquierda a la derecha */ }
        < div className = "absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-transparent to-black opacity-75 sm:opacity-90" >
            </div>
            </div>
            </div>

    {/* Contenedor de texto */ }
    <div className="relative z-10 max-w-[17rem] ml-auto text-white" >
        <h4 className="h4 mb-4 sm:text-base" >
            <span className="text-purple" > Energía </span> Inteligente
                </h4>
                < p className = "body-2 mb-[3rem] text-n-3 sm:text-sm" >
                    Nuestros servicios financieros están diseñados para proporcionar soluciones completas y efectivas que impulsen el éxito de tus proyectos solares.
                </p>
                        < ul className = "body-2 sm:text-sm" >
                        {
                            brainwaveServices.map((item, index) => (
                                <li key= { index } className = "flex items-start py-4 border-t border-n-6" >
                                <img width={ 24} height = { 24} src = { check } alt = "Check icon" />
                                <p className="ml-4" > { item } </p>
                            </li>
                            ))
                        }
                            </ul>
                            </div>
                            </div>

    {/* Segunda sección con imagen a la derecha y texto a la izquierda */ }
    <div className = "relative z-1 flex items-center h-[39rem] mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem] sm:transform sm:scale-[0.8] sm:origin-center sm:text-sm" >
        {/* Contenedor de la imagen con gradiente */ }
        < div className = "absolute top-0 right-0 w-full h-full overflow-hidden" >
            <div className="relative w-full h-full" >
                <img
                    className="w-full h-full object-cover max-h-[100%]"
    alt = "Financial Consulting"
    src = { service2 }
        />
        {/* Gradiente de la derecha a la izquierda */ }
        < div
    className = "absolute top-0 right-0 h-full bg-gradient-overlay"
        >
        </div>
        </div>
        </div>

    {/* Contenedor de texto en overlay */ }
    <div className="relative z-10 max-w-[17rem] mr-auto text-white" >
        <h4 className="h4 mb-4 sm:text-base" >
            <span className="text-purple" > Innovación </span> Financiera
                </h4>
                < p className = "body-2 mb-[3rem] text-n-3 sm:text-sm" >
                    Desarrollamos estrategias financieras avanzadas para maximizar el rendimiento y la eficiencia de tus inversiones en energía solar.
                </p>
                        < ul className = "body-2 sm:text-sm" >
                        {
                            brainwaveServices2.map((item, index) => (
                                <li key= { index } className = "flex items-start py-4 border-t border-n-6" >
                                <img width={ 24} height = { 24} src = { check } alt = "Check icon" />
                                <p className="ml-4" > { item } </p>
                            </li>
                            ))
                        }
                            </ul>
                            </div>

                            </div>

                            </div>
                            </div>
                            </Section>

      

  );
};

export default Services;
