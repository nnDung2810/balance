import { keyToken, keyUser, routerLinks } from '@utils';
import { AuthService } from '@services';
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
  get: async (url: string, headers?: RequestInit['headers']) => {
    return API.responsible(
      url,
      {
        ...API.init(),
        method: 'GET',
      },
      headers,
    );
  },
  post: (url: string, data = {}, headers?: RequestInit['headers']) =>
    API.responsible(
      url,
      {
        ...API.init(),
        method: 'POST',
        body: JSON.stringify(data),
      },
      headers,
    ),
  put: (url: string, data = {}, headers?: RequestInit['headers']) =>
    API.responsible(
      url,
      {
        ...API.init(),
        method: 'PUT',
        body: JSON.stringify(data),
      },
      headers,
    ),
  delete: async (url: string, headers?: RequestInit['headers']) => {
    return API.responsible(
      url,
      {
        ...API.init(),
        method: 'DELETE',
      },
      headers,
    );
  },
  responsible: async (url: string, config: RequestInit, headers?: RequestInit['headers']) => {
    if (headers) {
      config.headers = { ...config.headers, ...headers };
    }
    const response = await fetch('http://localhost:3000/api' + url, config);
    if (response.ok) {
      return response.json();
    }
    const res = await response.json();
    if (res.message) {
      await Message.error({ text: res.message });
    }
    if (
      response.status === 401 &&
      url !== `${routerLinks(AuthService.nameLink, 'api')}/login` &&
      url !== `${routerLinks(AuthService.nameLink, 'api')}/logout`
    ) {
      const accessToken = await AuthService.refresh();
      if (accessToken) {
        config.headers = { ...config.headers, Authorization: accessToken };
        const response = await fetch('http://localhost:3000/api' + url, config);
        return response.json();
      }
    }
    localStorage.removeItem(keyUser);
    if (url !== `${routerLinks(AuthService.nameLink, 'api')}/login`) {
      window.location.href = routerLinks('Login');
    }
    return false;
  },
};
export default API;
