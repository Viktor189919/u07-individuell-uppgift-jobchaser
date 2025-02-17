"use client"

import React, { useContext, CSSProperties } from "react"
import Job from "@/components/Job";
import { JoblistProps } from "@/types/jobTypes";
import ClipLoader from "react-spinners/ClipLoader";
import { ThemeContext } from "@/context/ThemeContext";
import { AuthContext } from "@/context/AuthorizedContext" 
import { redirect } from "next/navigation";
import styles from "@/components/Joblist/Joblist.module.css"

const override: CSSProperties = {
    alignSelf: "center",
}

export default function Joblist({jobList, isLoading} : JoblistProps) {

    const themeContext = useContext(ThemeContext);
    const authContext = useContext(AuthContext);

    if (!themeContext) {
        throw new Error("ThemeContext does not have a valid value");
    }

    if (!authContext) {
        throw new Error("AuthContext does not have a valid value");
    }

    const { darkTheme } = themeContext;
    const { isAuthorized } = authContext;

    if (!isAuthorized) {
        redirect("/");
    }


    const jobs = isLoading
                 ? <ClipLoader cssOverride={override} color={"goldenrod"} size={60}/>
                 :  jobList.length >= 1
                 ?  jobList.map(job => {
                        return <li className={styles.li} key={job.id}><Job jobData={job}/></li>
                    })
                 : <p className={styles.emptyText}>No jobs to display</p> 

    return <ul className={styles.joblist} style={darkTheme ? {backgroundColor: "darkgreen"} : {}}>{jobs}</ul>;
}
