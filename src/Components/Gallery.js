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
                        <img className="block object-cover object-center w-full h-full rounded-lg hover:opacity-50"
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
                <img src={holdSrc} alt={holdTitle}/>
                <img className="fixed md:top-10 md:left-10 bottom-7 h-8 cursor-pointer opacity-50"
                     onClick={() => closeImg()}
                     src={closeIcon}
                     alt="fermer close"/>
                <span
                    className="fixed bg-black text-white md:text-3xl md:right-1 md:top-4 text-base top-3 px-2 rounded-xl">
                    {holdTitle}
                </span>
            </div>

            {isLoaded
                ? view
                : "Loading Art..."}

        </>
    )


};

export default Gallery;