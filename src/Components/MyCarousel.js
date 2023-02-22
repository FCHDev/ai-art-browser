import React, { useState, useRef } from 'react';


function MyCarousel({personalFav}) {
    const [currentIndex, setCurrentIndex] = useState(0);


    const touchStartRef = useRef(0);

    const goToPrevSlide = () => {
        const index = (currentIndex === 0) ? personalFav.length - 1 : currentIndex - 1;
        setCurrentIndex(index);
    };

    const goToNextSlide = () => {
        const index = (currentIndex === personalFav.length - 1) ? 0 : currentIndex + 1;
        setCurrentIndex(index);
    };

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };

    const handleTouchStart = (e) => {
        touchStartRef.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        const touchMove = e.touches[0].clientX;
        const touchDifference = touchStartRef.current - touchMove;

        if (touchDifference > 0) {
            goToNextSlide();
        } else if (touchDifference < 0) {
            goToPrevSlide();
        }
    };

    return (
        <div className="carousel"
             onTouchStart={handleTouchStart}
             onTouchMove={handleTouchMove}
        >
            <ImageViewer image={personalFav[currentIndex]} />
            <ImageSelector
                images={personalFav}
                currentIndex={currentIndex}
                onThumbnailClick={handleThumbnailClick}
            />
            <div className="carousel-controls">
                <button onClick={goToPrevSlide}>Prev</button>
                <button onClick={goToNextSlide}>Next</button>
            </div>
        </div>
    );
}

function ImageViewer({ image }) {
    return (
        <div className="image-viewer">
            <img className="object-contain mx-auto transition-all ease-in-out" src={image.src} alt={image.title} />
        </div>
    );
}

function ImageSelector({ images, currentIndex, onThumbnailClick }) {
    return (
        <div className="image-selector w-full overflow-hidden">
            {images.map((image, index) => (
                <img
                    key={image.id}
                    src={image.src}
                    alt={image.title}
                    className={`${index === currentIndex ? 'selected' : ''} object-cover`}
                    onClick={() => onThumbnailClick(index)}
                />
            ))}
        </div>
    );
}

export default MyCarousel;