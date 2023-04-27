import { keyRefreshToken, keyToken, keyUser, linkApi, routerLinks } from '@utils';
import { Message } from '@components';
import { Responses } from '@models';



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
  responsible: async <T>(
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
    const response = await fetch(linkApi + url + (linkParam && '?' + linkParam + '&type=SUPPLIER'), config);
    // console.log("url",url);
    // console.log("config",config);
    
    const res: Responses<T> = await response.json();
    if (response.ok) {
      return res;
    } else if (res.message) {
      await Message.error({ text: res.message });
    }

    if (
      response.status === 401 &&
      url !== `${routerLinks('User-admin', 'api')}/refresh` &&
      url !== `${routerLinks('User-admin', 'api')}/sign-in` &&
      url !== `${routerLinks('User-admin', 'api')}/logout`
    ) {
      const accessToken = await API.refresh();
      if (accessToken) {
        config.headers = { ...config.headers, authorization: accessToken };
        const response = await fetch(linkApi + url + (linkParam && '?' + linkParam), config);
        return (await response.json()) as Responses<T>;
      }
    }
    if (response.status === 401 && url !== `${routerLinks('User-admin', 'api')}/sign-in`) {
      localStorage.removeItem(keyUser);
      window.location.href = routerLinks('Sign-in');
    }
    return {};
  },
  get: <T>(url: string, params = {}, headers?: RequestInit['headers']) =>
    API.responsible<T>(url, params, { ...API.init(), method: 'GET' }, headers),
  post: <T>(url: string, data = {}, params = {}, headers?: RequestInit['headers']) =>
    API.responsible<T>(url, params, { ...API.init(), method: 'POST', body: JSON.stringify(data) }, headers),
  put: <T>(url: string, data = {}, params = {}, headers?: RequestInit['headers']) =>
    API.responsible<T>(url, params, { ...API.init(), method: 'PUT', body: JSON.stringify(data) }, headers),
  delete: <T>(url: string, params = {}, headers?: RequestInit['headers']) =>
    API.responsible<T>(url, params, { ...API.init(), method: 'DELETE' }, headers),
  refresh: async () => {
    const res = await API.get<{ accessToken: string; refreshToken: null }>(
      `${routerLinks('User-admin', 'api')}/refresh`,
      {},
      { authorization: 'Bearer ' + localStorage.getItem(keyRefreshToken) },
    );
    if (res) {
      localStorage.setItem(keyToken, res.data!.accessToken);
      return 'Bearer ' + res.data!.accessToken;
    }
  },
};

export default API;
