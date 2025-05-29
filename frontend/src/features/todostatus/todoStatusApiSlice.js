import { apiSlice } from "../../app/api/apiSlice";

export const todoStatusApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchTodoStatuses: builder.query({
      query: () => "/api/todostatuses",
      keepUnusedDataFor: 60,
      providesTags: (result) =>
        result ? [{ type: "TodoStatus", id: "list" }] : [],
    }),

    fetchTodoStatusById: builder.query({
      query: (id) => `/api/todostatuses/${id}`,
    }),

    createTodoStatus: builder.mutation({
      query: (priority) => ({
        url: "/api/todostatuses",
        method: "POST",
        body: priority,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "TodoStatus", id: arg.id },
      ],
    }),

    updateTodoStatusById: builder.mutation({
      query: ({ id, priority }) => ({
        url: `/api/todostatuses/${id}`,
        method: "PUT",
        body: priority,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "TodoStatus", id: arg.id },
      ],
    }),

    patchTodoStatusById: builder.mutation({
      query: ({ id, ...priorityData }) => ({
        url: `/api/todostatuses/${id}`,
        method: "PATCH",
        body: priorityData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "TodoStatus", id: arg.id },
      ],
    }),

    deleteTodoStatusById: builder.mutation({
      query: (id) => ({
        url: `/api/todostatuses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "TodoStatus", id: arg },
      ],
    }),
  }),
});

export const {
  useFetchTodoStatusesQuery,
  useLazyFetchTodoStatusByIdQuery,
  useCreateTodoStatusMutation,
  useUpdateTodoStatusByIdMutation,
  usePatchTodoStatusByIdMutation,
  useDeleteTodoStatusByIdMutation,
} = todoStatusApiSlice;
