import React from 'react';
import { routerLinks } from '@utils';

export const pages = [
  {
    // layout: React.lazy(() => import('../layouts/auth')),
    layout: React.lazy(() => import('../layouts/user-admin')),
    isPublic: true,
    child: [
      // {
      //   path: routerLinks('Login'),
      //   component: React.lazy(() => import('./auth/login')),
      //   title: 'Login',
      // },
      {
        path: routerLinks('Sign-in'),
        component: React.lazy(() => import('./user-admin/sign-in')),
        title: 'Sign-in',
      },
      {
        path: routerLinks('ResetPassword'),
        component: React.lazy(() => import('./auth/reset-password')),
        title: 'Reset Password',
      },
      {
        path: routerLinks('ForgetPassword'),
        component: React.lazy(() => import('./auth/forget-password')),
        title: 'Quên Mật Khẩu',
      },
    ],
  },
  {
    layout: React.lazy(() => import('../layouts/admin')),
    isPublic: false,
    child: [
      {
        path: routerLinks('MyProfile'),
        component: React.lazy(() => import('./admin/my-profile')),
        title: 'MyProfile',
      },
      {
        path: routerLinks('Dashboard'),
        component: React.lazy(() => import('./admin/dashboard')),
        title: 'Dashboard',
      },
      {
        path: routerLinks('Code'),
        component: React.lazy(() => import('./admin/code')),
        title: 'Code',
      },
      {
        path: routerLinks('Data'),
        component: React.lazy(() => import('./admin/data')),
        title: 'Data',
      },
      {
        path: routerLinks('User/List'),
        component: React.lazy(() => import('./admin/user')),
        title: 'User/List',
      },
      {
        path: routerLinks('User/Add'),
        component: React.lazy(() => import('./admin/user/add')),
        title: 'User/Add',
      },
      {
        path: routerLinks('User') + '/:id',
        component: React.lazy(() => import('./admin/user/add')),
        title: 'User/Edit',
      },
      {
        path: routerLinks('Store'),
        component: React.lazy(() => import('./admin/store')),
        title: 'Store',
      },
      // {
      //   path: routerLinks('User/Add'),
      //   component: React.lazy(() => import('./admin/user/add')),
      //   title: 'User/Add',
      // },
    ], // 💬 generate link to here
  },
];
