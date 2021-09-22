import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': 'd9a4563636mshbc810a92d67b5dfp1b08bdjsn4b3c84703a73'
};

const createRequest = (url) => ({
  url,
  headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest('/coins'),
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
