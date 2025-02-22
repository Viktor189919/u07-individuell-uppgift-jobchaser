"use client"

import React, { useContext } from "react";
import Image from "next/image"
import { JobProps } from "@/types/jobTypes"
import { ThemeContext } from "@/context/ThemeContext";
import styles from "@/components/Job/Job.module.css"

export default function Job({jobData} : JobProps) {

    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("Themecontext does not have a valid value")
    }

    const { darkTheme } = themeContext;

    const { employer, logo_url, headline } = jobData;

    const employerWebpage = !employer.url
                            ? "" 
                            : employer.url.startsWith("http") 
                            ? employer.url 
                            : `https://${employer.url}`

    return  <article className={styles.job} style={darkTheme ? {border: "solid 2px yellow"} : {}}>
                <Image className={styles.img} src={logo_url} width={300} height={300} alt={`${employer.name ? employer.name : "Company"} logo`} />
                <h2 className={styles.h2}>{employer.name ? employer.name : "Company name unavailable"}</h2>
                <p className={styles.p}>{headline ? headline : "Jobdescription unavailable"}</p>
                <a className={styles.a} href={employerWebpage} target="_blank">Visit homepage</a>
            </article>

}
