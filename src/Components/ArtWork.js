import React from 'react';
import {isNew} from "../Utility/functions";
import New from "../Assets/SVG/new.svg"

const ArtWork = ({
                     src,
                     title,
                     creationDate,
                     isFavorited,
                     onClick,
                     setHoldSrc,
                     setHoldTitle,
                     setModal,
                     isLoading,
                 }) => {

    function getImg(imgSrc, imgTitle, event) {
        event.preventDefault()
        setHoldSrc(imgSrc)
        setHoldTitle(imgTitle)
        setModal(true)
        console.log(title + " " + (creationDate ? `a été créé le ${creationDate}` : "n'a pas de date de création"))
    }

    return (
        <div className="gallery-item relative transition ease-in-out delay-75 md:hover:-translate-y-1 md:hover:scale-105 duration-75">
            <img className={`${isNew(creationDate) ? "border border-2 border-[#009688]" : ""}
                    //     block object-cover object-center w-full h-full rounded-lg `}
                 src={src}
                 alt={title}
                 onClick={(event) => getImg(src, title, event)}
            />
            <div
                className={`${isNew(creationDate) ? "" : "hidden"} absolute top-0 right-0 z-10`}>
                <img src={New} alt="bandeau nouvel item"/>
            </div>
            <svg
                className={`${isLoading ? "hidden" : "block"} absolute bottom-1 right-1 z-10 cursor-pointer`}
                onClick={onClick}
                id="Heart"
                height="30px"
                width="30px"
                viewBox="0 0 512 512">
                <path
                    d="m449.28 121.43a115.2 115.2 0 0 0 -137.89-35.75c-21.18 9.14-40.07 24.55-55.39 45-15.32-20.5-34.21-35.91-55.39-45a115.2 115.2 0 0 0 -137.89 35.75c-16.5 21.62-25.22 48.64-25.22 78.13 0 42.44 25.31 89 75.22 138.44 40.67 40.27 88.73 73.25 113.75 89.32a54.78 54.78 0 0 0 59.06 0c25-16.07 73.08-49.05 113.75-89.32 49.91-49.42 75.22-96 75.22-138.44 0-29.49-8.72-56.51-25.22-78.13z"
                    fill={isFavorited ? "#f9595f" : "white"}/>
            </svg>
        </div>
    );
};

export default ArtWork;