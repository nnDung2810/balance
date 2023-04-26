import React, { PropsWithChildren, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { GlobalFacade } from '@reducers';


// import './index.less';

const Layout = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();
  const globalFacade = GlobalFacade();

  useEffect(() => {
    globalFacade.logout();
  }, []);

  return (
    <div className="overflow-scroll bg-white bg-cover bg-center h-full relative ">
      {/* <div className="grid grid-cols-2 max-lg:grid-cols-1 h-full"> */}
      <div className="max-lg:block flex h-full">
        <div className="bg-[url('../../assets/images/login-bg.png')] w-full bg-cover bg-no-repeat min-h-full h-screen max-lg:hidden">
        </div>
        <div className="w-full h-screen grid items-center max-lg:items-start max-lg:p-10">
          {/* <div className='grid px-10 w-11/12 m-auto'> */}
          <div className='flex justify-center max-lg:block'>
            <div className='lg:max-w-xl mx-auto lg:p-10'>
              {children}
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div className="bg-[url('../../assets/images/login-f.png')] overflow-hidden w-full h-28 bg-cover bg-no-repeat absolute bottom-0 z-10">
        <div className='absolute top-1/2 right-1/2 translate-x-1/2 z-20 font-bold text-white'>Powered By ARI Technology Co ., JSC</div>
      </div>
    </div>
  );
};
export default Layout;
