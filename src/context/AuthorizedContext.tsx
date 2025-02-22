"use client"

import { createContext, useContext, useState } from "react";
import { FormInputs } from "@/types/formTypes"
import { signin, signout, getUserData, getSession} from "@/utils/SupabaseApi"
import { UserNameContext } from "./UserNameContext";

type AuthContextType = {
    isAuthorized : boolean;
    login : (userInfo : FormInputs) => Promise<string | void>;
    logout : () => Promise<void>; 
    fetchSession : () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthorizedProvider({ children } : { children : React.ReactNode}) {

    const [ isAuthorized, setIsAuthorized ] = useState(false);
    const userNameContext = useContext(UserNameContext);

    if (!userNameContext) {
        throw new Error("UserNameContext does not have a valid value")
    }

    const { setUserName } = userNameContext;

    async function login(userInfo : FormInputs) {
        try {
            const user = await signin(userInfo);
            const session = await getSession()
            
            if (session) {
                setIsAuthorized(true);
                if (user) {
                    try {
                        const userName = await getUserData(user)
                        if (userName) {
                            setUserName(userName)
                        }
                    } catch (error) {
                        console.error(error)
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }

    }

    async function logout() {
        try {
            await signout();
            localStorage.removeItem("authorized");
            const isLoggedIn = localStorage.getItem("authorized");
            
            if (!isLoggedIn) {
                setIsAuthorized(false);
                setUserName("")
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchSession() {
        try {
            const session = await getSession();
            if (session) {
                setIsAuthorized(true);
                if (session.user.id)
                try {
                    const userName = await getUserData(session.user.id)
                    if (userName) {
                        setUserName(userName);
                    }
                } catch (error) {
                    console.error(error)
                }
            }

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <AuthContext.Provider value={{isAuthorized, login, logout, fetchSession}}>
            {children}
        </AuthContext.Provider>
    )
}