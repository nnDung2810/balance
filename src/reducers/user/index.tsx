import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import { Message } from '@components';
import Action from '../action';
import Slice from '../slice';

const action = new Action('User');
export const userAction = {
  ...action,
  post: createAsyncThunk(action.name + '/post', async (values: any) => {
    if (values.avatar) {
      values.avatar = values.avatar[0].url;
    }
    const data = await API.post(routerLinks(action.name, 'api'), values);
    if (data.message) await Message.success({ text: data.message });
    return data;
  }),
  put: createAsyncThunk(action.name + '/put', async (values: any) => {
    const id = values.id;
    delete values.id;
    if (values.avatar) {
      values.avatar = values.avatar[0].url;
    }
    const data = await API.put(`${routerLinks(action.name, 'api')}/${id}`, values);
    if (data.message) await Message.success({ text: data.message });
    return data;
  }),
};
const slice = new Slice(userAction);
export const userSlice = createSlice({ ...slice });
