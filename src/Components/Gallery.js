import React, {useEffect, useState} from 'react';
import {datas} from '../datas'
import closeIcon from '../Assets/SVG/close.svg'
import ArtWork from "./ArtWork";
import Favorites from "../Pages/Favorites";

const Gallery = () => {
    // CLIQUE SUR L'IMAGE ET OUVRE MODALE
    const [modal, setModal] = useState(false)
    const [holdSrc, setHoldSrc] = useState('')
    const [holdTitle, setHoldTitle] = useState('')
    const [fav, setFav] = useState([])

    // Clique pour ouvrir l'image dans une modale pleine page
    function closeImg() {
        setModal(false)
    }

    useEffect(() => {
        // Charger les favoris stockés à partir du stockage local
        const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
        if (storedFavorites) {
            setFav(storedFavorites);
        }
    }, []);

    useEffect(() => {
        // Stocker les favoris dans le stockage local à chaque mise à jour
        localStorage.setItem('favorites', JSON.stringify(fav));
    }, [fav]);


    function clearFavorites() {
        setFav([]);
        console.log(fav)
        localStorage.clear();
    }

    function toggleFavorite(id, src, title) {
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
            {/*SECTION FAV*/}
            <Favorites fav={fav} clearFavorites={clearFavorites}/>

            {/*SECTION QUAND ON CLIQUE DESSUS (LA MODALE QUI PREND TOUT L'ÉCRAN)*/}
            <div className={`${!modal ? "modal" : "modal open relative"}`}>
                <q
                    className="img-title fixed bg-[#161215] text-white
                    md:text-3xl md:right-8 md:top-4
                    top-8 px-4 rounded-xl">
                    {holdTitle}
                </q>
                <img className="rounded-xl md:max-h-screen mb-5" src={holdSrc} alt={holdTitle}/>
                <img className="fixed md:top-10 md:left-10 bottom-10 h-8 cursor-pointer opacity-80"
                     onClick={() => closeImg()}
                     src={closeIcon}
                     alt="fermer close"/>
            </div>

            {/*VUE PRINCIPALE*/}
            <div className="gallery">
                {datas
                    // .sort(function () {
                    //     return 0.5 - Math.random();
                    // })
                    .map((pic) =>
                            <ArtWork
                                key={pic.id}
                                src={pic.img}
                                title={pic.title}
                                isFavorited={fav.find(fav => fav.id === pic.id)}
                                onClick={() => toggleFavorite(pic.id, pic.img, pic.title)}
                                setHoldSrc={setHoldSrc}
                                setHoldTitle={setHoldTitle}
                                setModal={setModal}
                            />
                    )}
            </div>
        </>
    )


};

export default Gallery;