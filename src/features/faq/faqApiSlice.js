import { apiSlice } from "../api/apiSlice";

export const faqApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query({
      query: ({ category, search, page = 1, limit = 10 }) => ({
        url: "/faqs",
        params: { category, search, page, limit },
      }),
      providesTags: ["FAQ"],
    }),
    getFaqById: builder.query({
      query: (id) => `/faqs/${id}`,
      providesTags: (result, error, id) => [{ type: "FAQ", id }],
    }),
    createFaq: builder.mutation({
      query: (faq) => ({
        url: "/faqs",
        method: "POST",
        body: faq,
      }),
      invalidatesTags: ["FAQ"],
    }),
    updateFaq: builder.mutation({
      query: ({ id, ...faq }) => ({
        url: `/faqs/${id}`,
        method: "PUT",
        body: faq,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "FAQ", id }, "FAQ"],
    }),
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/faqs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FAQ"],
    }),
  }),
});

export const {
  useGetFaqsQuery,
  useGetFaqByIdQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApiSlice;
