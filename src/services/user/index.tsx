import { Message } from '@components';
import { routerLinks, keyRefreshToken, keyToken, API } from '@utils';

export const AuthService = {
  nameLink: 'Auth',
  login: async (values: any) => {
    const data = await API.post(`${routerLinks(AuthService.nameLink, 'api')}/login`, values);
    if (data) {
      if (data.message) Message.success({ text: data.message });
      const { user, accessToken, refreshToken } = data.data;
      return {
        accessToken,
        refreshToken,
        ...user,
      };
    }
    return false;
  },
  profile: () => API.get(`${routerLinks(AuthService.nameLink, 'api')}/profile`),
  putProfile: async (values: any) => {
    if (values.avatar && typeof values.avatar === 'object') {
      values.avatar = values.avatar[0].url;
    }
    const { data } = await API.put(`${routerLinks(AuthService.nameLink, 'api')}/profile`, values);
    return data;
  },
  logout: () => API.get(`${routerLinks(AuthService.nameLink, 'api')}/logout`),
  refresh: async () => {
    const data = await API.get(
      `${routerLinks(AuthService.nameLink, 'api')}/refresh`,
      {},
      {
        authorization: 'Bearer ' + localStorage.getItem(keyRefreshToken),
      },
    );
    if (data) {
      const { accessToken } = data.data;
      localStorage.setItem(keyToken, accessToken);
      return 'Bearer ' + accessToken;
    }
  },
};

export const UserService = {
  nameLink: 'User',
  get: (params: any = {}) => API.get(routerLinks(UserService.nameLink, 'api'), params),
  getById: (id: string) => API.get(`${routerLinks(UserService.nameLink, 'api')}/${id}`),
  post: async (values: any) => {
    if (values.avatar) {
      values.avatar = values.avatar[0].url;
    }
    const data = await API.post(routerLinks(UserService.nameLink, 'api'), values);
    if (data.message) await Message.success({ text: data.message });
    return data;
  },
  put: async (values: any, id: string) => {
    if (values.avatar) {
      values.avatar = values.avatar[0].url;
    }
    const data = await API.put(`${routerLinks(UserService.nameLink, 'api')}/${id}`, values);
    if (data.message) await Message.success({ text: data.message });
    return data;
  },
  delete: async (id: string) => {
    const data = await API.delete(`${routerLinks(UserService.nameLink, 'api')}/${id}`);
    if (data.message) await Message.success({ text: data.message });
    return data;
  },
};
