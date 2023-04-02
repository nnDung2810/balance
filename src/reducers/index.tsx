import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { globalSlice, globalAction } from './global';
import { userSlice, userAction } from './user';
import { userRoleSlice, userRoleAction } from './user/role';
import { codeSlice, codeAction } from './code';
import { codeTypeSlice, codeTypeAction } from './code/type';
import { dataSlice, dataAction } from './data';
import { dataTypeSlice, dataTypeAction } from './data/type';
import { pageSlice, pageAction } from './page';

const rootReducer = combineReducers({
  [globalSlice.name]: globalSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [userRoleSlice.name]: userRoleSlice.reducer,
  [codeSlice.name]: codeSlice.reducer,
  [codeTypeSlice.name]: codeTypeSlice.reducer,
  [dataSlice.name]: dataSlice.reducer,
  [dataTypeSlice.name]: dataTypeSlice.reducer,
  [pageSlice.name]: pageSlice.reducer,
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
  globalSlice,
  globalAction,
  userSlice,
  userAction,
  userRoleSlice,
  userRoleAction,
  codeSlice,
  codeAction,
  codeTypeSlice,
  codeTypeAction,
  dataSlice,
  dataAction,
  dataTypeSlice,
  dataTypeAction,
  pageSlice,
  pageAction,
};
