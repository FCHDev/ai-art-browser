import React from 'react';
import {remove} from "firebase/database";
import {db, refDb} from "../service/firebase-config";
import {useUserContext} from "../Context/Context";

const Favorites = ({personalFav, setPersonalFav}) => {
    // DÉCLARATION DU CONTEXTE USER
    const user = useUserContext();

    // SUPPRIMER UN ITEM FAVORI
    const removeAllFav = () => {
        const areYouSure = window.confirm("Voulez-vous vraiment supprimer tous vos favoris ?");

        if (areYouSure) {
            remove(refDb(db, `/fav/${user.id}/`), {
            })
            setPersonalFav([])
            alert("Tous vos favoris ont bien été supprimés 😢")
        } else {
            alert("Vous avez annulé la suppression de vos favoris")
        }};


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
                        <div key={index} className="flex flex-col justify-center items-center">
                            <img className="h-[200px] w-auto rounded-xl" src={item.src} alt={item.title}/>
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