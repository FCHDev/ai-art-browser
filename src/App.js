import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import {UserProvider} from "./Context/Context";
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    UserButton,
    useUser,
    RedirectToSignIn
} from "@clerk/clerk-react";
import {dark} from '@clerk/themes'
import Header from "./Components/Header";
import Gallery from "./Components/Gallery";
import Favorites from "./Pages/Favorites";
import AdminPage from "./Pages/AdminPage";
import HeaderFav from "./Components/HeaderFav";


// On configure notre clé API Clerk dans un variable d'environnement'
const frontendApi = process.env.REACT_APP_CLERK_FRONTEND_API;

function App() {
    // STATES GLOBAUX
    const [artworks, setArtworks] = useState([])
    const [totalArtworks, setTotalArtworks] = useState("")
    const [totalFav, setTotalFav] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const [connectedId, setConnectedId] = useState("")
    const [personalFav, setPersonalFav] = useState([])


    return (
        <>
            <ClerkProvider
                frontendApi={frontendApi}
                appearance={{
                    baseTheme: dark,
                }}
            >
                <UserProvider>
                    <Routes>
                        <Route path="/" element={
                            <>
                                <SignedIn>
                                    <Header
                                        totalArtworks={totalArtworks}
                                        personalFav={personalFav}/>
                                    <Gallery
                                        artworks={artworks}
                                        setArtworks={setArtworks}
                                        setTotalArtworks={setTotalArtworks}
                                        setTotalFav={setTotalFav}
                                        isLoading={isLoading}
                                        setIsLoading={setIsLoading}
                                        setConnectedId={setConnectedId}
                                        personalFav={personalFav}
                                        setPersonalFav={setPersonalFav}/>

                                    <Hello/>
                                </SignedIn>
                                <SignedOut>
                                    <RedirectToSignIn/>
                                </SignedOut>
                            </>
                        }/>
                        <Route path="/upload-image" element={
                            <AdminPage artworks={artworks}
                                       setArtworks={setArtworks}
                                       totalArtwork={totalArtworks}/>
                        }/>
                        <Route path="/favorites" element={
                            <>
                                <HeaderFav totalArtworks={totalArtworks} personalFav={personalFav}/>
                                <Favorites
                                    personalFav={personalFav}
                                    setPersonalFav={setPersonalFav}
                                    totalFav={totalFav}
                                    connectedId={connectedId}/>
                            </>}/>
                    </Routes>
                </UserProvider>
            </ClerkProvider>
        </>
    );
}

function Hello() {
    // Get the user's first name
    const {user} = useUser();

    return (
        <div className="md:fixed md:top-5 md:left-5 flex items-center flex-col">
            <UserButton userProfileMode={"modal"}/>
            {user ? <h2>{user.firstName}</h2> : null}
        </div>
    );
}

export default App;
