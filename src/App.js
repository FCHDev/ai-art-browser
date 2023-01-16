import Gallery from "./Components/Gallery";
import midJourneyLogo from "./Assets/Images/midjourneyLogo.png"
import React from "react";
import {datas} from "./datas";

function App() {

    const numberOfPics = datas.length

    return (
        <div className="w-full mx-auto flex flex-col items-center py-5">
            <a href="https://www.midjourney.com/" target="_blank" rel="noreferrer noopener">
                <img className="md:fixed md:block hidden rounded-full h-20 top-5 left-10" src={midJourneyLogo}
                     alt="midjourney"/>
            </a>
            <h1 className="text-center text-4xl md:text-6xl font-bold">
                My A.I. Art Gallery
            </h1>
            <div className="flex h-14 justify-evenly items-center mx-auto">
                <h4 className="mr-2">{numberOfPics} artworks made with MidJourney</h4>
                <img className="h-6 rounded-xl" src={midJourneyLogo} alt="midjourney"/>
            </div>

            <Gallery/>
        </div>
    );
}

export default App;
