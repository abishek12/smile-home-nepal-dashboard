import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base API configuration
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  prepareHeaders: (headers, { getState }) => {
    // Get token from auth state
    const token = getState().auth.token;

    // If we have a token, include it in the headers
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// Base API slice with tag types for cache invalidation
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User", "Contact", "FAQ", "Services", "Subscribers"],
  endpoints: (builder) => ({}),
});
