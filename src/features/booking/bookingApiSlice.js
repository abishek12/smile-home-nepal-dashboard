import { apiSlice } from "../api/apiSlice";

export const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooking: builder.query({
      query: ({ search = "", page = 1, limit = 10, sortBy, sortOrder }) => ({
        url: "/services/booking/list",
        params: { q: search, page, limit, sortBy, sortOrder },
      }),
      providesTags: ["Booking"],
    }),
    getBookingById: builder.query({
      query: (id) => `/services/booking/${id}`,
      providesTags: (result, error, id) => [{ type: "Booking", id }],
    }),
  }),
});

export const { useGetBookingQuery, useGetBookingByIdQuery } = bookingApiSlice;
