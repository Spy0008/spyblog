import { configureStore , combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice.js';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducers = combineReducers({
  user: userReducer,
});

const persisCofig = {
  key: 'root',
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persisCofig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleare) => getDefaultMiddleare({
    serializableCheck: false
  }),
})

export const persistor = persistStore(store);