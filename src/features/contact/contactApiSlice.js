import { apiSlice } from "../api/apiSlice";

export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: ({ status, page = 1, limit = 10 }) => ({
        url: "/contact",
        params: { status, page, limit },
      }),
      providesTags: ["Contact"],
    }),
    getContactById: builder.query({
      query: (id) => `/contacts/${id}`,
      providesTags: (result, error, id) => [{ type: "Contact", id }],
    }),
    updateContactStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/contacts/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Contact", id },
        "Contact",
      ],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactByIdQuery,
  useUpdateContactStatusMutation,
  useDeleteContactMutation,
} = contactApiSlice;
