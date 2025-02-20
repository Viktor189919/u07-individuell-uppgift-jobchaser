"use client"

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobtechApi = createApi({
    reducerPath: "jobtechApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://jobsearch.api.jobtechdev.se/search"}),
    endpoints: (builder) => ({
        getJobsByType: builder.query({
            query: (type) => `?q=${type}&limit=100`,
        })
    })
})

export const { useGetJobsByTypeQuery } = jobtechApi;
