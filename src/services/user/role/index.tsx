import { API, routerLinks } from '@utils';
import { Message } from '@components';

export const UserRoleService = {
  nameLink: 'UserRole',
  get: () => API.get(routerLinks(UserRoleService.nameLink, 'api')),
  getById: async (id: string) => API.get(`${routerLinks(UserRoleService.nameLink, 'api')}/${id}`),
  getPermission: async () => {
    const data = await API.get(`${routerLinks(UserRoleService.nameLink, 'api')}/permission`);
    return data;
  },
  post: async (values: any) => {
    const data = await API.post(routerLinks(UserRoleService.nameLink, 'api'), values);
    if (data.message) await Message.success({ text: data.message });
    return data;
  },
  put: async (values: any, id: string) => {
    const data = await API.put(`${routerLinks(UserRoleService.nameLink, 'api')}/${id}`, values);
    if (data.message) await Message.success({ text: data.message });
    return data;
  },
  delete: async (id: string) => {
    const data = await API.delete(`${routerLinks(UserRoleService.nameLink, 'api')}/${id}`);
    if (data.message) await Message.success({ text: data.message });
    return data;
  },
};
