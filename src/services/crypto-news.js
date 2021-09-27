import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const cryptoNewsApiHeaders = {
  'x-bingapis-sdk': 'true',
  'x-rapidapi-host': process.env.REACT_APP_CRYPTO_NEWS_API_HOST,
  'x-rapidapi-key': process.env.REACT_APP_CRYPTO_NEWS_API_KEY,
};

const createRequest = (url) => ({
  url,
  headers: cryptoNewsApiHeaders,
});

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ count, category }) => createRequest(`/news/search?q=${category}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
      transformResponse: (response) => response?.value ?? [],
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
