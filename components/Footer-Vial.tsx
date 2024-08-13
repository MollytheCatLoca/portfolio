import { FaLocationArrow } from "react-icons/fa6";
import { socialMedia } from "@/data";
import MagicButton from "./ui/MagicButton";


const Footer_Vial = () => {
  return (
    <footer className= "w-full pb-10 mb-[100px] md:mb-5" id = "contact" >
      {/* background grid */ }


      < div className = "flex flex-col items-center" >
        <h1 className="heading-responsive lg:max-w-[45vw] sm:max-w-[50vw] text-center " >
        ¿Listos para revolucionar < span className = "text-purple" > la infraestructura vial </span>?
  </h1>
  < p className = "text-white-200 md:mt-10 my-5 text-center" >
    Tecnologías avanzadas para una movilidad segura y eficiente.
        </p>

      < a href = "mailto:contacto@bisintegraciones.com" >
        <MagicButton
            title="Email"
icon = {< FaLocationArrow />}
position = "right"
  />
  </a>
  </div>
  < div className = "flex mt-16 md:flex-row flex-col justify-between items-center" >
    <p className="md:text-base text-sm md:font-normal font-light" >
      Copyright © 2024 BIS Integraciones
        </p>

        < div className = "flex items-center md:gap-3 gap-6 mt-4 md:mt-0" >
        {
          socialMedia.map((info) => (
            <div
              key= { info.id }
              className = "w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
            <img src={ info.img } alt = "icons" width = { 20} height = { 20} />
            </div>
          ))
        }
          </div>
          </div>
          </footer>
  );
};

export default Footer_Vial;