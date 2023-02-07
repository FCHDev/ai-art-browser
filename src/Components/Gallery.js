import React, {useEffect, useState} from 'react';
import ArtWork from "./ArtWork";
import {isNew} from "../Utility/functions";

import closeIcon from '../Assets/SVG/close.svg'
import ScrollToTop from "react-scroll-to-top";
import {onValue, ref, update, remove} from "firebase/database";
import {db, refDb} from "../service/firebase-config";
import {useUserContext} from "../Context/Context";
import Skeleton from "./Skeleton";
import portraitSVG from "../Assets/SVG/portrait.svg";
import landscapeSVG from "../Assets/SVG/landscape.svg";
import allSVG from "../Assets/SVG/all.svg";


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
    const [typeFilter, setTypeFilter] = useState(artworks)
    const [showNew, setShowNew] = useState(true)
    const [titleCategory, setTitleCategory] = useState('artworks')


    // FIREBASE : INITIALISATION DE LA BASE DE DONNEES

    useEffect(() => {
        // Vérifiez si les données sont déjà stockées dans localStorage
        const sourceLocal = localStorage.getItem("data");
        const timestampLocal = localStorage.getItem("timestamp");

        if (sourceLocal !== null && timestampLocal !== null) {
            const now = Date.now();
            const storedTimestamp = parseInt(timestampLocal, 10);

            // Si la différence de temps est inférieure à un seuil donné, utilisez les données stockées
            if (now - storedTimestamp < 10000) { // 30 secondes (15 minutes : 900000ms)
                const storedData = Object.entries(JSON.parse(sourceLocal))
                const parsedStoredData = storedData.map((item) => item[1])
                // Utilisez les données stockées pour mettre à jour l'état
                setArtworks(parsedStoredData.sort(() => Math.random() - 0.5));
                setTotalArtworks(parsedStoredData.length);
                setConnectedId(user.id);
                setTypeFilter(parsedStoredData.sort(() => Math.random() - 0.5))
                setTimeout(() => setIsLoading(false), 3000);
                console.log("🔥🔥🔥🔥 DATAS FROM LOCALSTORAGE 🔥🔥🔥🔥");
            } else {
                // Chargez les données depuis le serveur
                onValue(ref(db), (snapshot) => {
                    const data = snapshot.val();
                    if (data !== null) {
                        // Stocker les données et le timestamp dans localStorage
                        localStorage.setItem("data", JSON.stringify(data.images));
                        localStorage.setItem("timestamp", now.toString());
                        // Mettre à jour l'état
                        setArtworks(Object.values(data.images).sort(() => Math.random() - 0.5));
                        setTotalArtworks(Object.values(data.images).length);
                        setConnectedId(user.id);
                        setTypeFilter(Object.values(data.images).sort(() => Math.random() - 0.5))
                        setTimeout(() => setIsLoading(false), 3000);
                        console.log("🔥🔥🔥🔥 DATAS FROM FIREBASE 🔥🔥🔥🔥");
                    } else {
                        throw new Error("Il y a un souci");
                    }
                });
            }
        } else {
            // Chargez les données depuis le serveur
            onValue(ref(db), (snapshot) => {
                const data = snapshot.val();
                if (data !== null) {
                    // Stocker les données et le timestamp dans localStorage
                    localStorage.setItem("data", JSON.stringify(data.images));
                    localStorage.setItem("timestamp", Date.now().toString());
                    // Mettre à jour l'état
                    setArtworks(Object.values(data.images));
                    setTotalArtworks(Object.values(data.images).length);
                    setConnectedId(user.id);
                    setTypeFilter(Object.values(data.images))
                    setTimeout(() => setIsLoading(false), 3000);
                } else {
                    throw new Error("Il y a un souci");
                }
            });
        }
    }, [setArtworks, setTotalArtworks, setConnectedId, setIsLoading, user.id]);

    //BACKUP USEEFFECT
    // useEffect(() => {
    //     // Vérifiez si les données sont déjà stockées dans localStorage
    //     const sourceLocal = localStorage.getItem("data");
    //
    //     if (sourceLocal !== null) {
    //         setTimeout(() => setIsLoading(false), 2000);
    //         const storedData = Object.entries(JSON.parse(sourceLocal))
    //         const parsedStoredData = storedData.map((item) => item[1])
    //         // Utilisez les données stockées pour mettre à jour l'état
    //         setArtworks(parsedStoredData.sort(() => Math.random() - 0.5));
    //         setTotalArtworks(parsedStoredData.length);
    //         setConnectedId(user.id);
    //         console.log("🔥🔥🔥🔥 DATAS FROM LOCALSTORAGE 🔥🔥🔥🔥")
    //
    //         // Ecouter les changements dans Firebase
    //         onValue(ref(db), (snapshot) => {
    //             const data = snapshot.val();
    //             // Mettre à jour les données dans localStorage
    //             localStorage.setItem("data", JSON.stringify(data));
    //             // Mettre à jour l'état
    //             setArtworks(Object.values(data).sort(() => Math.random() - 0.5));
    //             setTotalArtworks(Object.values(data).length);
    //             setConnectedId(user.id);
    //             console.log("🔥🔥🔥🔥 DATAS FROM FIREBASE 🔥🔥🔥🔥");
    //         });
    //     } else {
    //         // Chargez les données depuis le serveur
    //         onValue(ref(db), (snapshot) => {
    //             const data = snapshot.val();
    //             if (data !== null) {
    //                 // Stocker les données dans localStorage
    //                 localStorage.setItem("data", JSON.stringify(data));
    //                 // Mettre à jour l'état
    //                 setArtworks(Object.values(data));
    //                 setTotalArtworks(Object.values(data).length);
    //                 setConnectedId(user.id);
    //                 console.log("🔥🔥🔥🔥 DATAS INIT FROM FIREBASE 🔥🔥🔥🔥");
    //             } else {
    //                 throw new Error("Il y a un souci");
    //             }
    //         });
    //     }
    //     setTimeout(() => setIsLoading(false), 3000);
    // }, [setArtworks, setTotalArtworks, setIsLoading, setConnectedId, user.id])

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

    // fonction qui permet de faire un toggle sur le bouton "nouveau" pour afficher les nouveaux artworks
    const toggleShowNew = () => {
        setShowNew(!showNew)
    }

    // FILTRE SUR LES ARTWORKS PAR CATÉGORIE
    // fonction qui permet de filtrer les artworks par catégorie
    const filterByType = (keyword) => {
        if (keyword === "all") {
            setTypeFilter(artworks)
            setTitleCategory("artworks")
            setShowNew(false)
        } else {
            const filteredArtworks = artworks.filter(function (obj) {
                return obj?.type && obj?.type.includes(keyword);
            })
            setTypeFilter(filteredArtworks)
            setTitleCategory(keyword)
            setShowNew(false)
        }
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
                <img className="max-h-screen md:mb-5" src={holdSrc} alt={holdTitle}/>
                <img className="fixed md:top-10 md:left-10 bottom-20 h-8 cursor-pointer opacity-80"
                     onClick={(e) => closeImg(e)}
                     src={closeIcon}
                     alt="fermer close"/>
            </div>

            {/*// SECTION GESTION DES CATEGORIES*/}
            <div className="w-full md:w-1/4 mx-auto flex justify-evenly items-center md:mb-12 md:mt-8">
                <button
                    className={`${showNew ? "text-[#009688] border border-[#009688] line-through" : "bg-[#009688]"} font-bold md:text-base text-sm w-[130px] md:w-20 md:h-12 py-2 px-2 rounded-xl cursor-pointer`}
                    onClick={toggleShowNew}>
                    New
                </button>

                <button
                    className="md:flex md:items-center text-base w-[65px] py-2 px-2 rounded-full cursor-pointer"
                    onClick={() => filterByType("all")}>
                    <img src={allSVG} alt="svg pour enlever les filtres"/>
                </button>
                <button
                    className="md:flex md:items-center md:p-5 text-base md:w-20 md:h-12 w-[50px] py-2 px-2 rounded-full bg-white cursor-pointer md:hover:bg-gray-300"
                    onClick={() => filterByType("paysages")}>
                    <img src={landscapeSVG} alt="svg pour filtrer les paysages"/>
                </button>
                <button
                    className="md:flex md:items-center md:p-5 text-base md:w-20 md:h-12 w-[50px] py-2 px-2 rounded-full bg-white cursor-pointer md:hover:bg-gray-300"
                    onClick={() => filterByType("portrait")}>
                    <img src={portraitSVG} alt="svg pour filtrer les portrtaits"/>
                </button>
            </div>

            {/*VUE NEW*/}
            <div className={`${anyNewItems && showNew ? "block" : "hidden"} flex flex-col mx-auto my-5`}>
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
                                        type={pic?.type}
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
                    Tous les <span className="text-[#009787] capitalize">
                    {titleCategory === "portrait" ? "portraits" : titleCategory}...
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
                        typeFilter.map((pic, index) =>
                            <ArtWork
                                key={index}
                                src={pic.imgURL}
                                title={pic.title}
                                type={pic?.type}
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