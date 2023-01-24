import React, {lazy, Suspense, useState, useEffect} from "react";
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
import {onValue, ref} from "firebase/database";
import {db} from "./service/firebase-config";
import Header from "./Components/Header";
import Favorites from "./Pages/Favorites";
import AdminPage from "./Pages/AdminPage";

// On implémente le lazy loading sur la page principale
const Gallery = lazy(() => import('./Components/Gallery'));

// On configure notre clé API Clerk dans un variable d'environnement'
const frontendApi = process.env.REACT_APP_CLERK_FRONTEND_API;

function App() {
    const [fav, setFav] = useState([])
    const [artworks, setArtworks] = useState([])
    const [totalArtworks, setTotalArtworks] = useState("")
    // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(true);

    function clearFavorites() {
        setFav([]);
        localStorage.clear();
    }

    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                // eslint-disable-next-line
                Object.values([data]).map((item) => {
                    setArtworks(Object.values(item))
                    setTotalArtworks(Object.values(item).length)
                    setIsLoading(false)
                });
            }
        });
    }, []);

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
                                    <Header totalArtworks={totalArtworks} fav={fav}/>
                                    <Suspense fallback={<div className="text-center">Chargement...</div>}>
                                        <Gallery fav={fav} setFav={setFav} artworks={artworks} isLoading={isLoading}/>
                                    </Suspense>
                                    <Hello/>
                                </SignedIn>
                                <SignedOut>
                                    <RedirectToSignIn/>
                                </SignedOut>
                            </>
                        }/>
                        <Route path="/upload-image" element={
                            <AdminPage artworks={artworks}
                                       totalArtwork={totalArtworks}/>
                        }/>
                        <Route path="/favorites" element={
                            <>
                                <Header totalArtworks={totalArtworks} fav={fav}/>
                                <Favorites fav={fav} setFav={setFav} clearFavorites={clearFavorites}/>
                                <Hello/>
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
