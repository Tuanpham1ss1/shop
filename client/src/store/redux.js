import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import productSlide from './products/productSlide';
import userSlide from './user/userSlide';
import storage from 'redux-persist/lib/storage'
import {persistReducer,persistStore,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER,} from 'redux-persist'

const commonConfig = {
  key: 'shop/user',
  storage
}
const userConfig = {
  ...commonConfig,
  whitelist: ['isLoggedIn','token','current']
}
export const store = configureStore({
  reducer: {
    app : appSlice,
    products : productSlide,
    user: persistReducer(userConfig,userSlide)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export const persistor= persistStore(store)