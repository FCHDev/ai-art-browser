import React from 'react';
import loading from "../Assets/SVG/loading.svg"

const Loader = () => {

    return (
        <div className="w-1/2 h-2/3 mx-auto flex justify-center items-center my-20 animate-pulse">
            <img src={loading} alt="chargement en cours"/>
        </div>


    );
};

export default Loader;
