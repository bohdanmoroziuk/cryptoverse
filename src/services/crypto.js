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
      query: ({ count }) => createRequest(`/coins?limit=${count}`),
      transformResponse: (response) => ({
        coins: response?.data?.coins ?? [],
        stats: response?.data?.stats ?? {},
      }),
    }),
    getCrypto: builder.query({
      query: ({ id }) => createRequest(`/coin/${id}`),
      transformResponse: (response) => response?.data?.coin ?? {},
    }),
    getCryptoHistory: builder.query({
      query: ({ id, timePeriod }) => createRequest(`/coin/${id}/history/${timePeriod}`),
      transformResponse: (response) => response?.data?.history ?? [],
    }),
    getExchanges: builder.query({
      query: () => createRequest('/exchanges'),
      transformResponse: (response) => response?.data?.exchanges ?? [],
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoQuery,
  useGetCryptoHistoryQuery,
  useGetExchangesQuery,
} = cryptoApi;
