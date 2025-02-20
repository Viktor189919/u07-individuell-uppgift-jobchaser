"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Jobdata } from "@/types/jobTypes"

type JobListState = {
    jobList : Jobdata[];
    origJobList : Jobdata[];
}

const initialState : JobListState = {
    jobList : [],
    origJobList : [],
}

const jobListSlice = createSlice({
    name: "jobList",
    initialState: initialState,

    reducers: {
        setJobs: (state, action : PayloadAction<Jobdata[]>) : void => {
            state.jobList = action.payload;
            state.origJobList = action.payload;
        },

        filter: (state, action : PayloadAction<string>) : void => {
            if (action.payload === "all") {
                state.jobList = state.origJobList;
            } else {
                state.jobList = state.origJobList.filter(job => {
                    return job.headline?.toLowerCase().includes(action.payload)
            })
            }
        } 
    }
})

export const { setJobs, filter } = jobListSlice.actions;

export default jobListSlice.reducer;