import axios from 'axios';

import { routerLinks } from '@utils';
import { Message } from '@components';

export const DataTypeService = {
  nameLink: 'DataType',
  get: async (params?: any) => {
    const { data } = await axios.get(routerLinks(DataTypeService.nameLink, 'api'), {
      params,
    });
    return data;
  },
  getById: async (code: string) => {
    const { data } = await axios.get(`${routerLinks(DataTypeService.nameLink, 'api')}/${code}`);
    return data;
  },
  post: async (values: any) => {
    const { data } = await axios.post(routerLinks(DataTypeService.nameLink, 'api'), values);
    if (data.message) Message.success({ text: data.message });
    return data;
  },
  put: async (values: any, id: string) => {
    delete values.code;
    const { data } = await axios.put(`${routerLinks(DataTypeService.nameLink, 'api')}/${id}`, values);
    if (data.message) Message.success({ text: data.message });
    return data;
  },
  delete: async (id: string) => {
    const { data } = await axios.delete(`${routerLinks(DataTypeService.nameLink, 'api')}/${id}`);
    if (data.message) Message.success({ text: data.message });
    return data;
  },
};
