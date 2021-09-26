import { configureStore } from '@reduxjs/toolkit';

import { cryptoApi } from 'services/crypto';
import { cryptoNewsApi } from 'services/crypto-news';

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cryptoApi.middleware,
      cryptoNewsApi.middleware,
    ) 
});
