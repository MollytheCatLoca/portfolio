"use client";

import React from "react";
import Image from "next/image";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import ExpandableCardDemo from "./blocks/expandable-card-demo-grid";

interface Company {
    id: number;
    name: string;
    img: string;
    nameImg: string;
}

interface Testimonial {
    quote: string;
    name: string;
    title: string;
}

interface ClientsProps {
    companies: Company[];
    testimonials: Testimonial[];
}

const Clients: React.FC<ClientsProps> = ({ companies, testimonials }) => {
    return (
        <section id= "testimonials" className = "py-20" >
            <h1 className="heading-responsive" >
                Ideas que
                    < span className = "text-purple" > Potencian </span>
                        </h1>

                        < div className = "flex flex-col items-center max-lg:mt-10" >
                            <div className="py-1 mb-5" >
                                <ExpandableCardDemo />
                                </div>

                                < div className = "flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10" >
                                {
                                    companies.map((company) => (
                                        <React.Fragment key= { company.id } >
                                        <div className="flex md:max-w-60 max-w-32 gap-2" >

                                    <img
                  src={ company.nameImg }
                  alt = { company.name }
                  width = { company.id === 4 || company.id === 5 ? 200 : 150 }
                  className = "md:w-24 w-20"

                                        />
                                        </div>
                                        </React.Fragment>
                                    ))
                                }
                                    </div>
                                    </div>
                                    </section>
  );
};

export default Clients;