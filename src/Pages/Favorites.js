import React from 'react';

const Favorites = ({fav, clearFavorites}) => {
    return (
        <div className={`${fav.length === 0 ? "hidden" : "block"}`}>
            <div className="flex flex-wrap justify-evenly border w-3/4 mx-auto p-3 rounded-xl">
                {fav.map((item, index) =>
                    <div key={index} className="flex flex-col justify-center items-center">
                        <img className="h-[100px] w-auto" src={item.src} alt="titre"/>
                        <span className="text-xs text-center mx-auto">
                                   {item.title}
                               </span>
                    </div>)}
            </div>
            <div className="flex justify-center">
                <button className="border py-1 px-3 rounded-xl mx-auto my-5" onClick={clearFavorites}>
                    Vider Favoris
                </button>
            </div>
        </div>
    );
};

export default Favorites;