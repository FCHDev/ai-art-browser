import React from 'react';
import Header from "../Components/Header";
import Gallery from "../Components/Gallery";

const Home = () => {

    return (
        <div className="w-full mx-auto flex flex-col items-center md:pt-5 pb-5">
            <Header/>
            <Gallery/>
        </div>
    );
};

export default Home;