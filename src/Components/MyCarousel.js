import React, {useState} from 'react';
import previous from "../Assets/SVG/previous.svg"
import next from "../Assets/SVG/next.svg"


function MyCarousel({personalFav}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevSlide = () => {
        const index = (currentIndex === 0) ? personalFav.length - 1 : currentIndex - 1;
        setCurrentIndex(index);
    };

    const goToNextSlide = () => {
        const index = (currentIndex === personalFav.length - 1) ? 0 : currentIndex + 1;
        setCurrentIndex(index);
    };


    return (
        <div className="carousel"
        >
            <ImageViewer image={personalFav[currentIndex]}/>
            <div className="carousel-controls 4K:mb-10">
                <button onClick={goToPrevSlide}><img className="h-[50px] sm:h-[40px] 4K:h-[70px] w-auto" src={previous}
                                                     alt="flèche vers la gauche"/></button>
                <div className="w-[100px] text-center text-xl 4K:text-4xl text-[#009788] font-bold font-[Alexandria]">
                    <span
                        className="text-3xl 4K:text-6xl text-white">
                        {currentIndex + 1}</span>/{personalFav.length}</div>
                <button onClick={goToNextSlide}><img className="h-[50px] sm:h-[40px] 4K:h-[70px] w-auto" src={next}
                                                     alt="flèche vers la droite"/></button>
            </div>
        </div>
    );
}

function ImageViewer({image}) {
    return (
        <div
            className="my-5 SmallLaptop:my-0 Laptop:my-1 Desktop:my-5 w-full SmallLaptop:max-w-[430px] Laptop:max-w-[500px] Desktop:max-w-[700px] 2K:max-w-[1100px] 4K:max-w-[1300px] relative">
            <img
                className="object-contain mx-auto h-[400px] SmallLaptop:h-[450px] Desktop:h-[730px] Desktop:h-[730px] 2K:h-[1024px] 4K:h-[1300px] rounded-2xl"
                src={image.src} alt={image.title}/>
            <div
                className={`w-1/2 Desktop:w-1/3 2K:w-1/4 4K:w-1/3 4K:py-1 mx-auto text-sm text-center z-10 bg-black bg-opacity-50 rounded-xl px-3 font-[Poppins] mt-1 4K:mt-5 4K:text-4xl`}>
                {image.title}
            </div>

        </div>
    );
}

export default MyCarousel;