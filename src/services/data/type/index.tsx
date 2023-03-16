import { API, routerLinks } from '@utils';
import { Message } from '@components';

export const DataTypeService = {
  nameLink: 'DataType',
  get: () => API.get(routerLinks(DataTypeService.nameLink, 'api')),
  getById: async (id: string) => API.get(`${routerLinks(DataTypeService.nameLink, 'api')}/${id}`),
  post: async (values: any) => {
    const data = await API.post(routerLinks(DataTypeService.nameLink, 'api'), values);
    if (data.message) await Message.success({ text: data.message });
    return data;
  },
  put: async (values: any, id: string) => {
    delete values.code;
    const data = await API.put(`${routerLinks(DataTypeService.nameLink, 'api')}/${id}`, values);
    if (data.message) await Message.success({ text: data.message });
    return data;
  },
  delete: async (id: string) => {
    const data = await API.delete(`${routerLinks(DataTypeService.nameLink, 'api')}/${id}`);
    if (data.message) await Message.success({ text: data.message });
    return data;
  },
};
