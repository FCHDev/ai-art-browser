import React from 'react';
import {isNew} from "../Utility/functions";
import New from "../Assets/SVG/new.svg"
import LazyLoad from 'react-lazy-load'
import Skeleton from "./Skeleton";


const ArtWork = ({
                     src,
                     title,
                     id,
                     creationDate,
                     isFavorited,
                     setHoldSrc,
                     setHoldId,
                     setHoldTitle,
                     setModal,
                     isLoading,
                 }) => {

    function getImg(imgSrc, imgTitle, imgId, event) {
        event.preventDefault()
        setHoldSrc(imgSrc)
        setHoldId(imgId)
        setHoldTitle(imgTitle)
        setModal(true)
        console.log(imgSrc)
    }

    return (
        isLoading
            ? Skeleton
            : <div
                className={`gallery-item relative transition ease-in-out delay-75 md:hover:-translate-y-1 md:hover:scale-105 duration-75`}>
                <LazyLoad height={250}>
                    <img
                        className={`${isNew(creationDate) ? "border border-2 border-[#1FFFE9]" : ""} ${isFavorited ? "border border-2 border-[#f9595f]" : ""} block object-cover object-center w-full h-full rounded-lg z-1 cursor-pointer`}
                        src={src}
                        alt={title}
                        id={id}
                        loading={"lazy"}
                        onClick={(event) => getImg(src, title, id, event)}
                    />
                </LazyLoad>

                {/*Bandeau sur l'image "new"*/}
                <div className="absolute z-10 top-0 right-0">
                    <LazyLoad>
                        <img src={New} alt="bandeau nouvel item"
                             className={`${isNew(creationDate) ? "" : "hidden"}`}
                             loading={"lazy"}/>
                    </LazyLoad>
                </div>

                {/*Titre sur l'image "new"*/}
                <LazyLoad>
                    <div
                        className={`${isNew(creationDate) ? "" : "hidden"} text-sm absolute z-10 bottom-1 left-2 bg-black bg-opacity-50 rounded-xl px-3 font-[Poppins]`}>
                        {title}
                    </div>
                </LazyLoad>

                {/*❤️ sur l'image*/}
                {/*<LazyLoad>*/}
                {/*    <svg*/}
                {/*        className={`${isLoading ? "hidden" : "block"} absolute bottom-1 right-2 z-20 cursor-pointer`}*/}
                {/*        onClick={onClick}*/}
                {/*        id="Heart"*/}
                {/*        height="35px"*/}
                {/*        width="35px"*/}
                {/*        viewBox="0 0 512 512">*/}
                {/*        <path*/}
                {/*            d="m449.28 121.43a115.2 115.2 0 0 0 -137.89-35.75c-21.18 9.14-40.07 24.55-55.39 45-15.32-20.5-34.21-35.91-55.39-45a115.2 115.2 0 0 0 -137.89 35.75c-16.5 21.62-25.22 48.64-25.22 78.13 0 42.44 25.31 89 75.22 138.44 40.67 40.27 88.73 73.25 113.75 89.32a54.78 54.78 0 0 0 59.06 0c25-16.07 73.08-49.05 113.75-89.32 49.91-49.42 75.22-96 75.22-138.44 0-29.49-8.72-56.51-25.22-78.13z"*/}
                {/*            fill={isFavorited ? "#f9595f" : "white"}/>*/}
                {/*    </svg>*/}
                {/*</LazyLoad>*/}
            </div>

    )
        ;
};

export default ArtWork;