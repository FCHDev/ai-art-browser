import React from 'react';
import midJourneyLogo from "../Assets/SVG/midjourneyLogo.png";
import Heart from "../Assets/SVG/heart.svg";
import {Link} from "react-router-dom";
import {useUserContext} from "../Context/Context";

const Header = ({totalArtworks, personalFav}) => {

    const user = useUserContext();
    // console.log(personalFav.length)

    return (
        <div>
            <h1 className="font-[Silkscreen] text-center text-4xl md:text-6xl font-bold mt-5">
                My A.I. Art Gallery
            </h1>
            <div className="font-[Silkscreen] flex h-8 justify-center items-center mx-auto">
                <h4 className="mr-2 text-sm md:text-base">
                    {totalArtworks} artworks made with MidJourney
                </h4>
                <img className="h-6 rounded-xl" src={midJourneyLogo} alt="midjourney"/>
            </div>
            <div className="md:w-1/2 mx-auto mt-3 mb-5 h-10 flex justify-center">
                <Link to="/"
                      className="border md:w-1/6 w-1/3 rounded-xl flex items-center justify-evenly md:justify-center px-3 mx-3 hover:bg-gray-700">
                    <svg className="md:mr-2 fill-current text-white"
                         height="20px"
                         viewBox="0 0 512 512"
                         width="20px"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m498.195312 222.695312c-.011718-.011718-.023437-.023437-.035156-.035156l-208.855468-208.847656c-8.902344-8.90625-20.738282-13.8125-33.328126-13.8125-12.589843 0-24.425781 4.902344-33.332031 13.808594l-208.746093 208.742187c-.070313.070313-.140626.144531-.210938.214844-18.28125 18.386719-18.25 48.21875.089844 66.558594 8.378906 8.382812 19.445312 13.238281 31.277344 13.746093.480468.046876.964843.070313 1.453124.070313h8.324219v153.699219c0 30.414062 24.746094 55.160156 55.167969 55.160156h81.710938c8.28125 0 15-6.714844 15-15v-120.5c0-13.878906 11.289062-25.167969 25.167968-25.167969h48.195313c13.878906 0 25.167969 11.289063 25.167969 25.167969v120.5c0 8.285156 6.714843 15 15 15h81.710937c30.421875 0 55.167969-24.746094 55.167969-55.160156v-153.699219h7.71875c12.585937 0 24.421875-4.902344 33.332031-13.808594 18.359375-18.371093 18.367187-48.253906.023437-66.636719zm0 0"/>
                    </svg>
                    <span className="md:block font-[Nunito]">
                        Accueil
                    </span>
                </Link>
                <Link to="/favorites"
                      className={`${personalFav.length === 0 ? "" : "border-[crimson] hover:text-[crimson]"} md:w-1/6 w-1/3 border rounded-xl flex items-center justify-evenly px-3 mx-3 hover:bg-white hover:text-black`}>
                    <img src={Heart} alt="maison home" className=" h-9 md:mr-2"/>
                    <span className="md:block font-[Nunito] text-[#fa5a60]">
                        Favoris
                    </span>
                </Link>

                {user.id === "user_2KUxMR4tOIgm9TIiSQT9XbgydPb"
                    ? <Link to="/upload-image"
                            className="hidden md:block md:fixed md:top-32 md:left-6 h-[50px] w-[50px] border border-[#009688] bg-[#009688] pt-2 pl-2 rounded-xl flex flex-col items-center justify-center hover:bg-gray-700">
                        <svg fill="black"
                             height="35px"
                             width="35px"
                             viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <g id="Icon">
                                <circle cx="11.5" cy="6.744" r="5.5"/>
                                <path
                                    d="m17.5 13.938c-1.966 0-3.562 1.596-3.562 3.562s1.596 3.563 3.562 3.563 3.563-1.597 3.563-3.563-1.597-3.562-3.563-3.562zm0 1.5c1.138 0 2.063.924 2.063 2.062s-.925 2.063-2.063 2.063-2.063-.925-2.063-2.063.925-2.062 2.063-2.062z"/>
                                <path
                                    d="m18.25 14.687v-1.687c0-.414-.336-.75-.75-.75s-.75.336-.75.75v1.688c0 .413.336.75.75.75.414-.001.75-.337.75-.751z"/>
                                <path
                                    d="m20.019 16.042 1.193-1.194c.293-.292.293-.768 0-1.06-.292-.293-.768-.293-1.06 0l-1.194 1.193c-.292.293-.292.768 0 1.061.293.292.768.292 1.061 0z"/>
                                <path
                                    d="m20.312 18.25h1.688c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-1.688c-.413 0-.749.336-.749.75-.001.414.336.75.749.75z"/>
                                <path
                                    d="m18.958 20.019 1.194 1.193c.292.293.768.293 1.06 0 .293-.292.293-.768 0-1.06l-1.193-1.194c-.293-.292-.768-.292-1.061 0-.292.293-.292.768 0 1.061z"/>
                                <path
                                    d="m16.75 20.312v1.688c0 .414.336.75.75.75s.75-.336.75-.75v-1.688c0-.413-.336-.749-.75-.75-.414 0-.75.337-.75.75z"/>
                                <path
                                    d="m14.981 18.958-1.193 1.194c-.293.292-.293.768 0 1.06.292.293.768.293 1.06 0l1.194-1.193c.292-.293.292-.768 0-1.061-.293-.292-.768-.292-1.061 0z"/>
                                <path
                                    d="m14.687 16.75h-1.687c-.414 0-.75.336-.75.75s.336.75.75.75h1.687c.414 0 .751-.336.75-.75 0-.414-.336-.75-.75-.75z"/>
                                <path
                                    d="m16.042 14.981-1.194-1.193c-.292-.293-.768-.293-1.06 0-.293.292-.293.768 0 1.06l1.193 1.194c.293.292.768.292 1.061 0 .292-.293.292-.768 0-1.061z"/>
                                <path
                                    d="m12.936 21.756c-.534-.686-.486-1.681.145-2.311l.194-.195h-.275c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75h.275l-.194-.195c-.656-.655-.682-1.704-.078-2.391-.49-.038-.992-.058-1.503-.058-3.322 0-6.263.831-8.089 2.076-1.393.95-2.161 2.157-2.161 3.424v1.45c0 .451.179.884.498 1.202.319.319.751.498 1.202.498z"/>
                            </g>
                        </svg>
                    </Link>
                    : ""}
            </div>
        </div>
    );
};

export default Header;