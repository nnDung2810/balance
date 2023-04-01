import { createAsyncThunk } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import { Message } from '@components';

const name = 'User';
export default {
  name,
  get: createAsyncThunk(name + '/get', async (params: any = {}) => API.get(routerLinks(name, 'api'), params)),
  getById: createAsyncThunk(name + '/getById', async (id: string) => API.get(`${routerLinks(name, 'api')}/${id}`)),
  post: createAsyncThunk(name + '/post', async (values: any) => {
    if (values.avatar) {
      values.avatar = values.avatar[0].url;
    }
    const data = await API.post(routerLinks(name, 'api'), values);
    if (data.message) await Message.success({ text: data.message });
    return data;
  }),
  put: createAsyncThunk(name + '/put', async (values: any) => {
    const id = values.id;
    delete values.id;
    if (values.avatar) {
      values.avatar = values.avatar[0].url;
    }
    const data = await API.put(`${routerLinks(name, 'api')}/${id}`, values);
    if (data.message) await Message.success({ text: data.message });
    return data;
  }),
  delete: createAsyncThunk(name + '/delete', async (id: string) => {
    const data = await API.delete(`${routerLinks(name, 'api')}/${id}`);
    if (data.message) await Message.success({ text: data.message });
    return data;
  }),
};
