import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
const Styling = lazy(() => import('./utils/init/styling'));
import AuthProvider from '@globalContext';
import { ConfigProvider } from 'antd';
import { Spin } from './components/spin';
import Router from '@routes/index';
import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import { reportWebVitals, serviceWorkerRegistration } from '@utils';

// linkApi,

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
