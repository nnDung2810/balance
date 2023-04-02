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
  forgottenPassword: async (values: any) => {
    const data = await API.post(`${routerLinks(AuthService.nameLink, 'api')}/forgotten-password`, values);
    if (data) {
      if (data.message) Message.success({ text: data.message });
      return true;
    }
    return false;
  },
  resetPassword: async (values: any, token: string) => {
    const data = await API.post(`${routerLinks(AuthService.nameLink, 'api')}/reset-password`, values, {}, {authorization: 'Bearer ' + token});
    if (data) {
      if (data.message) Message.success({ text: data.message });
      return true;
    }
    return false;
  },
};
