import React, {useEffect, useState} from 'react';
import ArtWork from "./ArtWork";
import {isNew} from "../Utility/functions";

import closeIcon from '../Assets/SVG/close.svg'
import ScrollToTop from "react-scroll-to-top";
import {onValue, ref} from "firebase/database";
import {db} from "../service/firebase-config";


const Gallery = ({fav, setFav, artworks, setArtworks, setTotalArtworks, isLoading, setIsLoading}) => {
    // STATES LOCAUX
    const [modal, setModal] = useState(false)
    const [holdSrc, setHoldSrc] = useState('')
    const [holdTitle, setHoldTitle] = useState('')


// REPERER LES NEWS
    function anyNewItems() {
        let thereIsNews = false
        // eslint-disable-next-line
        artworks.map((item) => {
            if (isNew(item.date, thereIsNews)) {
                thereIsNews = true
            }
        })
        return thereIsNews
    }

    // CREATION IMAGE EN LOCAL STORAGE
    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                // eslint-disable-next-line
                Object.values([data]).map((item) => {
                    setArtworks(Object.values(item));
                    setTotalArtworks(Object.values(item).length);
                    setIsLoading(false);
                    storeImages();
                    console.log("🔥🔥🔥🔥 Firebase is called 🔥🔥🔥🔥");
                });
            } else {
                throw new Error("Il y a un souci");
            }
        });
        // eslint-disable-next-line
    }, []);


// create function to keep images in local storage
    function storeImages() {
        localStorage.setItem('localArtworks', JSON.stringify(artworks.map((item) => item.imgURL)));
        console.log("🔥🔥🔥🔥 Images are stored in local storage 🔥🔥🔥🔥")

    }




    // Clique pour ouvrir l'image dans une modale pleine page
    function closeImg(e) {
        e.preventDefault()
        setModal(false)
    }


    // GESTION DES FAV DANS LE LOCALSTORAGE
    useEffect(() => {
        // Charger les favoris stockés à partir du stockage local
        const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
        if (storedFavorites) {
            setFav(storedFavorites);
        }
    }, [setFav]);

    useEffect(() => {
        // Stocker les favoris dans le stockage local à chaque mise à jour
        localStorage.setItem('favorites', JSON.stringify(fav));
    }, [fav]);

    function toggleFavorite(id, src, title) {
        // Sélectionner ou désélectionner les favoris
        setFav(prevFavorites => {
            const alreadyFavorited = prevFavorites.find(fav => fav.id === id);
            if (alreadyFavorited) {
                return prevFavorites.filter(item => item !== alreadyFavorited);
            } else {
                return [...prevFavorites, {id, src, title}];
            }
        })
    }

    return (
        <>
            {/*SECTION QUAND ON CLIQUE DESSUS (LA MODALE QUI PREND TOUT L'ÉCRAN)*/}
            <div className={`${!modal ? "modal" : "modal open relative"} flex flex-col`}>
                <q
                    className="img-title fixed bg-[#161215] text-white
                    md:text-3xl md:top-4
                    top-8 px-4 rounded-xl">
                    {holdTitle}
                </q>
                <img className="rounded-xl max-h-screen mb-5" src={holdSrc} alt={holdTitle}/>
                <img className="fixed md:top-10 md:left-10 bottom-10 h-8 cursor-pointer opacity-80"
                     onClick={(e) => closeImg(e)}
                     src={closeIcon}
                     alt="fermer close"/>
            </div>

            {/*VUE NEW*/}
            <div className={`${anyNewItems ? "block" : "hidden"} flex flex-col mx-auto md:my-16 my-5`}>
                <div className="newOnes mt-10 mx-auto bg-gray-400 md:rounded-2xl bg-opacity-20">
                    {
                        artworks
                            .filter((pic) => isNew(pic.creationDate))
                            .sort((a, b) => (a.creationDate < b.creationDate ? 1 : -1))
                            .map((pic) =>
                                <ArtWork
                                    key={pic.id}
                                    src={pic.imgURL}
                                    title={pic.title}
                                    creationDate={pic.creationDate}
                                    isFavorited={fav.find(fav => fav.id === pic.id)}
                                    onClick={() => toggleFavorite(pic.id, pic.imgURL, pic.title)}
                                    setHoldSrc={setHoldSrc}
                                    setHoldTitle={setHoldTitle}
                                    setModal={setModal}
                                    isLoading={isLoading}
                                />
                            )}

                    <div
                        className={`bg-[#009688] h-[30px] rounded-xl text-center font-bold text-xl flex justify-center items-center px-3 py-4 absolute -top-6 md:-left-6 z-10`}>
                        What's new ?
                    </div>
                </div>
            </div>


            {/*VUE PRINCIPALE*/}
            <div className="gallery">

                {
                    artworks
                        .sort((a, b) => (a.creationDate && b.creationDate
                            ? (a.creationDate < b.creationDate ? 1 : -1)
                            : null))
                        .map((pic) =>
                            <ArtWork
                                key={pic.id}
                                src={pic.imgURL}
                                title={pic.title}
                                creationDate={pic.creationDate}
                                isFavorited={fav.find(fav => fav.id === pic.id)}
                                onClick={() => toggleFavorite(pic.id, pic.imgURL, pic.title)}
                                setHoldSrc={setHoldSrc}
                                setHoldTitle={setHoldTitle}
                                setModal={setModal}
                                isLoading={isLoading}
                            />
                        )}

            </div>
            <ScrollToTop
                smooth={true}
                className="flex justify-center items-center"/>
        </>
    )


};

export default Gallery;