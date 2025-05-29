import { apiSlice } from "../../app/api/apiSlice";

export const priorityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchPriorities: builder.query({
      query: () => "/api/priorities",
      keepUnusedDataFor: 60,
      providesTags: (result) =>
        result ? [{ type: "Priority", id: "list" }] : [],
    }),

    fetchPriorityById: builder.query({
      query: (id) => `/api/priorities/${id}`,
    }),

    createPriority: builder.mutation({
      query: (priority) => ({
        url: "/api/priorities",
        method: "POST",
        body: priority,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Priority", id: arg.id },
      ],
    }),

    updatePriorityById: builder.mutation({
      query: ({ id, priority }) => ({
        url: `/api/priorities/${id}`,
        method: "PUT",
        body: priority,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Priority", id: arg.id },
      ],
    }),

    patchPriorityById: builder.mutation({
      query: ({ id, ...priorityData }) => ({
        url: `/api/priorities/${id}`,
        method: "PATCH",
        body: priorityData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Priority", id: arg.id },
      ],
    }),

    deletePriorityById: builder.mutation({
      query: (id) => ({
        url: `/api/priorities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Priority", id: arg }],
    }),
  }),
});

export const {
  useFetchPrioritiesQuery,
  useLazyFetchPriorityByIdQuery,
  useCreatePriorityMutation,
  useUpdatePriorityByIdMutation,
  usePatchPriorityByIdMutation,
  useDeletePriorityByIdMutation,
} = priorityApiSlice;
