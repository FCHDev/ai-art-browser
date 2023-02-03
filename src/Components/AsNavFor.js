import React, {useState, useEffect} from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import closeIcon from "../Assets/SVG/close.svg";

const AsNavFor = ({personalFav, itemsInSlider2}) => {
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
        infinite: true,
        fade: true,
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
                             className="mx-auto md:rounded-xl object-fit md:max-h-[700px] max-h-[400px]"/>
                    </div>)}
            </Slider>

            <div
                className="md:h-[250px] h-[200px] mt-5 mx-1 border border-white border-opacity-20 p-3 rounded-xl">
                <Slider
                    asNavFor={nav.nav1}
                    ref={(slider) => {
                        slider2 = slider;
                    }}
                    slidesToShow={itemsInSlider2}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    arrows={false}
                >


                    {personalFav.map((item, index) =>
                        <div key={index}
                             className="max-w-[180px] md:max-w-[220px] relative">
                            <img className="md:h-[210px] md:w-[210px] w-[170px] h-[170px] object-cover rounded-xl mx-auto" src={item.src}
                                 alt={item.title}/>
                            <img src={closeIcon}
                                 alt="close icon"
                                 className="h-6 absolute top-1 right-3 bg-[crimson] text-white rounded-full p-1 flex justify-center items-center cursor-pointer"
                                // onClick={() => removeThisFav(item.title)}
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
