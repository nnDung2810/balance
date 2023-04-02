import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';

import AuthProvider from '@globalContext';
import Router from '@routes/index';
import { reportWebVitals } from '@utils';
import { setupStore } from '@reducers';
import { Spin } from './components/spin';

const Styling = lazy(() => import('./utils/init/styling'));

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
const store = setupStore();
let container: any = null;
document.addEventListener('DOMContentLoaded', function () {
  if (!container) {
    container = document.getElementById('root') as HTMLElement;
    const root = createRoot(container);
    root.render(
      <Suspense
        fallback={
          <Spin>
            <div className="w-screen h-screen" />
          </Spin>
        }
      >
        <Styling>
          <AuthProvider>
            <Provider store={store}>
              <Router />
            </Provider>
          </AuthProvider>
        </Styling>
      </Suspense>,
    );
  }
});
reportWebVitals();
