import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
const Styling = lazy(() => import('./utils/init/styling'));
import AuthProvider from '@globalContext';
import { ConfigProvider } from 'antd';
import { Spin, Message } from '@components';
import Router from '@routes/index';
import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import axios from 'axios';
import { reportWebVitals, serviceWorkerRegistration, routerLinks, keyToken, keyUser } from '@utils';
import { AuthService } from '@services';

// linkApi,

axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem(keyToken);
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      (!!error?.response && !!error?.response?.data?.errors && error?.response?.data?.errors === 401) ||
      error?.response?.status === 401
    ) {
      if (error.response.config.url !== '/auth/refresh' && error.response.config.url !== '/auth/login') {
        const originalRequest = error.config;
        const accessToken = await AuthService.refresh();
        if (accessToken) {
          originalRequest.headers.Authorization = accessToken;
          await axios(originalRequest);
          return window.location.reload();
        }
      }
      localStorage.removeItem(keyUser);
      if (error.response.config.url !== '/auth/login') {
        window.location.href = routerLinks('Login');
      }
    }

    if (error?.response?.data?.message) {
      Message.error({ text: error?.response?.data?.message });
    }
    return false;
  },
);

const fallbackLng = localStorage.getItem('i18nextLng');
if (!fallbackLng) {
  localStorage.setItem('i18nextLng', 'en');
}
i18n
  .use(XHR)
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: fallbackLng || 'en',
    interpolation: {
      escapeValue: false,
    },
  });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Suspense
    fallback={
      <Spin>
        <div className="w-screen h-screen" />
      </Spin>
    }
  >
    <Styling>
      <AuthProvider>
        <ConfigProvider
          theme={{
            token: {
              fontFamily:
                'Google Sans, -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif',
            },
          }}
        >
          <Router />
        </ConfigProvider>
      </AuthProvider>
    </Styling>
  </Suspense>,
);
serviceWorkerRegistration.register();

reportWebVitals();
