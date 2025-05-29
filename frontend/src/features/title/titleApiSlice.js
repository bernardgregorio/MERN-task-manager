import { apiSlice } from "../../app/api/apiSlice";

export const titleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchTitles: builder.query({
      query: () => "/api/titles",
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useFetchTitlesQuery } = titleApiSlice;
