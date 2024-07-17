"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { PinContainer } from "./ui/PinContainer";

interface ProjectItem {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;
}

interface RecentProjectsProps {
  projects: ProjectItem[];
}

const RecentProjects: React.FC<RecentProjectsProps> = ({ projects }) => {
  return (
    <section className="py-36" id="projects">
      
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-0 mb-40">

  
        {projects.map((item) => (
          <PinContainer
            key={item.id}
            title={item.title}
            href={item.link}
            containerClassName="flex flex-grow sm:w-64 w-full md:w-[20vw]"

            //containerClassName="flex flex-grow sm:w-64 w-full md:w-[20vw] p-1"// "flex flex-col lg:flex-row items-center justify-center w-full gap-12"
          >
            <div className="relative flex items-center justify-center sm:w-64 w-full overflow-hidden aspect-[16/20] mb-20">
              <div
                className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                style={{ backgroundColor: "#13162D" }}
              >
                <img src="/bg.png" alt="bgimg" className="absolute inset-0 object-cover w-full h-full" />
              </div>
              <img
                src={item.img}
                alt="cover"
                className="z-10 absolute bottom-0 h-full w-full rounded-lg object-cover"
              />
            </div>

            <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
              {item.title}
            </h1>

            <p className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2" style={{ color: "#BEC1DD", margin: "1vh 0" }}>
              {item.des}
            </p>

            <div className="flex items-center justify-between mt-7 mb-3 w-full">
              <div className="flex items-center">
                {item.iconLists.map((icon, index) => (
                  <div
                    key={index}
                    className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                    style={{ transform: `translateX(-${4 * index + 3}px)` }}
                  >
                    <img src={icon} alt="icon5" className="object-cover w-full h-full rounded-full transform scale-125" />
                  </div>
                ))}
              </div>

              <div className="flex justify-center items-center">
                <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                  + Info
                </p>
                <FaLocationArrow className="ms-3" color="#CBACF9" />
              </div>
            </div>
          </PinContainer>
        ))}
      </div>
    </section>
  );
};

export default RecentProjects;
