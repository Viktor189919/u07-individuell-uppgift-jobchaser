"use client"

import { useContext } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { redirect } from "next/navigation"
import { FormProps, FormInputs } from "@/types/formTypes"
import styles from "@/components/Form/Form.module.css"
import { AuthContext } from "@/context/AuthorizedContext"

export default function Form({ isSignup, authUser } : FormProps) {

    const authContext = useContext(AuthContext)

    if (!authContext) {
        throw new Error("AuthContext does not have a valid value")
    }

    const { isAuthorized } = authContext;

    const { register, handleSubmit, formState: {errors}} = useForm<FormInputs>()

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            authUser(data)
            console.log(isAuthorized)
        }catch (error) {
            console.error("Error", error)
        }    
        if (isSignup) {
            redirect("/signin")
        } else {
            setTimeout(() => {
                redirect("/")
            }, 1000)
        }
    }

    return ( 
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {isSignup && <fieldset  className={styles.fieldset}><label htmlFor="name-input">Name</label><input id="name-input" className={styles.input}  type="text" {...register("name", {required: true})}/></fieldset>}
            <fieldset className={styles.fieldset}>
            <label htmlFor="email-input">Email</label>
            <input className={styles.input} {...register("email", {required: true})} />
            </fieldset>
            <fieldset className={styles.fieldset}>
            <label htmlFor="password-input">Password</label>
            <input className={styles.input} id="password-input" type="password" {...register("password", {required: true})}/>
            </fieldset>
            <input className={styles.submitInput} type="submit" />
        </form>
    )
}   