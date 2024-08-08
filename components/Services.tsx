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
                < div className = "relative z-1 flex items-center h-[39rem] mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem]" >
                    {/* Contenedor de la imagen con gradiente */ }
                    < div className = "absolute top-0 left-0 w-1/2 h-full overflow-hidden" >
                        <div className="relative w-full h-full" >
                            <img
                  className="w-full h-full object-cover"
    width = { 800}
    alt = "Smartest AI"
    height = { 730}
    src = { service1 }
        />
        {/* Gradiente de la izquierda a la derecha */ }
        < div className = "absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-transparent to-black opacity-75" > </div>
            </div>
            </div>

    {/* Contenedor de texto */ }
    <div className="relative z-1 max-w-[17rem] ml-auto" >
        <h4 className="h4 mb-4" >
            <span className="text-purple" > Energía </span> Inteligente
                </h4>
                < p className = "body-2 mb-[3rem] text-n-3" >
                    Nuestros servicios financieros están diseñados para proporcionar soluciones completas y efectivas que impulsen el éxito de tus proyectos solares.
              </p>
                        < ul className = "body-2" >
                        {
                            brainwaveServices.map((item, index) => (
                                <li
                    key= { index }
                    className = "flex items-start py-4 border-t border-n-6"
                                >
                                <img width={ 24} height = { 24} src = { check } alt = "Check icon" />
                                <p className="ml-4" > { item } </p>
                            </li>
                            ))
                        }
                            </ul>
                            </div>


                            </div>

    {/* Segunda sección con imagen a la derecha y texto a la izquierda */ }
    <div className="relative z-1 flex items-center h-[39rem] mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem]" >
        {/* Contenedor de texto */ }
        < div className = "relative z-1 max-w-[17rem] mr-auto" >
            <h4 className="h4 mb-4" >
                <span className="text-purple" > Innovación </span> Financiera
                    </h4>
                    < p className = "body-2 mb-[3rem] text-n-3" >
                        Desarrollamos estrategias financieras avanzadas para maximizar el rendimiento y la eficiencia de tus inversiones en energía solar.              </p>
                            < ul className = "body-2" >
                            {
                                brainwaveServices2.map((item, index) => (
                                    <li
                    key= { index }
                    className = "flex items-start py-4 border-t border-n-6"
                                    >
                                    <img width={ 24} height = { 24} src = { check } alt = "Check icon" />
                                    <p className="ml-4" > { item } </p>
                                </li>
                                ))
                            }
                                </ul>
                                </div>

    {/* Contenedor de la imagen con gradiente */ }
    <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden" >
        <div className="relative w-full h-full" >
            <img
                  className="w-full h-full object-cover transform scale-105"
    width = { 800}
    alt = "Financial Consulting"
    height = { 730}
    src = { service2 }
        />
        {/* Gradiente de la derecha a la izquierda */ }
        < div className = "absolute top-0 right-0 w-full h-full bg-gradient-to-l from-transparent via-transparent to-black opacity-75" > </div>
            </div>
            </div>
            </div>

            < div className = "relative z-1 grid gap-5 lg:grid-cols-1" >


                <div className = "p-4 bg-n-7 rounded-3xl overflow-hidden lg:min-h-[46rem]" >
                    <div className="py-12 px-4 xl:px-8" >
                        <h4 className="h4 mb-4" >
                            <span className="text-purple" > Asesoría </span> Estratégica
                                </h4>
                                < p className = "body-2 mb-[2rem] text-n-3" >
                                    Ofrecemos soluciones personalizadas para optimizar la rentabilidad y sostenibilidad de tus proyectos energéticos.

                                    </p>

                                        < ul className = "flex items-center justify-between" >
                                        {
                                            brainwaveServicesIcons.map((item, index) => (
                                                <li
                      key= { index }
                      className = {`rounded-2xl flex items-center justify-center ${index === 2
                                                    ? "w-[3rem] h-[3rem] p-0.25 bg-conic-gradient md:w-[4.5rem] md:h-[4.5rem]"
                                                    : "flex w-10 h-10 bg-n-6 md:w-15 md:h-15"
                                                    }`}
                                            >
                                            <div
                        className={
        index === 2
            ? "flex items-center justify-center w-full h-full bg-n-7 rounded-[1rem]"
            : ""
    }
                      >
        <img src={ item } width = { 24} height = { 24} alt = { item } />
            </div>
            </li>
                  ))}
</ul>
    </div>

    < div className = "relative h-[20rem] bg-n-8 rounded-xl overflow-hidden md:h-[25rem]" >
        <img
    src={ service3 }
className = "w-full h-full object-cover object-center"
width = { 520}
height = { 400}
alt = "Scary robot"
    />
    </div>

    </div>
    </div>

    < Gradient />
    </div>
    </div>
    </Section>
  );
};

export default Services;
