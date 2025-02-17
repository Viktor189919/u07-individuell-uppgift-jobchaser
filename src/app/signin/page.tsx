"use client"
import { useContext } from "react"
import Form from "@/components/Form"
import { AuthContext } from "@/context/AuthorizedContext"
import styles from "@/styles/SigninPage.module.css"

export default function SignInPage() {

    const authContext = useContext(AuthContext)

    if (!authContext) {
        throw new Error("AuthContext does not have a valid value")
    }

    const { isAuthorized, login } = authContext;
    console.log(isAuthorized)

    return(
        <>
            <h2 className={styles.h2}>Enter your information to sign in</h2>
            <Form isSignup={false} authUser={login}/>
        </>
    )
}