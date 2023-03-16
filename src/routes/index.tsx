import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@globalContext';
import { Spin } from '../components/spin';
import { pages } from './pages';

const Layout = ({ layout: Layout, isPublic = false }: any) => {
  const { user } = useAuth();
  if (isPublic === true || !!user?.email)
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  return <Navigate to="/auth/login" />;
};

const Page = ({ title = '', component: Comp, ...props }: any) => {
  const auth = useAuth();

  useEffect(() => {
    auth.setTitlePage('titles.' + title || '');
  }, [title]);

  if (typeof Comp === 'string') {
    return <Navigate to={Comp} />;
  }
  return <Comp {...props} />;
};
const Pages = () => (
  <BrowserRouter>
    <Routes>
      {pages.map(({ layout, isPublic, child }: any, index) => (
        <Route key={index} element={<Layout layout={layout} isPublic={isPublic} />}>
          {child.map(({ path = '', title = '', component }: any, subIndex: number) => (
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
                  <Page title={title} component={component} />
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
