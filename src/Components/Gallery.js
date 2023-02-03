import React, {useEffect, useState} from 'react';
import ArtWork from "./ArtWork";
import {isNew} from "../Utility/functions";

import closeIcon from '../Assets/SVG/close.svg'
import ScrollToTop from "react-scroll-to-top";
import {onValue, ref, update, remove} from "firebase/database";
import {db, refDb} from "../service/firebase-config";
import {useUserContext} from "../Context/Context";
import Skeleton from "./Skeleton";


const Gallery = ({
                     artworks,
                     setArtworks,
                     setTotalArtworks,
                     setTotalFav,
                     isLoading,
                     setIsLoading,
                     personalFav,
                     setPersonalFav,
                     setConnectedId
                 }) => {

    // DÉCLARATION DU CONTEXTE USER
    const user = useUserContext();

    // STATES LOCAUX
    const [modal, setModal] = useState(false)
    const [holdSrc, setHoldSrc] = useState('')
    const [holdTitle, setHoldTitle] = useState('')

    // REPERER LES NOUVEAUX ARTWORKS
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

    // FIREBASE : INITIALISATION DE LA BASE DE DONNEES
    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                // eslint-disable-next-line
                Object.values([data]).map((item) => {
                    setArtworks(Object.values(item));
                    setTotalArtworks(Object.values(item).length);
                    setConnectedId(user.id)
                });
            } else {
                throw new Error("Il y a un souci");
            }
        });
        setTimeout(() => setIsLoading(false), 3000)
    }, [setArtworks, setTotalArtworks, setIsLoading, setConnectedId, user.id]);

    // FIREBASE : RECUPERATION DES FAV DU USER CONNECTÉ SUR FIREBASE
    useEffect(() => {
        onValue(ref(db, `/fav/${user.id}`), (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                // eslint-disable-next-line
                Object.values([data]).map((item) => {
                    setPersonalFav(Object.values(item))
                    setTotalFav(Object.values(item).length)
                });
            } else {
                console.log("🔥🔥🔥🔥 NO FAV 🔥🔥🔥🔥");
            }
        })
    }, [setPersonalFav, setTotalFav, user.id])

    // GESTION DE LA MODALE
    function closeImg(e) {
        e.preventDefault()
        setModal(false)
    }

    // // GESTION DES FAV DANS LE LOCALSTORAGE
    // useEffect(() => {
    //     // Charger les favoris stockés à partir du stockage local
    //     const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    //     if (storedFavorites) {
    //         setPersonalFav(storedFavorites);
    //     }
    // }, [setFav]);
    //
    // useEffect(() => {
    //     // Stocker les favoris dans le stockage local à chaque mise à jour
    //     localStorage.setItem('favorites', JSON.stringify(personalFav));
    // }, [personalFav]);

    // ÉCRITURE DU NOUVEAU FAV DANS FIREBASE
    function writeNewFav(id, title, src) {
        const newFavPost = {
            id: id,
            title: title,
            src: src
        };
        const updates = {};
        updates[`/fav/${user.id}/${title}`] = newFavPost;

        return update(ref(db), updates);
    }

    // SUPPRESSION D'UN FAV DANS FIREBASE
    function removeNewFav(titleToRemove) {
        remove(refDb(db, `/fav/${user.id}/${titleToRemove}`), {});
    }

    // AJOUT/SUPP DE LA LISTE DES FAVORIS + ÉCRITURE DANS FIREBASE
    function toggleFavorite(id, src, title) {
        setPersonalFav(personalFav => {
            const alreadyFavorited = personalFav.find(fav => fav.title === title);
            if (alreadyFavorited) {
                removeNewFav(title)
                return personalFav.filter(item => item !== alreadyFavorited);
            } else {
                writeNewFav(id, title, src)
                return [...personalFav, {id, src, title}];
            }
        })
    }

    // useEffect(() => {
    //     setTimeout(() => setIsLoading(false), 5000);
    // }, [setIsLoading])

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
                <div className="newOnes mt-10 mx-auto bg-gray-400 md:rounded-2xl bg-opacity-20 md:mb-10">
                    {isLoading
                        ? (<>
                                <Skeleton/>
                                <Skeleton/>
                                <Skeleton/>
                                <Skeleton/>
                                <Skeleton/>
                                <Skeleton/>
                                <Skeleton/>
                                <Skeleton/>
                                <Skeleton/>
                                <Skeleton/>
                                <Skeleton/>
                                <Skeleton/>
                            </>
                        )
                        : (
                            artworks.filter((pic) => isNew(pic.creationDate))
                                .sort((a, b) => (a.creationDate < b.creationDate ? 1 : -1))
                                .map((pic, index) =>
                                    <ArtWork
                                        key={index}
                                        src={pic.imgURL}
                                        title={pic.title}
                                        creationDate={pic.creationDate}
                                        isFavorited={personalFav.find(fav => fav.title === pic.title)} // Si l'image est dans les favoris
                                        onClick={() => toggleFavorite(pic.id, pic.imgURL, pic.title)} // Fonction pour ajouter/supprimer des favoris
                                        setHoldSrc={setHoldSrc}
                                        setHoldTitle={setHoldTitle}
                                        setModal={setModal}
                                        isLoading={isLoading}
                                    />
                                ))}
                    <div
                        className={`bg-[#009688] h-[30px] rounded-xl text-center font-bold text-xl flex justify-center items-center px-3 py-4 absolute -top-6 md:-left-6 z-10`}>
                        What's new ?
                    </div>
                </div>
            </div>


            {/*VUE PRINCIPALE*/}
            <div className="gallery">
                <h2 className="text-3xl md:pt-20 text-center text-white font-bold my-5">
                    Tous les <span className="text-[#009787]">
                    Artworks...
                </span>
                </h2>

                {isLoading
                    ? (<>
                            <Skeleton/>
                            <Skeleton/>
                            <Skeleton/>
                            <Skeleton/>
                            <Skeleton/>
                            <Skeleton/>
                            <Skeleton/>
                            <Skeleton/>
                            <Skeleton/>
                            <Skeleton/>
                            <Skeleton/>
                            <Skeleton/>
                        </>
                    )
                    : (
                    artworks
                        .sort((a, b) => (a.creationDate && b.creationDate
                            ? (a.creationDate < b.creationDate ? 1 : -1)
                            : null)) // On trie les images par date de création
                        .filter((pic) => !isNew(pic.creationDate)) // On filtre les images qui ne sont pas nouvelles
                        .map((pic, index) =>
                            <ArtWork
                                key={index}
                                src={pic.imgURL}
                                title={pic.title}
                                creationDate={pic.creationDate}
                                isFavorited={personalFav.find(fav => fav.title === pic.title)} // Si l'image est dans les favoris
                                onClick={() => toggleFavorite(pic.id, pic.imgURL, pic.title)} // Fonction pour ajouter/supprimer des favoris
                                setHoldSrc={setHoldSrc}
                                setHoldTitle={setHoldTitle}
                                setModal={setModal}
                                isLoading={isLoading}
                            />
                        ))}
            </div>

            <ScrollToTop
                smooth={true}
                className="flex justify-center items-center"/>
        </>

    )


};

export default Gallery;