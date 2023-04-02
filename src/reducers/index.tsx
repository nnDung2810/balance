import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { userAction, userSlice } from './user';
import { roleAction, roleSlide } from './user/role';
import { codeSlide, codeAction } from './code';
import { codeTypeSlide, codeTypeAction } from './code/type';

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [roleSlide.name]: roleSlide.reducer,
  [codeSlide.name]: codeSlide.reducer,
  [codeTypeSlide.name]: codeTypeSlide.reducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

const useAppDispatch = () => useDispatch<ReturnType<typeof setupStore>['dispatch']>();
const useTypedSelector: TypedUseSelectorHook<ReturnType<typeof rootReducer>> = useSelector;

export {
  setupStore,
  useAppDispatch,
  useTypedSelector,
  userAction,
  userSlice,
  roleAction,
  roleSlide,
  codeSlide,
  codeAction,
  codeTypeSlide,
  codeTypeAction,
};
