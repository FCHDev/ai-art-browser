import Gallery from "./Components/Gallery";
import midJourneyLogo from "./Assets/Images/midjourneyLogo.png"

function App() {
    return (
        <div className="w-full mx-auto flex flex-col items-center py-5">
            <h1 className="text-center text-4xl md:text-6xl font-bold">
                My A.I. Art Gallery
            </h1>
            <div className="flex h-14 justify-evenly items-center mx-auto">
                <h4 className="mr-2">Made with MidJourney</h4>
                <img className="h-6 rounded-xl" src={midJourneyLogo} alt="midjourney"/>
            </div>

            <Gallery />
        </div>
    );
}

export default App;
