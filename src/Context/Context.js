import React, {createContext, useContext} from "react";
import {useUser} from "@clerk/clerk-react";

const UserContext = createContext();

export function UserProvider({children}) {
    const {user} = useUser();
    // console.log(user)
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUserContext() {
    return useContext(UserContext);
}