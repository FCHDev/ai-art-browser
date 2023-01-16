import React, {useEffect, useState} from 'react';
import {datas} from '../datas'
import closeIcon from '../Assets/SVG/close.svg'

const Gallery = () => {
    // CLIQUE SUR L'IMAGE ET OUVRE MODALE
    const [modal, setModal] = useState(false)
    const [holdSrc, setHoldSrc] = useState('')
    const [holdTitle, setHoldTitle] = useState('')
    const [view, setView] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    function getImg(imgSrc, imgTitle) {
        setHoldSrc(imgSrc)
        setHoldTitle(imgTitle)
        setModal(true)
    }

    function closeImg() {
        setModal(false)
    }

    useEffect(() => {
        setIsLoaded(true)
        setView(
            <div className={`gallery`}>
                {datas.sort(function () {
                    return 0.5 - Math.random();
                }).map((pic, index) =>
                    <div className="gallery-item" key={index} onClick={() => getImg(pic.img, pic?.title)}>
                        <img className="
                        block object-cover object-center w-full h-full rounded-lg hover:opacity-50
                        transition ease-in-out delay-75 md:hover:-translate-y-1 md:hover:scale-110 duration-75"
                             src={pic.img}
                             alt={pic?.title}
                             title={pic?.title}/>
                    </div>
                )}
            </div>)
    }, [])

    return (
        <>
            <div className={`${!modal ? "modal" : "modal open relative"}`}>
                <q
                    className="img-title fixed bg-black text-white
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

            {isLoaded
                ? view
                : "Loading Art..."}

        </>
    )


};

export default Gallery;