import axios from 'axios';

import { routerLinks } from '@utils';
import { Message } from '@components';

export const CodeTypeService = {
  nameLink: 'CodeType',
  get: async (params?: any) => {
    const { data } = await axios.get(routerLinks(CodeTypeService.nameLink, 'api'), {
      params,
    });
    return data;
  },
  getById: async (code: string) => {
    const { data } = await axios.get(`${routerLinks(CodeTypeService.nameLink, 'api')}/${code}`);
    return data;
  },
  post: async (values: any) => {
    const { data } = await axios.post(routerLinks(CodeTypeService.nameLink, 'api'), values);
    if (data.message) Message.success({ text: data.message });
    return data;
  },
  put: async (values: any, id: string) => {
    delete values.code;
    const { data } = await axios.put(`${routerLinks(CodeTypeService.nameLink, 'api')}/${id}`, values);
    if (data.message) Message.success({ text: data.message });
    return data;
  },
  delete: async (id: string) => {
    const { data } = await axios.delete(`${routerLinks(CodeTypeService.nameLink, 'api')}/${id}`);
    if (data.message) Message.success({ text: data.message });
    return data;
  },
};
