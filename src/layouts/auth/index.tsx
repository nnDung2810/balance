import React, { PropsWithChildren, useEffect } from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { GlobalFacade } from '@reducers';
import bg from '../../assets/images/login-bg.png'

// import './index.less';

const Layout = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();
  const globalFacade = GlobalFacade();

  useEffect(() => {
    globalFacade.logout();
  }, []);

  return (
    <div className="overflow-scroll bg-white bg-cover bg-center h-full relative ">
      {/* <div className="grid grid-cols-2 gap-7 max-lg:grid-cols-1"> */}
      <div className="flex h-full">
        <div className="max-lg:hidden w-full into relative z-10 justify-between flex-col">
          <div className="bg-[url('../../assets/images/login-bg.png')] w-full bg-cover bg-no-repeat min-h-full h-screen">
          </div>
        </div>
        <div className="w-full h-screen grid items-center max-lg:items-start max-lg:pt-10 m-auto px-10">
          <div>
          {children}
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
