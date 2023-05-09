import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { Spin } from '@core/spin';
import { keyUser, routerLinks } from '@utils';
import { useTranslation } from 'react-i18next';
import { GlobalFacade } from '@store';

const pages = [
  {
    layout: React.lazy(() => import('@layouts/auth')),
    isPublic: true,
    child: [
      {
        path: '/',
        component: routerLinks('Dashboard'),
      },
      {
        path: routerLinks('Login'),
        component: React.lazy(() => import('@pages/auth/login')),
        title: 'Login',
      },
      {
        path: routerLinks('ForgetPassword'),
        component: React.lazy(() => import('@pages/auth/forget-password')),
        title: 'Quên Mật Khẩu',
      },
      {
        path: routerLinks('VerifyForotPassword'),
        component: React.lazy(() => import('@pages/auth/forget-password/otp')),
        title: 'Quên Mật Khẩu',
      },
      {
        path: routerLinks('SetPassword'),
        component: React.lazy(() => import('@pages/auth/forget-password/otp/setPassword')),
        title: 'Đặt Lại Mật Khẩu',
      },
    ],
  },
  {
    layout: React.lazy(() => import('@layouts/admin')),
    isPublic: false,
    child: [
      {
        path: routerLinks('MyProfile'),
        component: React.lazy(() => import('@pages/admin/my-profile')),
        title: 'MyProfile',
      },
      {
        path: routerLinks('Dashboard'),
        component: React.lazy(() => import('@pages/admin/dashboard')),
        title: 'Dashboard',
      },
      {
        path: routerLinks('Supplier'),
        component: React.lazy(() => import('@pages/admin/supplier')),
        title: 'Supplier',
      },
      {
        path: routerLinks('Supplier/Add'),
        component: React.lazy(() => import('@pages/admin/supplier/add')),
        title: 'Supplier/Add',
      },
      {
        path: routerLinks('User/List'),
        component: React.lazy(() => import('@pages/admin/user')),
        title: 'User/List',
      },
      {
        path: routerLinks('User/Add'),
        component: React.lazy(() => import('@pages/admin/user/add')),
        title: 'User/Add',
      },
      {
        path: routerLinks('User') + '/:id',
        component: React.lazy(() => import('@pages/admin/user/add')),
        title: 'User/Edit',
      },
      {
        path: routerLinks('Store'),
        component: React.lazy(() => import('@pages/admin/store')),
        title: 'Store',
      },
      {
        path: routerLinks('store-managerment/create'),
        component: React.lazy(() => import('@pages/admin/store/add')),
        title: 'store-managerment/create',
      },
      {
        path: routerLinks('store-managerment/edit') + '/:id',
        component: React.lazy(() => import('@pages/admin/store/edit')),
        title: 'store-managerment/edit',
      },
      {
        path: routerLinks('User/Edit') + '/:id',
        component: React.lazy(() => import('@pages/admin/user/edit')),
        title: 'User/Edit',
      },
    ], // 💬 generate link to here
  },
];

const Layout = ({ layout: Layout, isPublic = false }: {
  layout: React.LazyExoticComponent<({ children }: { children?: React.ReactNode }) => JSX.Element>;
  isPublic: boolean;
}) => {
  const { user } = GlobalFacade();
  // if (isPublic === true || !!user?.email || !!JSON.parse(localStorage.getItem(keyUser) || '{}')?.email)
  if (isPublic || !!user?.email || !!JSON.parse(localStorage.getItem(keyUser) || '{}')?.email)
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  return <Navigate to={routerLinks('Login')} />;
};

const Page = ({
  title = '',
  component: Comp,
}: {
  title: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
}) => {
  const { t } = useTranslation();
  const globalFacade = GlobalFacade();

  useEffect(() => {
    document.title = t('pages.' + title || '');
    globalFacade.set({ title });
  }, [title]);
  return <Comp />;
};
const Pages = () => (
  <BrowserRouter>
    <Routes>
      {pages.map(({ layout, isPublic, child }, index) => (
        <Route key={index} element={<Layout layout={layout} isPublic={isPublic} />}>
          {child.map(({ path = '', title = '', component }, subIndex: number) => (
            <Route
              key={path + subIndex}
              path={path}
              element={
                <Suspense
                  fallback={
                    <Spin>
                      <div className="w-screen h-screen" />
                    </Spin>
                  }
                >
                  {typeof component === 'string' ? (
                    <Navigate to={component} />
                  ) : (
                    <Page title={title} component={component} />
                  )}
                </Suspense>
              }
            />
          ))}
        </Route>
      ))}
    </Routes>
  </BrowserRouter>
);

export default Pages;
