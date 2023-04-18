import React, { PropsWithChildren } from 'react';
import { ConfigProvider } from 'antd';

import 'dayjs/locale/vi';
import 'dayjs/locale/en';
import { GlobalFacade } from '@reducers';

const GlobalContext = ({ children }: PropsWithChildren) => {
  const { locale } = GlobalFacade();

  return (
    <ConfigProvider
      locale={locale}
      theme={{
        token: {
          fontFamily:
            'Lexend Deca, -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
export default GlobalContext;
