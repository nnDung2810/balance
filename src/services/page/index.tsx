import { Message } from '@components';
import { routerLinks, covertChild, API } from '@utils';

export const PageService = {
  nameLink: 'Page',
  get: (params: any) =>
    API.get(
      routerLinks(PageService.nameLink, 'api') +
        '?' +
        Object.keys(params)
          .map((key) => key + '=' + encodeURIComponent(params[key]))
          .join('&'),
    ),
  getById: async (id: string) => API.get(`${routerLinks(PageService.nameLink, 'api')}/${id}`),
  post: async (values: any) => {
    const data = await API.post(routerLinks(PageService.nameLink, 'api'), values);
    if (data.message) await Message.success({ text: data.message });
    return data;
  },
  put: async (values: any, id: string) => {
    const data = await API.put(`${routerLinks(PageService.nameLink, 'api')}/${id}`, values);
    if (data.message) await Message.success({ text: data.message });
    return data;
  },
  putAll: async (values: any) => {
    const data = await API.put(`${routerLinks(PageService.nameLink, 'api')}/all`, {
      values: covertChild(values),
    });
    if (data.message) await Message.success({ text: data.message });
    return data;
  },
  delete: async (id: string) => {
    const data = await API.delete(`${routerLinks(PageService.nameLink, 'api')}/${id}`);
    if (data.message) await Message.success({ text: data.message });
    return data;
  },
};
