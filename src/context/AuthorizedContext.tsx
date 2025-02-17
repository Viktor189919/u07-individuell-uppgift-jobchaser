"use client"

import { createContext, useContext, useState } from "react";
import { FormInputs } from "@/types/formTypes"
import { signup, signin, signout} from "@/utils/SupabaseApi"
import { UserNameContext } from "./UserNameContext";

type AuthContextType = {
    isAuthorized : boolean;
    login : (userInfo : FormInputs) => Promise<string | void>;
    logout : () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthorizedProvider({ children } : { children : React.ReactNode}) {

    const [ isAuthorized, setIsAuthorized ] = useState(false);
    const userNameContext = useContext(UserNameContext);

    if (!userNameContext) {
        throw new Error("UserNameContext does not have a valid value")
    }

    const { userName, setUserName } = userNameContext;

    const login = async (userInfo : FormInputs) => {
        try {
            const user = await signin(userInfo);
            localStorage.setItem("authorized", "true");
            const isLoggedIn = localStorage.getItem("authorized")
            if (isLoggedIn) {
                setIsAuthorized(true);
                if (user) {
                    const name = user[0].name
                    setUserName(name)
                }
            }
        } catch (error) {
            console.error("Error signing in", error);
        }
    }

    const logout = async () => {
        try {
            await signout();
            localStorage.removeItem("authorized");
            const isLoggedIn = localStorage.getItem("authorized");
            
            if (!isLoggedIn) {
                setIsAuthorized(false);
                setUserName("")
            }
        } catch (error) {
            console.error("Error signing out user", error);
        }
    }

    return (
        <AuthContext.Provider value={{isAuthorized, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}