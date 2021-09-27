import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const cryptoApiHeaders = {
  'x-rapidapi-host': process.env.REACT_APP_CRYPTO_API_HOST,
  'x-rapidapi-key': process.env.REACT_APP_CRYPTO_API_KEY,
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
