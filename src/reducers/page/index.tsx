import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, covertChild, routerLinks } from '@utils';
import { Message } from '@components';
import Action from '../action';
import Slice from '../slice';

const action = new Action('Page');
export const pageAction = {
  ...action,
  putAll: createAsyncThunk(action.name + '/putAll', async (values: any) => {
    const data = await API.put(`${routerLinks(action.name, 'api')}/all`, {
      values: covertChild(values),
    });
    if (data.message) await Message.success({ text: data.message });
    return data;
  }),
};
const slice = new Slice(pageAction);
export const pageSlice = createSlice({ ...slice });
