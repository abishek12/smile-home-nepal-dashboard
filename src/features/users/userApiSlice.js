import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ search, page = 1, limit = 10 }) => ({
        url: "/users",
        params: { search, page, limit },
      }),
      providesTags: ["User"],
    }),
    createAdmin: builder.mutation({
      query: (service) => ({
        url: "/users/register-admin",
        method: "POST",
        body: service,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateAdminMutation,
  useDeleteUserMutation,
} = userApiSlice;
