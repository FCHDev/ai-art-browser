import {useState, useEffect} from "react";
import Carousel from "nuka-carousel";

const SwiperFav = ({personalFav}) => {
    const [selectedImg, setSelectedImg] = useState(personalFav[0].src);
    const [itemsInSlider2, setItemsInSlider2] = useState(8);

    useEffect(() => {
        console.log(personalFav)
        const handleWindowResize = () => {
            if (window.innerWidth > 1 && window.innerWidth < 900) {
                setItemsInSlider2(3);
            }
            if (window.innerWidth > 900 && window.innerWidth < 1400) {
                setItemsInSlider2(4);
            }
            if (window.innerWidth > 1400) {
                setItemsInSlider2(8);
            }
        };
        handleWindowResize();
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, [personalFav]);

    return (
        <div className="md:w-2/3 mx-auto flex flex-col justify-center items-center pt-5">
            <div className="sm:mb-20 md:mb-5">
                {personalFav.length > 0
                    &&
                    <Carousel
                        wrapAround={true}
                        slidesToShow={itemsInSlider2}
                        autoplay={true}
                        withoutControls={true}>
                        {personalFav.map((item, index) =>
                            <img className="h-1/2 mx-auto rounded-xl" src={item.src} alt={item.title} key={index}
                                 onClick={() => setSelectedImg(item.src)}/>
                        )}
                    </Carousel>}
            </div>

            <div className="md:-mt-7 mx-auto md:h-[550px] flex items-center">
                <img className="mx-auto w-full rounded-xl object-fit md:max-h-[500px]" src={selectedImg}
                     alt="prout"/>
            </div>
        </div>


    );
};

export default SwiperFav;