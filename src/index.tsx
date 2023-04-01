import React, { lazy, Suspense } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import AuthProvider from '@globalContext';
import { Spin } from './components/spin';
import Router from '@routes/index';
import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import { reportWebVitals } from '@utils';
import { setupStore } from './redux/store';
import { Provider } from 'react-redux';

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
