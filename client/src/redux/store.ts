import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import appReducer from './appSlice';

const reducers = combineReducers({
  app: appReducer,
});

const persistConfig = {
  key: 'app',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
