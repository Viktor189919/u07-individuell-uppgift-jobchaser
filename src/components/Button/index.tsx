"use client"

import { ButtonProps } from "@/types/buttonTypes"
import styles from "@/components/Button/Button.module.css"


export default function Button({clickFunc, btnText} : ButtonProps) {
    return <button className={styles.button} onClick={(btnText) => clickFunc(btnText)}>{btnText}</button>
}