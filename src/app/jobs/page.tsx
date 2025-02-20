"use client"

import React, { useContext, useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useGetJobsByTypeQuery } from "@/redux/jobtechApi";
import Joblist from "@/components/Joblist";
import Searchbar from "@/components/Searchbar";
import { AuthContext } from "@/context/AuthorizedContext";

import { setJobs, filter } from "@/redux/jobListSlice";


export default function JobsPage() {

    const authContext = useContext(AuthContext)

    if (!authContext) {
        throw new Error("AuthContext does not have a valid value")
    }

    const { isAuthorized } = authContext;

    if (!isAuthorized) {
        redirect("/");
    }
 
    const [ searchValue, setSearchValue ] = useState<string>("");

    const jobList = useAppSelector(state => state.jobList.jobList);
    const dispatch = useAppDispatch()
    
    const { data, error, isLoading } = useGetJobsByTypeQuery("programmerare");

    if (error) {
        console.error("Error fetching jobs");
    }

    useEffect(() => {
        
        if (data) {
            dispatch(setJobs(data.hits))
        }

    }, [data, dispatch])

    function handleSearch(e : (React.ChangeEvent<HTMLInputElement>) ) : void {
        setSearchValue(e.target.value);
        dispatch(filter(e.target.value))
    };

    function handleFilter(word : string) : void {

        if (word) {
            dispatch(filter(word))
        }
  }

  return  <>
              <Searchbar inputValue={searchValue} searchFunc={handleSearch} filterFunc={handleFilter} />
              <Joblist jobList={jobList} isLoading={isLoading}/>
          </>
};