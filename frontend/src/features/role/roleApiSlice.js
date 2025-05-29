import { apiSlice } from "../../app/api/apiSlice";

export const roleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchRoles: builder.query({
      query: () => "/api/roles",
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useFetchRolesQuery } = roleApiSlice;
