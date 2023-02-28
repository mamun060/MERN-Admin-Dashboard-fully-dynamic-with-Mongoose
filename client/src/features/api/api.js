import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// create api
export const apiSlice = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL
    }),

    tagTypes: [ 
        "User" , 
        "Proucts",
        "customers",
    ],

    endpoints: (build) => ({
        getUser: build.query({
            query: (id)=> `general/user/${id}` ,
            providesTags: ["User"]
        }),
        getProducts: build.query({
            query: () => "client/products",
            providesTags: ["Proucts"]
        }),
        getCustomers: build.query({
            query: ()=> "client/customers",
            providesTags:["customers"]
        }),
    }),
});


// export api as a hooks
export const { 
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery
} = apiSlice;