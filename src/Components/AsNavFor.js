import React, {useState, useEffect} from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import closeIcon from "../Assets/SVG/close.svg";

const AsNavFor = ({personalFav, removeThisFav}) => {

    // GESTION DU NOMBRE DE THUMBNAILS DANS LE SLIDER2 EN FONCTION DE LA TAILLE DE L'ÉCRAN
    // const [itemsInSlider2, setItemsInSlider2] = useState(8);

    // useEffect(() => {
    //     console.log(personalFav)
    //     const handleWindowResize = () => {
    //         if (window.innerWidth > 1 && window.innerWidth < 900) {
    //             setItemsInSlider2(3);
    //         }
    //         if (window.innerWidth > 900 && window.innerWidth < 1400) {
    //             setItemsInSlider2(4);
    //         }
    //         if (window.innerWidth > 1400) {
    //             setItemsInSlider2(8);
    //         }
    //     };
    //     handleWindowResize();
    //     window.addEventListener("resize", handleWindowResize);
    //     return () => window.removeEventListener("resize", handleWindowResize);
    // }, []);

    const [nav, setNav] = useState({
        nav1: null,
        nav2: null
    });

    let slider1, slider2;

    useEffect(() => {
        setNav({
            nav1: slider1,
            nav2: slider2
        });
    }, [slider1, slider2]);

    const settings = {
        className: "center",
        dots: false,
        pauseOnHover: false,
        // infinite: personalFav.length > 4,
        infinite: false,
        fade: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
        swipeToSlide: true,
    };



    return (
        <div className="md:w-2/3 mx-auto text-black flex flex-col">
            <Slider {...settings}
                    asNavFor={nav.nav2}
                    ref={(slider) => {
                        slider1 = slider;
                    }}
            >
                {personalFav.map((item, index) =>
                    <div key={index}>
                        <img src={item.src} alt={item.title}
                             className="mx-auto md:rounded-xl object-fit md:max-h-[700px] max-h-[550px]"/>
                    </div>)}
            </Slider>

            <div
                className="md:h-[250px] h-[130px] md:mt-5 mx-1 border border-white border-opacity-20 p-3 rounded-xl">
                <Slider
                    asNavFor={nav.nav1}
                    ref={(slider) => {
                        slider2 = slider;
                    }}
                    slidesToShow={4}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    arrows={false}
                >
                    {personalFav.map((item, index) =>
                        <div key={index}
                             className="max-w-[180px] md:max-w-[220px] relative">
                            <img className="md:h-[210px] md:w-[210px] w-[100px] h-[100px] object-cover rounded-xl mx-auto" src={item.src}
                                 alt={item.title}/>
                            <img src={closeIcon}
                                 alt="close icon"
                                 className="h-6 absolute top-1 right-3 bg-gray-500 bg-opacity-50 backdrop-blur-lg text-white rounded-full p-1 flex justify-center items-center cursor-pointer"
                                onClick={() => removeThisFav(item.title)}
                            />
                            <span className="md:text-xs md:block hidden text-center mx-auto text-white">
                                   {item.title}
                               </span>
                        </div>)}

                </Slider>
            </div>
        </div>
    );
};

export default AsNavFor;
