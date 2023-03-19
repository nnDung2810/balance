import React, {PropsWithChildren, useCallback, useContext, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ConfigProvider} from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import enUS from 'antd/lib/locale/en_US';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

import {keyRefreshToken, keyToken, keyUser} from '@utils';
// import { AuthService } from './services';

export const AuthContext = React.createContext<any>({
  user: {},
  timeOut: {},
  title: '',
  formatDate: 'YYYY-MM-DD',
  setTitlePage: () => null,
  login: () => null,
  logout: () => null,
  changeLanguage: () => null,
  setUser: () => null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

const GlobalContext = ({ children }: PropsWithChildren) => {
  const [user, set_User] = useState(JSON.parse(localStorage.getItem(keyUser) || '{}'));
  const [title, setTitle] = useState('');
  const [locale, set_locale] = useState<any | undefined>();
  const [formatDate, set_formatDate] = useState('YYYY-MM-DD');
  const { t, i18n } = useTranslation();
  const timeOut: any = useRef();

  const login = (data: any) => {
    localStorage.setItem(keyUser, JSON.stringify(data));
    setUser(data);
    localStorage.setItem(keyToken, data.accessToken);
    localStorage.setItem(keyRefreshToken, data.refreshToken);
  };

  const logout = async () => {
    // if (user) {
    //   await AuthService.logout();
    // }
    setUser(null);
    localStorage.removeItem(keyUser);
    localStorage.removeItem(keyToken);
    localStorage.removeItem(keyRefreshToken);
  };

  const setUser = (value: any) => {
    set_User(value);
  };

  const setTitlePage = useCallback(
    (name: string) => {
      document.title = t(name);
      setTitle(name);
    },
    [t],
  );

  const changeLanguage = useCallback(
    (values: any) => {
      if (values) {
        values = 'en';
      }
      i18n.changeLanguage(values);
      localStorage.setItem('i18nextLng', values);
      dayjs.locale(values === 'vn' ? 'vi' : values);
      switch (values) {
        case 'vn':
          set_locale(viVN);
          set_formatDate('DD-MM-YYYY');
          break;
        default:
          set_locale(enUS);
          set_formatDate('DD-MM-YYYY');
      }
    },
    [i18n],
  );

  const clearTempLocalStorage = () => {
    const arr = [];
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i)?.indexOf('temp-') === 0) {
        arr.push(localStorage.key(i));
      }
    }
    for (let i = 0; i < arr.length; i++) {
      localStorage.removeItem(arr[i] || '');
    }
  };

  useEffect(() => {
    changeLanguage(localStorage.getItem('i18nextLng'));
    clearTempLocalStorage();
  }, [user, changeLanguage]);

  return (
    <AuthContext.Provider
      value={{
        user,
        timeOut,
        title,
        formatDate,
        setTitlePage,
        login,
        logout,
        changeLanguage,
        setUser,
      }}
    >
      <ConfigProvider locale={locale}>{children}</ConfigProvider>
    </AuthContext.Provider>
  );
};
export default GlobalContext;
