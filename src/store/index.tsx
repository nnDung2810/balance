import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// import { globalSlice, GlobalFacade } from './global';
import { Action } from './action';
import { Slice, State } from './slice';
import { globalSlice, GlobalFacade, User } from './global';
import { userSlice, UserFacade } from './user';
// import { userRoleSlice, UserRoleFacade } from './user/role';
import { userRoleSlice, UserRoleFacade, UserRole } from './user/role';
import { StoreFacade, storeSlice } from './store-management';
import { SupplierFacade, supplierSlice } from './supplier';
// import { SupplierRoleFacade, supplierRoleSlice } from './supplier/province';
import { ProvinceFacade, provinceSlice } from './address/province';
import { DistrictFacade, districtSlice } from './address/district';
import { WardFacade, wardSlice } from './address/ward';

const rootReducer = combineReducers({
  [globalSlice.name]: globalSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [userRoleSlice.name]: userRoleSlice.reducer,
  [storeSlice.name]: storeSlice.reducer,
  [provinceSlice.name]: provinceSlice.reducer,
  [districtSlice.name]: districtSlice.reducer,
  [wardSlice.name]: wardSlice.reducer,
  [supplierSlice.name]: supplierSlice.reducer,
  // [supplierRoleSlice.name]: supplierRoleSlice.reducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

const useAppDispatch = () => useDispatch<ReturnType<typeof setupStore>['dispatch']>();
const useTypedSelector: TypedUseSelectorHook<ReturnType<typeof rootReducer>> = useSelector;

export {
  Action,
  Slice,
  User,
  UserRole,
  setupStore,
  useAppDispatch,
  useTypedSelector,
  GlobalFacade,
  UserFacade,
  UserRoleFacade,
  StoreFacade,
  ProvinceFacade,
  DistrictFacade,
  WardFacade,
  SupplierFacade,
  // SupplierRoleFacade,
};
export type { State };