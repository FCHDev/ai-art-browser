import React from 'react';

const Favorites = ({fav, clearFavorites}) => {
    return (
        <div>
            <div className="flex flex-wrap justify-evenly border w-3/4 mx-auto p-3 rounded-xl">
                {fav.length === 0
                    ? "Vous n'avez pas encore ajouté de favoris 🥹"
                    : fav.map((item, index) =>
                        <div key={index} className="flex flex-col justify-center items-center">
                            <img className="h-[150px] w-auto" src={item.src} alt={item.title}/>
                            <span className="text-xs text-center mx-auto">
                                   {item.title}
                               </span>
                        </div>)}

            </div>
            <div className="flex justify-center">
                <button className={`${fav.length === 0 ? "hidden" : "block"} border py-1 px-3 rounded-xl mx-auto my-5 hover:bg-white hover:text-black`}
                        onClick={clearFavorites}>
                    Vider Favoris
                </button>
            </div>
        </div>
    );
};

export default Favorites;