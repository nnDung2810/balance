import React, { PropsWithChildren } from 'react';
import { ConfigProvider } from 'antd';

import 'dayjs/locale/vi';
import 'dayjs/locale/en';
import { globalAction, useTypedSelector } from '@reducers';

const GlobalContext = ({ children }: PropsWithChildren) => {
  const { locale } = useTypedSelector((state: any) => state[globalAction.name]);

  return (
    <ConfigProvider
      locale={locale}
      theme={{
        token: {
          fontFamily:
            'Google Sans, -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
export default GlobalContext;
