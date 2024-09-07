import { getServerURL } from '@/config/ENV.config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const requestHeaders: HeadersInit = new Headers();
requestHeaders.set('Content-Type', 'application/json');
requestHeaders.set('authorization', `bearer ${localStorage.getItem('token')}`);
export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['books'],
  baseQuery: fetchBaseQuery({
    baseUrl: getServerURL(),
    headers: requestHeaders,
  }),
  endpoints: () => ({}),
});
