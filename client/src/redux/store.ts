import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from './features/wishlist/wishlistSlice';
import userReducer from './features/user/userSlice';
import bookReducer from './features/books/bookSlice';

import { api } from './api/apiSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
    wishlist: wishlistReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
