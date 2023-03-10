import React, {useState} from 'react';
import previous from "../Assets/SVG/previous.svg"
import next from "../Assets/SVG/next.svg"


function MyCarousel({personalFav, removeThisFav}) {
    const [currentIndex, setCurrentIndex] = useState(personalFav.length - 1);

    const goToPrevSlide = () => {
        const index = (currentIndex === personalFav.length - 1) ? 0 : currentIndex + 1;
        setCurrentIndex(index);
    };

    const goToNextSlide = () => {
        const index = (currentIndex === 0) ? personalFav.length - 1 : currentIndex - 1;
        setCurrentIndex(index);
    };


    return (
        <div className="carousel"
        >
            <ImageViewer image={personalFav[currentIndex]} removeThisFav={removeThisFav}/>
            <div className="carousel-controls 4K:mb-10">
                <button onClick={goToPrevSlide}>
                    <img className="h-[50px] sm:h-[40px] 4K:h-[70px] w-auto"
                         src={previous}
                         alt="flèche vers la gauche"/></button>
                <div className="w-[100px] text-center text-xl 4K:text-4xl text-[#1FFFE9] font-bold font-[Alexandria]">
                    <span
                        className="text-3xl 4K:text-6xl text-white">
                        {personalFav.length - currentIndex}</span>/{personalFav.length}</div>
                <button onClick={goToNextSlide}>
                    <img className="h-[50px] sm:h-[40px] 4K:h-[70px] w-auto"
                         src={next}
                         alt="flèche vers la droite"/></button>
            </div>
        </div>
    );
}

function ImageViewer({image, removeThisFav}) {
    return (
        <div
            className="my-5 SmallLaptop:my-0 Laptop:my-1 Desktop:my-5 w-full SmallLaptop:max-w-[430px] Laptop:max-w-[500px] Desktop:max-w-[700px] 2K:max-w-[1100px] 4K:max-w-[1300px] relative">
            <div
                className="relative h-[400px] SmallLaptop:h-[450px] Desktop:h-[730px] 2K:h-[1024px] 4K:h-[1300px] rounded-2xl">
                <img
                    className="object-cover mx-auto h-[400px] SmallLaptop:h-[450px] Desktop:h-[730px] 2K:h-[1024px] 4K:h-[1300px] rounded-2xl"
                    src={image.src} alt={image.title}/>
                {/*<img src={removeFavButton} alt="croix de suppression du favoris sélectionné"*/}
                {/*     className="absolute left-[50%] bottom-[5%] w-[30px] h-[30px] cursor-pointer hover:rotate-90"*/}
                {/*     onClick={() => removeThisFav(image.title)}/>*/}
                <div className="absolute left-[45%] bottom-[5%] transition-all cursor-pointer bg-white bg-opacity-50 hover:bg-[#f9595f] hover:bg-opacity-50 rounded-full py-2 px-3 text-xl"
                     onClick={() => removeThisFav(image.title)}>
                    Supprimer
                </div>
            </div>

            <div
                className={`w-full Desktop:w-1/3 2K:w-1/4 4K:w-1/3 4K:py-1 mx-auto text-sm text-center z-10 bg-black bg-opacity-50 rounded-xl px-3 font-[Poppins] sm:mt-1 4K:mt-5 4K:text-4xl`}>
                {image.title}
            </div>

        </div>
    );
}

export default MyCarousel;