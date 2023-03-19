import { keyToken, keyUser, linkApi, routerLinks } from '@utils';
import { AuthService } from '../services/user';
import { Message } from '@components';

const API = {
  init: () =>
    ({
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + (localStorage.getItem(keyToken) || ''),
        'Accept-Language': localStorage.getItem('i18nextLng') || '',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    } as RequestInit),
  responsible: async (
    url: string,
    params: { [key: string]: string } = {},
    config: RequestInit,
    headers: RequestInit['headers'] = {},
  ) => {
    config.headers = { ...config.headers, ...headers };

    const linkParam = Object.keys(params)
      .map(
        (key) =>
          key + '=' + encodeURIComponent(typeof params[key] === 'object' ? JSON.stringify(params[key]) : params[key]),
      )
      .join('&');
    const response = await fetch(linkApi + url + (linkParam && '?' + linkParam), config);
    const res = await response.json();
    if (response.ok) {
      return res;
    } else if (res.message) {
      await Message.error({ text: res.message });
    }

    if (url === `${routerLinks(AuthService.nameLink, 'api')}/refresh`) {
      return false;
    } else if (
      response.status === 401 &&
      url !== `${routerLinks(AuthService.nameLink, 'api')}/login` &&
      url !== `${routerLinks(AuthService.nameLink, 'api')}/logout`
    ) {
      const accessToken = await AuthService.refresh();
      if (accessToken) {
        config.headers = { ...config.headers, authorization: accessToken };
        const response = await fetch(linkApi + url + (linkParam && '?' + linkParam), config);
        return response.json();
      }
    }
    if (response.status === 401 && url !== `${routerLinks(AuthService.nameLink, 'api')}/login`) {
      localStorage.removeItem(keyUser);
      window.location.href = routerLinks('Login');
    }
    return false;
  },
  get: async (url: string, params = {}, headers?: RequestInit['headers']) => {
    return API.responsible(
      url,
      params,
      {
        ...API.init(),
        method: 'GET',
      },
      headers,
    );
  },
  post: (url: string, data = {}, params = {}, headers?: RequestInit['headers']) =>
    API.responsible(
      url,
      params,
      {
        ...API.init(),
        method: 'POST',
        body: JSON.stringify(data),
      },
      headers,
    ),
  put: (url: string, data = {}, params = {}, headers?: RequestInit['headers']) =>
    API.responsible(
      url,
      params,
      {
        ...API.init(),
        method: 'PUT',
        body: JSON.stringify(data),
      },
      headers,
    ),
  delete: async (url: string, params = {}, headers?: RequestInit['headers']) => {
    return API.responsible(
      url,
      params,
      {
        ...API.init(),
        method: 'DELETE',
      },
      headers,
    );
  },
};
export default API;
