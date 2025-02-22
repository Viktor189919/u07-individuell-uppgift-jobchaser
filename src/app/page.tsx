"use client"

import React, { useContext, useEffect } from "react";
import styles from "@/styles/HomePage.module.css"
import { AuthContext } from "@/context/AuthorizedContext";
import { UserNameContext } from "@/context/UserNameContext";

export default function HomePage() {

    const authContext = useContext(AuthContext);
    const userNameContext = useContext(UserNameContext);

    if (!authContext) {
        throw new Error("AuthContext does not have a valid value")
    }

    if (!userNameContext) {
        throw new Error("UserNameContext does not have a valid value")
    }

    const { isAuthorized, fetchSession } = authContext;
    const { userName } = userNameContext;
    
    useEffect(() => {
        fetchSession()
    }, [])
    

    return (
        <>        
            <h2 className={styles.h2}>Welcome to jobChaser{userName !== "" && `, ${userName}`}</h2>
            {isAuthorized ? <p className={styles.p}>Click the jobs category to start searching for jobs!</p> : <p className={styles.p}>Sign in to start searching for jobs!</p>}
        </>

    )
};
