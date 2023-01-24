import React, {lazy, useEffect, useState} from 'react';
import closeIcon from '../Assets/SVG/close.svg'
import ScrollToTop from "react-scroll-to-top";

const ArtWork = lazy(() => import('./ArtWork'));

const Gallery = ({fav, setFav, artworks, isLoading}) => {
    // CLIQUE SUR L'IMAGE ET OUVRE MODALE
    const [modal, setModal] = useState(false)
    const [holdSrc, setHoldSrc] = useState('')
    const [holdTitle, setHoldTitle] = useState('')


    // Clique pour ouvrir l'image dans une modale pleine page
    function closeImg() {
        setModal(false)
    }


    console.log(holdTitle)


    // const download = () => {
    //     const element = document.createElement("a");
    //     const file = new Blob(
    //         [
    //             holdSrc
    //         ],
    //         {type: "image/jpg"}
    //     );
    //     element.href = URL.createObjectURL(file);
    //     element.download = `${holdTitle}.jpg`;
    //     element.click()
    // }

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
            {/*SECTION FAV*/}
            {/*<Favorites fav={fav} clearFavorites={clearFavorites}/>*/}

            {/*SECTION QUAND ON CLIQUE DESSUS (LA MODALE QUI PREND TOUT L'ÉCRAN)*/}
            <div className={`${!modal ? "modal" : "modal open relative"} flex flex-col`}>
                <q
                    className="img-title fixed bg-[#161215] text-white
                    md:text-3xl md:right-8 md:top-4
                    top-8 px-4 rounded-xl">
                    {holdTitle}
                </q>
                <img className="rounded-xl max-h-screen mb-5" src={holdSrc} alt={holdTitle}/>
                <img className="fixed md:top-10 md:left-10 bottom-10 h-8 cursor-pointer opacity-80"
                     onClick={() => closeImg()}
                     src={closeIcon}
                     alt="fermer close"/>
                {/*<a href="/" download={true}>*/}
                {/*    <button*/}
                {/*        className="border rounded-xl flex items-center justify-center px-3 mx-3 hover:bg-gray-700">*/}
                {/*        Download Image*/}
                {/*    </button>*/}
                {/*</a>*/}
            </div>

            {/*VUE PRINCIPALE*/}
            <div className="gallery">
                {
                    artworks
                        // .sort(function () {
                        //     return 0.5 - Math.random();
                        // })
                        .map((pic) =>
                            <ArtWork
                                key={pic.id}
                                src={pic.imgURL}
                                title={pic.title}
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