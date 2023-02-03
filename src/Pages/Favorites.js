import React from 'react';
import {remove} from "firebase/database";
import {db, refDb} from "../service/firebase-config";
import {useUserContext} from "../Context/Context";
import closeIcon from '../Assets/SVG/close.svg'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


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

    // SUPPRIMER UNIQUEMENT LE FAVORI SÉLECTIONNÉ
    const removeThisFav = (titleToRemove) => {
        remove(refDb(db, `/fav/${user.id}/${titleToRemove}`), {})
    };

    // CAROUSEL
    function Carousel() {
        const settings = {
            className: "center",
            dots: false,
            pauseOnHover: false,
            infinite: true,
            fade: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            arrows: false,
            swipeToSlide: true,
        };

        return (
            <Slider {...settings}>
                {personalFav.map((item, index) =>
                    <div key={index} className="md:mb-10">
                        <img src={item.src} alt={item.title} className="mx-auto md:rounded-xl object-fit md:max-h-[700px] max-h-[400px]"/>
                    </div>)}
            </Slider>
        );
    }


    return (
        <div className="flex flex-col">
            {/*<h1 className="md:block hidden text-2xl text-center my-10">Espace Favoris de <strong className="text-[crimson]">*/}
            {/*    {user.firstName}*/}
            {/*</strong>*/}
            {/*</h1>*/}

            <div className={`${personalFav.length === 0 ? "hidden" : "block"} md:mt-10`}>
                <Carousel/>
            </div>

            <div
                className="flex flex-wrap justify-evenly border border-white border-opacity-20 md:w-3/4 mx-2 md:mx-auto p-3 rounded-xl">
                {personalFav.length === 0
                    ? "Vous n'avez pas encore ajouté de favoris 🥹"
                    : personalFav.map((item, index) =>
                        <div key={index} className="flex flex-col justify-center items-center relative">
                            <img className="md:h-[200px] h-[130px] w-auto rounded-xl" src={item.src} alt={item.title}/>
                            <img src={closeIcon}
                                 alt="close icon"
                                 className="h-6 absolute top-1 right-1 bg-[crimson] text-white rounded-full p-1 flex justify-center items-center cursor-pointer"
                                 onClick={() => removeThisFav(item.title)}
                            />
                            <span className="md:text-xs md:block hidden text-center mx-auto">
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