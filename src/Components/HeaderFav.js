import React from 'react';
import midJourneyLogo from "../Assets/SVG/midjourneyLogo.png";
import {Link} from "react-router-dom";

const HeaderFav = ({totalArtworks}) => {


    return (
        <div>
            <h1 className="font-[Silkscreen] text-center text-4xl md:text-6xl font-bold mt-5">
                My <span className="text-[#1FFFE9]">A.I. Art</span> Gallery
            </h1>
            <div className="font-[Silkscreen] flex h-8 justify-center items-center mx-auto">
                <h4 className="mr-2 text-sm md:text-base">
                    {totalArtworks} artworks made with MidJourney
                </h4>
                <img className="h-6 rounded-xl" src={midJourneyLogo} alt="midjourney"/>
            </div>
            <div className="md:w-1/2 mx-auto md:mt-3 md:mb-5 mt-5 mb-2 h-10 flex justify-center">
                <Link to="/"
                      className="border md:w-1/6 w-1/3 rounded-xl flex items-center justify-evenly md:justify-center px-3 mx-3 hover:bg-gray-700">
                    <svg className="md:mr-2 fill-current text-white"
                         height="20px"
                         viewBox="0 0 512 512"
                         width="20px"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m498.195312 222.695312c-.011718-.011718-.023437-.023437-.035156-.035156l-208.855468-208.847656c-8.902344-8.90625-20.738282-13.8125-33.328126-13.8125-12.589843 0-24.425781 4.902344-33.332031 13.808594l-208.746093 208.742187c-.070313.070313-.140626.144531-.210938.214844-18.28125 18.386719-18.25 48.21875.089844 66.558594 8.378906 8.382812 19.445312 13.238281 31.277344 13.746093.480468.046876.964843.070313 1.453124.070313h8.324219v153.699219c0 30.414062 24.746094 55.160156 55.167969 55.160156h81.710938c8.28125 0 15-6.714844 15-15v-120.5c0-13.878906 11.289062-25.167969 25.167968-25.167969h48.195313c13.878906 0 25.167969 11.289063 25.167969 25.167969v120.5c0 8.285156 6.714843 15 15 15h81.710937c30.421875 0 55.167969-24.746094 55.167969-55.160156v-153.699219h7.71875c12.585937 0 24.421875-4.902344 33.332031-13.808594 18.359375-18.371093 18.367187-48.253906.023437-66.636719zm0 0"/>
                    </svg>
                    <span className="md:block font-[Nunito]">
                        Accueil
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default HeaderFav;