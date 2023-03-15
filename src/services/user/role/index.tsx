import axios from 'axios';

import { routerLinks } from '@utils';
import { Message } from '@components';

export const UserRoleService = {
  nameLink: 'UserRole',
  get: async (params?: any) => {
    const { data } = await axios.get(routerLinks(UserRoleService.nameLink, 'api'), {
      params,
    });
    return data;
  },
  getById: async (id: string) => {
    const { data } = await axios.get(`${routerLinks(UserRoleService.nameLink, 'api')}/${id}`);
    return data;
  },
  getPermission: async () => {
    const { data } = await axios.get(`${routerLinks(UserRoleService.nameLink, 'api')}/permission`);
    return data;
  },
  post: async (values: any) => {
    const { data } = await axios.post(routerLinks(UserRoleService.nameLink, 'api'), values);
    if (data.message) Message.success({ text: data.message });
    return data;
  },
  put: async (values: any, id: string) => {
    const { data } = await axios.put(`${routerLinks(UserRoleService.nameLink, 'api')}/${id}`, values);
    if (data.message) Message.success({ text: data.message });
    return data;
  },
  delete: async (id: string) => {
    const { data } = await axios.delete(`${routerLinks(UserRoleService.nameLink, 'api')}/${id}`);
    if (data.message) Message.success({ text: data.message });
    return data;
  },
};
