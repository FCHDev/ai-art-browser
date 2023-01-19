import React from "react";
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    UserButton,
    useUser,
    RedirectToSignIn
} from "@clerk/clerk-react";
import { dark } from '@clerk/themes'
import Header from "./Components/Header";
import {datas} from "./datas";
import Gallery from "./Components/Gallery";

const frontendApi = process.env.REACT_APP_CLERK_FRONTEND_API;

function App() {
    const numberOfPics = datas.length
    return (
        <>
            <Header numberOfPics={numberOfPics}/>
            <ClerkProvider frontendApi={frontendApi}
                           appearance={{
                               baseTheme: dark
                           }}>
                <SignedIn>
                    <Hello />
                    <Gallery/>
                </SignedIn>
                <SignedOut>
                    <div className="text-center text-5xl mt-10">À plus dans l'bus 🚌</div>
                    <RedirectToSignIn />
                </SignedOut>
            </ClerkProvider>
        </>

    );
}

function Hello() {
    // Get the user's first name
    const {user} = useUser();

    return (
        <div className="flex items-center flex-col pb-3">
            <UserButton userProfileMode={"modal"} appearance={{}}/>
            {user ? <h2 className="md:block hidden">{user.firstName}</h2> : null}
        </div>
    );
}

export default App;
