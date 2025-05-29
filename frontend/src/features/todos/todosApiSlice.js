import { apiSlice } from "../../app/api/apiSlice";

export const todosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchTodos: builder.query({
      query: ({ page, limit, search }) =>
        `/api/todos?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
      keepUnusedDataFor: 60,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map((todo) => ({ type: "Todos", id: todo._id })),
              { type: "Todos", id: `${arg.page}-${arg.search}` },
            ]
          : [{ type: "Todos", id: `${arg.page}-${arg.search}` }],
    }),

    fetchTodosById: builder.query({
      query: (id) => `/api/todos/${id}`,
    }),

    createTodos: builder.mutation({
      query: (data) => ({
        url: "/api/todos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Todos", id: arg }],
    }),

    updateById: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/todos/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Todos", id: arg.id }],
    }),

    patchById: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/todos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Todos", id: arg.id }],
    }),

    deleteById: builder.mutation({
      query: (id) => ({
        url: `/api/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Todos", id: arg.id }],
    }),
  }),
});

export const {
  useFetchTodosQuery,
  useLazyFetchTodosByIdQuery,
  useCreateTodosMutation,
  useUpdateByIdMutation,
  usePatchByIdMutation,
  useDeleteByIdMutation,
} = todosApiSlice;
