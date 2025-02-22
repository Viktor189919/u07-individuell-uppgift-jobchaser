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
            {isSignup && 
                <fieldset  className={styles.fieldset}>
                    <label htmlFor="nameInput">Name</label>
                    <input className={styles.input}
                        id="nameInput"  
                        {...register("name", 
                            {required: "Name is required",
                                pattern: {
                                    value: /[a-öA-Ö]/,
                                    message: "Name can only contain letters a-ö",
                    }})} />
                    {errors.name && <p className={styles.fieldErrorMsg}>{errors.name.message}</p>}
                </fieldset>}
            
            <fieldset className={styles.fieldset}>
                <label htmlFor="emailInput">Email</label>
                <input className={styles.input} 
                    id="emailInput"
                    {...register("email", 
                        {required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email format",
                }})} />
                {errors.email && <p className={styles.fieldErrorMsg}>{errors.email.message}</p>}
            </fieldset>

            <fieldset className={styles.fieldset}>
                <label htmlFor="passwordInput">Password</label>
                <input className={styles.input} 
                    id="passwordInput" 
                    {...register("password", 
                        {required: "Password is required", 
                            minLength: {
                                value: 6, 
                                message: "Password must be at least 6 characters"
                }})}/>
                {errors.password && <p className={styles.fieldErrorMsg}>{errors.password.message}</p>}
            </fieldset>
            <input className={styles.submitInput} type="submit" />
        </form>
    )
}   