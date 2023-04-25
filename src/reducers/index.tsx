import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { globalSlice, GlobalFacade } from './global';
import { userSlice, UserFacade } from './user';
import { userRoleSlice, UserRoleFacade } from './user/role';
import { codeSlice, CodeFacade } from './code';
import { codeTypeSlice, CodeTypeFacade } from './code/type';
import { dataSlice, DataFacade } from './data';
import { dataTypeSlice, DataTypeFacade } from './data/type';
import { StoreFacade, storeSlice } from './store-management';
import { SupplierFacade, supplierSlice } from './supplier';
import { SupplierRoleFacade, supplierRoleSlice } from './supplier/province';

const rootReducer = combineReducers({
  [globalSlice.name]: globalSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [userRoleSlice.name]: userRoleSlice.reducer,
  [codeSlice.name]: codeSlice.reducer,
  [codeTypeSlice.name]: codeTypeSlice.reducer,
  [dataSlice.name]: dataSlice.reducer,
  [dataTypeSlice.name]: dataTypeSlice.reducer,
  [storeSlice.name]: storeSlice.reducer,
  [supplierSlice.name]: supplierSlice.reducer,
  [supplierRoleSlice.name]: supplierRoleSlice.reducer,
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
  GlobalFacade,
  UserFacade,
  UserRoleFacade,
  CodeFacade,
  CodeTypeFacade,
  DataFacade,
  DataTypeFacade,
  StoreFacade,
  SupplierFacade,
  SupplierRoleFacade,
};
