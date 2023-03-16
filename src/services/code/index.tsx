import { Message } from '@components';
import { API, routerLinks } from '@utils';

export const CodeService = {
  nameLink: 'Code',
  get: (params: any) =>
    API.get(
      routerLinks(CodeService.nameLink, 'api') +
        '?' +
        Object.keys(params)
          .map((key) => key + '=' + encodeURIComponent(params[key]))
          .join('&'),
    ),
  getById: async (id: string) => API.get(`${routerLinks(CodeService.nameLink, 'api')}/${id}`),
  post: async (values: any) => {
    const data = await API.post(routerLinks(CodeService.nameLink, 'api'), values);
    if (data.message) await Message.success({ text: data.message });
    return data;
  },
  put: async (values: any, id: string) => {
    const data = await API.put(`${routerLinks(CodeService.nameLink, 'api')}/${id}`, values);
    if (data.message) await Message.success({ text: data.message });
    return data;
  },
  delete: async (id: string) => {
    const data = await API.delete(`${routerLinks(CodeService.nameLink, 'api')}/${id}`);
    if (data.message) await Message.success({ text: data.message });
    return data;
  },
};
