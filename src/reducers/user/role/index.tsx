import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import Action from '../../action';
import Slice from '../../slice';
import { useAppDispatch, useTypedSelector } from '@reducers';

const name = 'UserRole';
export const action = {
  ...new Action(name),
  getPermission: createAsyncThunk(name + '/permission', async () => API.get(`${routerLinks(name, 'api')}/permission`)),
};
export const userRoleSlice = createSlice(new Slice(action, { keepUnusedDataFor: 9999 }));
export const UserRoleFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name]),
    set: (values: any) => dispatch(action.set(values)),
    get: (params = {}) => dispatch(action.get(params)),
    getById: (value: { id: string; keyState?: string }) => dispatch(action.getById(value)),
    post: (values: any) => dispatch(action.post(values)),
    put: (values: any) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
    getPermission: () => dispatch(action.getPermission()),
  };
};
