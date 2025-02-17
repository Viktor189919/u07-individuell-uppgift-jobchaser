"use client"

import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import styles from "@/styles/HomePage.module.css"
import { AuthContext } from "@/context/AuthorizedContext";
import { UserNameContext } from "@/context/UserNameContext";

export default function HomePage() {

    const themeContext = useContext(ThemeContext)
    const authContext = useContext(AuthContext);
    const userNameContext = useContext(UserNameContext);

    if (!themeContext) {
        throw new Error("ThemeContext does not have a valid value")
    }

    if (!authContext) {
        throw new Error("AuthContext does not have a valid value")
    }

    if (!userNameContext) {
        throw new Error("UserNameContext does not have a valid value")
    }

    const { darkTheme } = themeContext
    const { isAuthorized } = authContext;
    const { userName } = userNameContext;

    console.log(userName)

    return (
        <>        
            <h2 className={styles.h2}>Welcome to jobChaser{userName !== "" && `, ${userName}`}</h2>
            {userName && <p>Click the jobs category to start searching for jobs!</p>}
        </>

    )
};
