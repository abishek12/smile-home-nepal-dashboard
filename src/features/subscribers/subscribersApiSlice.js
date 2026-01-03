import { apiSlice } from "../api/apiSlice";

export const subscribersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubscribers: builder.query({
      query: ({ search, page = 1, limit = 10 }) => ({
        url: "/subscribers",
        params: { search, page, limit },
      }),
      providesTags: ["Subscribers"],
    }),
  }),
});

export const { useGetSubscribersQuery } = subscribersApiSlice;
