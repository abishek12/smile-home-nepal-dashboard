import { apiSlice } from "../api/apiSlice";

export const serviceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: ({ category, search, page = 1, limit = 10 }) => ({
        url: "/services",
        params: { category, search, page, limit },
      }),
      providesTags: ["Service"],
    }),
    getServiceById: builder.query({
      query: (id) => `/services/${id}`,
      providesTags: (result, error, id) => [{ type: "Service", id }],
    }),
    createService: builder.mutation({
      query: (service) => ({
        url: "/services",
        method: "POST",
        body: service,
      }),
      invalidatesTags: ["Service"],
    }),
    updateService: builder.mutation({
      query: ({ id, ...services }) => ({
        url: `/services/${id}`,
        method: "PUT",
        body: services,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Service", id },
        "Service",
      ],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApiSlice;
