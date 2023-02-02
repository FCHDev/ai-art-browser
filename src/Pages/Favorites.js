import React from 'react';
import {remove} from "firebase/database";
import {db, refDb} from "../service/firebase-config";
import {useUserContext} from "../Context/Context";

const Favorites = ({personalFav, setPersonalFav}) => {
    // DÉCLARATION DU CONTEXTE USER
    const user = useUserContext();

    // SUPPRIMER TOUS LES FAVORIS DU USER
    const removeAllFav = () => {
        const areYouSure = window.confirm("Voulez-vous vraiment supprimer tous vos favoris ?");

        if (areYouSure) {
            remove(refDb(db, `/fav/${user.id}/`), {})
            setPersonalFav([])
            alert("Tous vos favoris ont bien été supprimés 😢")
        } else {
            alert("Vous avez annulé la suppression de vos favoris")
        }
    };

    // SUPPRIMER LE FAVORI SÉLECTIONNÉ
    const removeThisFav = (titleToRemove) => {
        remove(refDb(db, `/fav/${user.id}/${titleToRemove}`), {})
    };


    return (
        <div>
            <h1 className="text-2xl text-center my-10">Espace Favoris de <strong className="text-[crimson]">
                {user.firstName}
            </strong>
            </h1>
            <div className="flex flex-wrap justify-evenly border w-3/4 mx-auto p-3 rounded-xl">
                {personalFav.length === 0
                    ? "Vous n'avez pas encore ajouté de favoris 🥹"
                    : personalFav.map((item, index) =>
                        <div key={index} className="flex flex-col justify-center items-center relative">
                            <img className="h-[200px] w-auto rounded-xl" src={item.src} alt={item.title}/>
                            <span
                                className="absolute top-1 right-1 bg-[crimson] text-white rounded-full px-2 flex justify-center items-center cursor-pointer"
                                onClick={() => removeThisFav(item.title)}
                            >
                                x
                            </span>
                            <span className="text-xs text-center mx-auto">
                                   {item.title}
                               </span>
                        </div>)}

            </div>
            <div className="flex justify-center">
                <button
                    className={`${personalFav?.length === 0 ? "hidden" : "block"} bg-[crimson] py-1 px-3 rounded-xl mx-auto my-10 hover:bg-white hover:text-[crimson]`}
                    onClick={removeAllFav}>
                    Vider Favoris
                </button>
            </div>
        </div>
    );
};

export default Favorites;