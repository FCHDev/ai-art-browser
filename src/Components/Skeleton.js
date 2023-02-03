import React from 'react';

const Skeleton = () => {
    return (
        // ARTWORK
            <div className="gallery-item skeleton w-[250px] relative transition ease-in-out delay-75 md:hover:-translate-y-1 md:hover:scale-105 duration-75 rounded-xl">
                <div className="block object-cover object-center w-full h-full rounded-lg z-1 cursor-pointer">
                </div>
            </div>
    );
};

export default Skeleton;