import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",

 baseQuery: fetchBaseQuery({
  baseUrl: "http://localhost:4000/",
}),

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
    }),

    getProductById: builder.query({
  query: (id) => `products/${id}`,
}),

    registerUser: builder.mutation({
      query: (userData) => ({
        url: "users",
        method: "POST",
        body: userData,
      }),
    }),

    getUsers: builder.query({
      query: () => "users",
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useRegisterUserMutation,
  useGetUsersQuery,
} = api;