import { apiSlice } from "../../app/api/apiSlice";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchTask: builder.query({
      query: () => "/api/dashboard/task",
      providesTags: (result) =>
        result ? [{ type: "Dashboard", id: "list" }] : [],
    }),

    fetchTodo: builder.query({
      query: () => "/api/dashboard/todo",
      providesTags: (result) =>
        result ? [{ type: "Dashboard", id: "list" }] : [],
    }),
    fetchTaskByStatus: builder.query({
      query: () => "/api/dashboard/task-status",
      providesTags: (result) =>
        result ? [{ type: "Dashboard", id: "list" }] : [],
    }),
  }),
});

export const {
  useFetchTaskQuery,
  useFetchTodoQuery,
  useFetchTaskByStatusQuery,
} = dashboardApiSlice;
