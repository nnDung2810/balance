import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import { Message } from '@components';
import Action from '../action';
import Slice from '../slice';
import { useAppDispatch, useTypedSelector } from '@reducers';

const name = 'User';
export const action = {
  ...new Action(name),
  post: createAsyncThunk(name + '/post', async (values: any) => {
    if (values.avatar) values.avatar = values.avatar[0].url;
    const data = await API.post(routerLinks(name, 'api'), values);
    if (data.message) await Message.success({ text: data.message });
    return data.data;
  }),
  put: createAsyncThunk(name + '/put', async ({ id, ...values }: any) => {
    if (values.avatar) values.avatar = values.avatar[0].url;
    const data = await API.put(`${routerLinks(name, 'api')}/${id}`, values);
    if (data.message) await Message.success({ text: data.message });
    return data.data;
  }),
};
export const userSlice = createSlice(new Slice(action));

export const UserFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state: any) => state[action.name]),
    set: (values: any) => dispatch(action.set(values)),
    get: (params = {}) => dispatch(action.get(params)),
    getById: (value: { id: string; keyState?: string }) => dispatch(action.getById(value)),
    post: (values: any) => dispatch(action.post(values)),
    put: (values: any) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};
