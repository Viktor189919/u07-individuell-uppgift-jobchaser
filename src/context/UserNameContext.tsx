"use client"

import { createContext, useState } from "react";

type UserNameContextType = {
    userName : string;
    setUserName : (userName : string) => void;
}

export const UserNameContext = createContext<UserNameContextType | undefined>(undefined);

export default function UserNameProvider({children} : {children : React.ReactNode}) {

    const [ userName, setUserName ] = useState("");

    return (
            <UserNameContext.Provider value={{userName, setUserName}}>
                {children}
            </UserNameContext.Provider>
    )
}