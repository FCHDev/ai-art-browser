import React from 'react';
import midJourneyLogo from "../Assets/Images/midjourneyLogo.png";

const Header = ({numberOfPics}) => {
    let total;
    total = numberOfPics;

    return (
        <div>
            <h1 className="text-center text-4xl md:text-6xl font-bold mt-5">
                My A.I. Art Gallery
            </h1>
            <div className="flex h-8 justify-center items-center mx-auto">
                <h4 className="mr-2">{total} artworks made with MidJourney</h4>
                <img className="h-6 rounded-xl" src={midJourneyLogo} alt="midjourney"/>
            </div>

        </div>
    );
};

export default Header;