import React from 'react';
import TagLine from "./Tagline";

interface HeadingProps {
    className?: string;
    title?: string;
    text?: string;
    tag?: string;
}

const Heading: React.FC<HeadingProps> = ({ className, title, text, tag }) => {
    const splitTitle = title ? title.split(' ') : [];
    const middleIndex = Math.ceil(splitTitle.length / 2);
    const firstHalf = splitTitle.slice(0, middleIndex).join(' ');
    const secondHalf = splitTitle.slice(middleIndex).join(' ');

    return (
        <div className= {`${className} max-w-[50rem] mx-auto mb-12 lg:mb-20 md:text-center`
}>
    { tag && <TagLine className="mb-4 md:justify-center" > { tag } </TagLine>}
{
    title && (
        <h1 className="heading-responsive" >
            { firstHalf } < span className = "text-purple" > { secondHalf } </span>
                </h1>
            )
}
{ text && <p className="body-2 mt-4 text-n-4" > { text } </p> }
</div>
    );
};

export default Heading;
