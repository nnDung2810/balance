import { API, routerLinks } from '@utils';
import { Message } from '@components';

export const CodeTypeService = {
  nameLink: 'CodeType',
  get: (params: any = {}) => API.get(routerLinks(CodeTypeService.nameLink, 'api'), params),
  getById: (id: string) => API.get(`${routerLinks(CodeTypeService.nameLink, 'api')}/${id}`),
  post: async (values: any) => {
    const data = await API.post(routerLinks(CodeTypeService.nameLink, 'api'), values);
    if (data.message) await Message.success({ text: data.message });
    return data;
  },
  put: async (values: any, id: string) => {
    delete values.code;
    const data = await API.put(`${routerLinks(CodeTypeService.nameLink, 'api')}/${id}`, values);
    if (data.message) await Message.success({ text: data.message });
    return data;
  },
  delete: async (id: string) => {
    const data = await API.delete(`${routerLinks(CodeTypeService.nameLink, 'api')}/${id}`);
    if (data.message) await Message.success({ text: data.message });
    return data;
  },
};
