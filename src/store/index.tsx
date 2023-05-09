import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { Action } from './action';
import { Slice, State } from './slice';
import { globalSlice, GlobalFacade, User } from './global';
import { userSlice, UserFacade } from './user';
import { userRoleSlice, UserRoleFacade, UserRole } from './user/role';
import { StoreFacade, StoreManagement, storeSlice } from './store-management';
import { Province, ProvinceFacade, provinceSlice } from './address/province';
import { District, DistrictFacade, districtSlice } from './address/district';
import { Ward, WardFacade, wardSlice } from './address/ward';

const rootReducer = combineReducers({
  [globalSlice.name]: globalSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [userRoleSlice.name]: userRoleSlice.reducer,
  [storeSlice.name]: storeSlice.reducer,
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
  StoreManagement,
  Province,
  District,
  Ward,
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
};
export type { State };
