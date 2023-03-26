import React from 'react';
import { routerLinks } from '@utils';

export const pages = [
  {
    layout: React.lazy(() => import('../layouts/auth')),
    isPublic: true,
    child: [
      {
        path: routerLinks('Login'),
        component: React.lazy(() => import('./auth/login')),
        title: 'Login',
      },
      {
        path: routerLinks('ResetPassword'),
        component: React.lazy(() => import('./auth/reset-password')),
        title: 'Reset Password',
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
        path: routerLinks('User'),
        component: React.lazy(() => import('./admin/user')),
        title: 'User',
      },
      {
        path: routerLinks('Data'),
        component: React.lazy(() => import('./admin/data')),
        title: 'Data',
      },
    ], // 💬 generate link to here
  },
];
