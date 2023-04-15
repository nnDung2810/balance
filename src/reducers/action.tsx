import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import { Message } from '@components';

export default class Action {
  name: string;
  set: AsyncThunk<string, object, object>;
  get: AsyncThunk<string, object, object>;
  getById: AsyncThunk<any, any, object>;
  post: AsyncThunk<string, object, object>;
  put: AsyncThunk<string, object, object>;
  delete: AsyncThunk<string, string, object>;
  constructor(name: string) {
    this.name = name;
    this.set = createAsyncThunk(name + '/set', async (values: any) => values);
    this.get = createAsyncThunk(
      name + '/get',
      async (params: any = {}) => await API.get(routerLinks(name, 'api'), params),
    );
    this.getById = createAsyncThunk(
      name + '/getById',
      async ({ id, keyState = 'isVisible' }: { id: string; keyState?: string }) => {
        const { data } = await API.get(`${routerLinks(name, 'api')}/${id}`);
        return { data, keyState };
      },
    );
    this.post = createAsyncThunk(name + '/post', async (values: any) => {
      const data = await API.post(routerLinks(name, 'api'), values);
      if (data.message) await Message.success({ text: data.message });
      return data;
    });
    this.put = createAsyncThunk(name + '/put', async ({ id, ...values }: any) => {
      const data = await API.put(`${routerLinks(name, 'api')}/${id}`, values);
      if (data.message) await Message.success({ text: data.message });
      return data;
    });
    this.delete = createAsyncThunk(name + '/delete', async (id: string) => {
      const data = await API.delete(`${routerLinks(name, 'api')}/${id}`);
      if (data.message) await Message.success({ text: data.message });
      return data;
    });
  }
}
