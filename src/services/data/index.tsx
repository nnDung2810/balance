import axios from 'axios';

import { Message } from '@components';
import { routerLinks } from '@utils';

export const DataService = {
  nameLink: 'Data',
  get: async (params: any) => {
    const { data } = await axios.get(routerLinks(DataService.nameLink, 'api'), {
      params,
    });
    return data;
  },
  getById: async (id: string) => {
    const { data } = await axios.get(`${routerLinks(DataService.nameLink, 'api')}/${id}`);
    return data;
  },
  post: async (values: any) => {
    const { data } = await axios.post(routerLinks(DataService.nameLink, 'api'), values);
    if (data.message) Message.success({ text: data.message });
    return data;
  },
  put: async (values: any, id: string) => {
    const { data } = await axios.put(`${routerLinks(DataService.nameLink, 'api')}/${id}`, values);
    if (data.message) Message.success({ text: data.message });
    return data;
  },
  delete: async (id: string) => {
    const { data } = await axios.delete(`${routerLinks(DataService.nameLink, 'api')}/${id}`);
    if (data.message) Message.success({ text: data.message });
    return data;
  },
};
