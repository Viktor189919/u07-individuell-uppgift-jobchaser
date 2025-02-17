"use client"

import React, { useContext, useState, useEffect, useRef } from "react";
import { redirect } from "next/navigation"
import Joblist from "@/components/Joblist";
import Searchbar from "@/components/Searchbar";
import { AuthContext } from "@/context/AuthorizedContext"
import { JobdataApi, JobsArray,  } from "@/types/jobTypes";

export default function JobsPage() {

    const authContext = useContext(AuthContext)

    if (!authContext) {
        throw new Error("AuthContext does not have a valid value")
    }

    const { isAuthorized } = authContext

    if (!isAuthorized) {
        redirect("/");
    }
 
  const origJobData = useRef<JobdataApi[]>([]);
  const [ jobDataList, setJobDataList ] = useState<JobdataApi[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ searchValue, setSearchValue ] = useState<string>("");



  useEffect(() => {
        console.log("UseEffect from joblist")
      async function fetchJobs() {
          console.log("fetch")

          const headers = {"Accept": "application/json"};
          const queryString = new URLSearchParams({q: "programmerare", limit: "20"}).toString();
          const url = `${"https://jobsearch.api.jobtechdev.se/search"}?${queryString}`;
          try {
              const response = await fetch(url, { headers });

              if (!response.ok) {
                  throw new Error("Error fetching jobdata");
              };

              const jobData = await response.json() as JobsArray;

              if (jobData) {
                  console.log(jobData.hits);
                  origJobData.current = jobData.hits; 
                  setJobDataList(jobData.hits);
              } else {
                  throw new Error("Error setting data");
              };
              
          } catch (error) {
              console.error(error);
          } finally {
              setLoading(false);
          };
      };

      fetchJobs();
  }, []);

  useEffect(() => {
      if (searchValue) {
          setJobDataList(origJobData.current.filter(job => { 
              return job.employer.name.toLowerCase().replace(" ", "").includes(searchValue.toLowerCase().replace(" ", ""))
              || job.headline.toLowerCase().replace(" ", "").includes(searchValue.toLowerCase().replace(" ", ""));
              }));
      } else {
          setJobDataList(origJobData.current);
      };
  }, [searchValue])

  function handleSearch(e : React.ChangeEvent<HTMLInputElement>) : void {
      setSearchValue(e.target.value);
  };

  return  <>
              <Searchbar inputValue={searchValue} searchFunc={handleSearch} />
              <Joblist jobList={jobDataList} isLoading={loading}/>
          </>
};