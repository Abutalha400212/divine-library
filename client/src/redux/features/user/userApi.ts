import { api } from '@/redux/api/apiSlice';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (user) => ({
        url: `/auth/signup`,
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: `/auth/login`,
        method: 'POST',
        body: user,
      }),
    }),
    getUser: builder.query({
      query: () => `/auth/get-user`,
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation, useGetUserQuery } = userApi;
