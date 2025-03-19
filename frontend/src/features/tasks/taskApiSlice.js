import { apiSlice } from "../../app/api/apiSlice";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchTasks: builder.query({
      query: ({ page, limit, search }) =>
        `/api/tasks?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
      keepUnusedDataFor: 60,
      providesTags: (result, error, arg) =>
        result && result.tasks
          ? [
              ...result.tasks.map((task) => ({ type: "Task", id: task._id })),
              { type: "Task", id: `${arg.page}-${arg.search}` },
            ]
          : [{ type: "Task", id: `${arg.page}-${arg.search}` }],
    }),

    fetchTaskById: builder.query({
      query: (Id) => `/api/tasks/${Id}`,
    }),

    getAllTaskByStatus: builder.query({
      query: () => "/api/tasks/without-todos",
      keepUnusedDataFor: 60,
    }),

    createTask: builder.mutation({
      query: (task) => ({
        url: "/api/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Task", id: arg }],
    }),

    updateTaskById: builder.mutation({
      query: ({ id, ...task }) => ({
        url: `/api/tasks/${id}`,
        method: "PUT",
        body: task,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Task", id: arg.id }],
    }),

    patchTaskById: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Task", id: arg.id }],
    }),

    deleteTaskById: builder.mutation({
      query: (id) => ({
        url: `/api/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Task", id: arg.id }],
    }),
  }),
});

export const {
  useFetchTasksQuery,
  useLazyFetchTaskByIdQuery,
  useGetAllTaskByStatusQuery,
  useCreateTaskMutation,
  useUpdateTaskByIdMutation,
  usePatchTaskByIdMutation,
  useDeleteTaskByIdMutation,
} = taskApiSlice;
