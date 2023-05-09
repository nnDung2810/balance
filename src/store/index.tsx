import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { Action } from './action';
import { Slice, State } from './slice';
import { globalSlice, GlobalFacade, User } from './global';
import { userSlice, UserFacade } from './user';
import { userRoleSlice, UserRoleFacade, UserRole } from './user/role';
import { SupplierFacade, supplierSlice } from './supplier';
import { ProvinceFacade, provinceSlice } from './address/province';
import { DistrictFacade, districtSlice } from './address/district';
import { WardFacade, wardSlice } from './address/ward';

const rootReducer = combineReducers({
  [globalSlice.name]: globalSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [userRoleSlice.name]: userRoleSlice.reducer,
  [supplierSlice.name]: supplierSlice.reducer,
  [provinceSlice.name]: provinceSlice.reducer,
  [districtSlice.name]: districtSlice.reducer,
  [wardSlice.name]: wardSlice.reducer,
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
  ProvinceFacade,
  DistrictFacade,
  WardFacade,
  SupplierFacade,
}
export type { State };
