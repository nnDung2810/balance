import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import Action from '../../action';
import Slice from '../../slice';

const action = new Action('UserRole');
export const userRoleAction = {
  ...action,
  getPermission: createAsyncThunk(action.name + '/permission', async () =>
    API.get(`${routerLinks(action.name, 'api')}/permission`),
  ),
};
const slice = new Slice(userRoleAction, { keepUnusedDataFor: 9999 });
export const userRoleSlice = createSlice({ ...slice });
