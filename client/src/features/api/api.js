import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// create api
export const apiSlice = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL
    }),

    tagTypes: [ 
        "user" , 
        "proucts",
        "ustomers",
        "transaction",
        "geography",
        
    ],

    endpoints: (build) => ({
        getUser: build.query({
            query: (id)=> `general/user/${id}` ,
            providesTags: ["user"]
        }),
        getProducts: build.query({
            query: () => "client/products",
            providesTags: ["proucts"]
        }),
        getCustomers: build.query({
            query: ()=> "client/customers",
            providesTags:["customers"]
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search })=> ({
                url: "client/transactions",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["transaction"]
        }),
        getGeography: build.query({
            query: ()=> "client/geography",
            providesTags: ["geography"]
        }),
        getSales: build.query({
            query: ()=> "sales/sales",
            providesTags: ["sales"]
        }),

    }),
});


// export api as a hooks
export const { 
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
    useGetSalesQuery
} = apiSlice;