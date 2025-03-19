import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: ({ page, limit, search }) =>
        `/api/users?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
      keepUnusedDataFor: 60,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map((user) => ({ type: "User", id: user._id })),
              { type: "User", id: `${arg.page}-${arg.search}` },
            ]
          : [{ type: "User", id: `${arg.page}-${arg.search}` }],
    }),

    fetchUserList: builder.query({
      query: () => "/api/users/all",
      keepUnusedDataFor: 60,
    }),

    fetchUserById: builder.query({
      query: (userId) => `/api/users/${userId}`,
    }),

    createUser: builder.mutation({
      query: (user) => ({
        url: "/api/users/create",
        method: "POST",
        body: user,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),

    updateUser: builder.mutation({
      query: ({ id, user }) => ({
        url: `/api/users/update/${id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),

    patchUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/api/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useFetchUserListQuery,
  useLazyFetchUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  usePatchUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
