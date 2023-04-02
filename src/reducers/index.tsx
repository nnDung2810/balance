import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

import userAction from './user/action';
import userSlice from './user/slice';
import roleAction from './role/action';
import roleSlide from './role/slice';


const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [roleSlide.name]: roleSlide.reducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

const useAppDispatch = () => useDispatch<ReturnType<typeof setupStore>['dispatch']>();
const useTypedSelector: TypedUseSelectorHook<ReturnType<typeof rootReducer>> = useSelector;


export { setupStore, useAppDispatch, useTypedSelector, userAction, userSlice, roleAction, roleSlide };

