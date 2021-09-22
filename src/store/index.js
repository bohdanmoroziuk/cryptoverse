import { configureStore } from '@reduxjs/toolkit';

import { cryptoApi } from 'services/crypto';

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
});
