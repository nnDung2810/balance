import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import Action from '../../action';
import Slice from '../../slice';

const action = new Action('UserRole');
export const roleAction = {
  ...action,
  getPermission: createAsyncThunk(action.name + '/permission', async () =>
    API.get(`${routerLinks(action.name, 'api')}/permission`),
  ),
};
const slice = new Slice(roleAction, { keepUnusedDataFor: 9999 });
export const roleSlide = createSlice({ ...slice });
