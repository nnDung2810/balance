import { Message } from '@components';
import { API, routerLinks } from '@utils';

export const DataService = {
  nameLink: 'Data',
  get: (params: any = {}) => API.get(routerLinks(DataService.nameLink, 'api'), params),
  getById: (id: string) => API.get(`${routerLinks(DataService.nameLink, 'api')}/${id}`),
  post: async (values: any) => {
    const data = await API.post(routerLinks(DataService.nameLink, 'api'), values);
    if (data.message) await Message.success({ text: data.message });
    return data;
  },
  put: async (values: any, id: string) => {
    const data = await API.put(`${routerLinks(DataService.nameLink, 'api')}/${id}`, values);
    if (data.message) await Message.success({ text: data.message });
    return data;
  },
  delete: async (id: string) => {
    const data = await API.delete(`${routerLinks(DataService.nameLink, 'api')}/${id}`);
    if (data.message) await Message.success({ text: data.message });
    return data;
  },
};
