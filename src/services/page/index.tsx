import axios from 'axios';

import { Message } from '@components';
import { routerLinks, covertChild } from '@utils';

export const PageService = {
  nameLink: 'Page',
  get: async () => {
    const { data } = await axios.get(routerLinks(PageService.nameLink, 'api'));
    return data;
  },
  getById: async (id: string) => {
    const { data } = await axios.get(`${routerLinks(PageService.nameLink, 'api')}/${id}`);
    return data;
  },
  post: async (values: any) => {
    const { data } = await axios.post(routerLinks(PageService.nameLink, 'api'), values);
    if (data.message) Message.success({ text: data.message });
    return data;
  },
  put: async (values: any, id: string) => {
    const { data } = await axios.put(`${routerLinks(PageService.nameLink, 'api')}/${id}`, values);
    if (data.message) Message.success({ text: data.message });
    return data;
  },
  putAll: async (values: any) => {
    const { data } = await axios.put(`${routerLinks(PageService.nameLink, 'api')}/all`, {
      values: covertChild(values),
    });
    if (data.message) Message.success({ text: data.message });
    return data;
  },
  delete: async (id: string) => {
    const { data } = await axios.delete(`${routerLinks(PageService.nameLink, 'api')}/${id}`);
    if (data.message) Message.success({ text: data.message });
    return data;
  },
};
