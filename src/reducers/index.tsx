import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { globalSlice, GlobalFacade } from './global';
import { userSlice, UserFacade } from './user';
import { userRoleSlice, UserRoleFacade } from './user/role';
import { codeSlice, CodeFacade } from './code';
import { codeTypeSlice, CodeTypeFacade } from './code/type';
import { dataSlice, DataFacade } from './data';
import { dataTypeSlice, DataTypeFacade } from './data/type';
import { SupplierFacade, supplierSlice } from './supplier';
import { SupplierRoleFacade, supplierRoleSlice } from './supplier/province';
import { DistrictRoleFacade, districtRoleSlice } from './supplier/district';

const rootReducer = combineReducers({
  [globalSlice.name]: globalSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [userRoleSlice.name]: userRoleSlice.reducer,
  [codeSlice.name]: codeSlice.reducer,
  [codeTypeSlice.name]: codeTypeSlice.reducer,
  [dataSlice.name]: dataSlice.reducer,
  [dataTypeSlice.name]: dataTypeSlice.reducer,
  [supplierSlice.name]: supplierSlice.reducer,
  [supplierRoleSlice.name]: supplierRoleSlice.reducer,
  [districtRoleSlice.name]: districtRoleSlice.reducer,
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
  SupplierFacade,
  SupplierRoleFacade,
  DistrictRoleFacade,
};
