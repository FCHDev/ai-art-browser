import {remove} from "firebase/database";
import {db, refDb} from "../service/firebase-config";
import {useUserContext} from "../Context/Context";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import AsNavFor from "../Components/AsNavFor";
// import ImageViewer from "../Components/ImageViewer";
// import SwiperFav from "../Components/SwiperFav";
import MyCarousel from "../Components/MyCarousel";


const Favorites = ({personalFav, setPersonalFav}) => {
    // DÉCLARATION DU CONTEXTE USER
    const user = useUserContext();

    console.log(personalFav)

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
        const areYouSure = window.confirm(`Voulez-vous vraiment supprimer "${titleToRemove}" de vos favoris ?`);

        if (areYouSure) {
            remove(refDb(db, `/fav/${user.id}/${titleToRemove}`), {})
            alert(`"${titleToRemove}" a bien été supprimé 😢 ?`)
        }
    };


    return (
        <div className="flex flex-col">
            {personalFav.length > 0
                &&
                <MyCarousel personalFav={personalFav}
                           removeThisFav={removeThisFav}/>
                // <SwiperFav personalFav={personalFav}
                //            removeThisFav={removeThisFav}/>
                }

            <div className={`${personalFav.length !== 0 ? "hidden" : "block"} md:mt-10 mx-auto text-xl font-[Poppins]`}>
                Vous n'avez pas encore de favoris 😢
            </div>

            <div className="flex justify-center pt-5">
                <button
                    className={`${personalFav?.length === 0 ? "hidden" : "block"} bg-[crimson] py-1 px-3 rounded-xl mx-auto md:my-10 my-3 hover:bg-white hover:text-[crimson]`}
                    onClick={removeAllFav}>
                    Vider Favoris
                </button>
            </div>


        </div>
    );
};

export default Favorites;