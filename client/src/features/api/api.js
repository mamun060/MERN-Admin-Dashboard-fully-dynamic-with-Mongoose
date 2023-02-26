import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// create api
export const apiSlice = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL
    }),

    tagTypes: ["User" , ""],

    endpoints: (build) => ({
        getUser: build.query({
            query: (id)=> `general/user/${id}` ,
            providesTags: ["User"]
        }),

    }),
});


// export api as a hooks
export const { useGetUserQuery} = apiSlice;