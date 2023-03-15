import axios from 'axios';

import { Message } from '@components';
import { routerLinks, keyRefreshToken, keyToken } from '@utils';

export const AuthService = {
  nameLink: 'Auth',
  login: async (values: any) => {
    const { data } = await axios.post(`${routerLinks(AuthService.nameLink, 'api')}/login`, values);
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
  profile: async () => {
    const { data } = await axios.get(`${routerLinks(AuthService.nameLink, 'api')}/profile`);
    return data;
  },
  logout: async () => await axios.get(`${routerLinks(AuthService.nameLink, 'api')}/logout`),
  refresh: async () => {
    const { data } = await axios.get(`${routerLinks(AuthService.nameLink, 'api')}/refresh`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(keyRefreshToken),
      },
    });
    if (data) {
      const { accessToken } = data.data;
      localStorage.setItem(keyToken, accessToken);
      axios.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
      return 'Bearer ' + accessToken;
    }
  },
};

export const UserService = {
  nameLink: 'User',
  get: async (params: any) => {
    const { data } = await axios.get(routerLinks(UserService.nameLink, 'api'), {
      params,
    });
    return data;
  },
  getById: async (id: string) => {
    const { data } = await axios.get(`${routerLinks(UserService.nameLink, 'api')}/${id}`);
    return data;
  },
  post: async (values: any) => {
    if (values.avatar) {
      values.avatar = values.avatar[0].url;
    }
    const { data } = await axios.post(routerLinks(UserService.nameLink, 'api'), values);
    if (data.message) Message.success({ text: data.message });
    return data;
  },
  put: async (values: any, id: string) => {
    if (values.avatar) {
      values.avatar = values.avatar[0].url;
    }
    const { data } = await axios.put(`${routerLinks(UserService.nameLink, 'api')}/${id}`, values);
    if (data.message) Message.success({ text: data.message });
    return data;
  },
  delete: async (id: string) => {
    const { data } = await axios.delete(`${routerLinks(UserService.nameLink, 'api')}/${id}`);
    if (data.message) Message.success({ text: data.message });
    return data;
  },
};
