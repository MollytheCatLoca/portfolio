import { benefits, Benefit } from "../constants";
import Heading from "./Heading2";
import Section from "./Section";
import Arrow from "../public/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../public/svg/ClipPath";

// Define the type for the benefits array
interface BenefitsProps {
    benefits: Benefit[];
}

const splitTitle = (title: string) => {
    const words = title.split(' ');
    const middleIndex = Math.ceil(words.length / 2);
    const firstHalf = words.slice(0, middleIndex).join(' ');
    const secondHalf = words.slice(middleIndex).join(' ');
    return { firstHalf, secondHalf };
};

const Benefits: React.FC = () => {
    return (
        <Section id= "features" className = "p-10" >
            <div className="container relative" >
                <Heading
                    className="md:max-w-md lg:max-w-3xl"
    title = "Soluciones Financieras"
        />

        <div className="flex flex-wrap justify-center gap-20 mb-10" >
        {
            benefits.map((item) => {
                const { firstHalf, secondHalf } = splitTitle(item.title);
                return (
                    <div
                                className= "block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
                style = {{ backgroundImage: `url(${item.backgroundUrl})` }
            }
                                key = { item.id }
                >
                <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none" >
            <h5 className="h5 mb-5" >
            { firstHalf } < span className = "text-purple" > { secondHalf } </span>
            </h5>
            < p className = "body-2 mb-6 text-n-3" > { item.text } </p>
            < div className = "flex items-center mt-auto" >
            <img
                                            src={ item.iconUrl }
                                            width = { 48}
                                            height = { 48}
                                            alt = { item.title }
                />
                <p className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider" >
            Explore more
            </p>
            < Arrow />
            </div>
            </div>

                                { item.light && <GradientLight /> }

                < div
                                    className = "absolute inset-0.5 bg-n-8"
                                    style = {{ clipPath: "url(#benefits)" }}
            >
            <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10" >
            {
                item.imageUrl && (
                    <img
                                                src={ item.imageUrl }
    width = { 380}
    height = { 362}
    alt = { item.title }
    className = "w-full h-full object-cover"
        />
                                        )}
</div>
    </div>

    < ClipPath />
    </div>
                        );
                    })}
</div>
    </div>
    </Section>
    );
};

export default Benefits;
