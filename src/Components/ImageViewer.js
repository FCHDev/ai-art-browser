import React, { useState } from 'react';

const ImageViewer = ({ personalFav }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const imagesArray = personalFav.map((image) => (image.src));
    console.log(imagesArray)

    const handleImageClick = index => {
        setSelectedImage(index);
    };


    const sliderImages = imagesArray.slice(selectedImage, selectedImage + 4);

    if (sliderImages.length < 4) {
        sliderImages.push(...imagesArray.slice(0, 4 - sliderImages.length));
    }

    return (
        <div className="flex flex-col items-center">
            <div className="w-full md:w-1/3 mb-10">
                <img src={imagesArray[selectedImage]} alt="Selected" className="w-full h-full rounded-xl object-cover"/>
            </div>
            <div className="flex w-full md:w-2/3 overflow-hidden">
                {sliderImages.map((image, index) => (
                    <div
                        key={index}
                        className="flex flex-1 h-[250px] w-[250px] items-center justify-center transition-all ease-in-out opacity-50 mr-2"
                        onClick={() => handleImageClick(
                            (selectedImage + index) % imagesArray.length
                        )}
                    >
                        <img src={image} alt="Slider" className="rounded-xl object-cover"/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageViewer;
