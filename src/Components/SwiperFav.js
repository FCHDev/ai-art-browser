import Slider from "react-slick";

function SwiperFav({personalFav}) {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };



    return (
        <>
            <Slider {...settings}>
                {personalFav.map((slide, index) => (
                        <img src={slide.src} alt={slide.title} key={index}/>
                ))}
            </Slider>
        </>
    );
}

export default SwiperFav;
