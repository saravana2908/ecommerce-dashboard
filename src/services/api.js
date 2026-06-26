import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/authSlice";

// ── Base query with 401 interceptor ─────────────
const baseQueryWithAuth = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
  });

  const result = await baseQuery(args, api, extraOptions);

  // 401 → auto logout + redirect to login
  if (result?.error?.status === 401) {
    api.dispatch(logout());
    window.location.href = "/login";
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",

  baseQuery: baseQueryWithAuth,

  tagTypes: ["Users"],

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

  invalidatesTags: ["Users"],
}),

    getUsers: builder.query({
  query: () => "users",

  providesTags: ["Users"],
}),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useRegisterUserMutation,
  useGetUsersQuery,
} = api;