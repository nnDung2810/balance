import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from './reducers/users/slice';

const rootReducer = combineReducers({
  User: user.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootReducer = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
