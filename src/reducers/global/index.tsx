import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import viVN from 'antd/lib/locale/vi_VN';
import enUS from 'antd/lib/locale/en_US';
import dayjs from 'dayjs';
import i18n from 'i18next';

import { API, keyRefreshToken, keyToken, keyUser, routerLinks } from '@utils';
import { Message } from '@components';
import { useAppDispatch, useTypedSelector } from '@reducers';

const name = 'Auth';
const action = {
  name,
  set: createAsyncThunk(name + '/set', async (values: any) => values),
  logout: createAsyncThunk(name + '/logout', async () => {
    // if (localStorage.getItem(keyRefreshToken)) {
    //   return await API.get(`${routerLinks(name, 'api')}/logout`);
    // }
    return true;
  }),
  profile: createAsyncThunk(name + '/profile', async () => {
    const { data } = await API.get(`${routerLinks(name, 'api')}/profile`);
    return data;
  }),
  putProfile: createAsyncThunk(name + '/putProfile', async (values: any) => {
    if (values.avatar && typeof values.avatar === 'object') {
      values.avatar = values.avatar[0].url;
    }
    const { data } = await API.put(`${routerLinks(name, 'api')}/profile`, values);
    return data;
  }),
  login: createAsyncThunk(name + '/post', async (values: any) => {
    const data = await API.post(`${routerLinks(name, 'api')}/login`, values);
    if (data) {
      if (data.message) await Message.success({ text: data.message });
      const { user, accessToken, refreshToken } = data.data;
      localStorage.setItem(keyToken, accessToken);
      localStorage.setItem(keyRefreshToken, refreshToken);
      return user;
    }
    return data;
  }),
  forgottenPassword: createAsyncThunk(name + '/forgotten-password', async (values: any) => {
    const data = await API.post(`${routerLinks(name, 'api')}/forgotten-password`, values);
    if (data) {
      if (data.message) await Message.success({ text: data.message });
    }
    return !!data.data;
  }),
  resetPassword: createAsyncThunk(name + '/reset-password', async (values: any) => {
    const token = values.token;
    delete values.token;
    const data = await API.post(
      `${routerLinks(name, 'api')}/reset-password`,
      values,
      {},
      { authorization: 'Bearer ' + token },
    );
    if (data) {
      if (data.message) await Message.success({ text: data.message });
    }
    return !!data;
  }),
};
const checkLanguage = (language: string) => {
  const formatDate = language === 'vn' ? 'DD-MM-YYYY' : 'YYYY-MM-DD';
  const locale = language === 'vn' ? viVN : enUS;
  dayjs.locale(language === 'vn' ? 'vi' : language);
  localStorage.setItem('i18nextLng', language);
  return { language, formatDate, locale };
};
const initialState: State = {
  data: {},
  user: JSON.parse(localStorage.getItem(keyUser) || '{}'),
  isLoading: false,
  isVisible: false,
  status: 'idle',
  title: '',
  ...checkLanguage(localStorage.getItem('i18nextLng') || 'en'),
};
export const globalSlice = createSlice({
  name: action.name,
  initialState,
  reducers: {
    setLanguage: (state: State, action: PayloadAction<string>) => {
      if (action.payload !== state.language) {
        const { language, formatDate, locale } = checkLanguage(action.payload);
        i18n.changeLanguage(language);
        state.language = language;
        state.formatDate = formatDate;
        state.locale = locale;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(action.set.fulfilled, (state: State, action: PayloadAction<object>) => {
        Object.keys(action.payload).forEach((key) => {
          // @ts-ignore
          state[key] = action.payload[key];
        });
      })
      // .addCase(action.logout.pending, (state: State) => {
      //   state.isLoading = true;
      //   state.status = 'logout.pending';
      // })
      .addCase(action.logout.fulfilled, (state) => {
        state.user = {};
        localStorage.removeItem(keyUser);
        localStorage.removeItem(keyToken);
        localStorage.removeItem(keyRefreshToken);
        clearTempLocalStorage();
        state.isLoading = false;
        state.status = 'logout.fulfilled';
      })

      .addCase(action.profile.pending, (state: State) => {
        state.isLoading = true;
        state.status = 'profile.pending';
      })
      .addCase(action.profile.fulfilled, (state: State, action: PayloadAction<object>) => {
        if (action.payload) {
          state.user = action.payload;
          state.status = 'profile.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })

      .addCase(action.putProfile.pending, (state: State, action: any) => {
        state.data = action.meta.arg;
        state.isLoading = true;
        state.status = 'putProfile.pending';
      })
      .addCase(action.putProfile.fulfilled, (state: State, action: PayloadAction<object>) => {
        if (action.payload) {
          state.user = action.payload;
          state.status = 'putProfile.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })

      .addCase(action.login.pending, (state: State, action: any) => {
        state.data = action.meta.arg;
        state.isLoading = true;
        state.status = 'login.pending';
      })
      .addCase(action.login.fulfilled, (state: State, action: PayloadAction<object>) => {
        if (action.payload) {
          localStorage.setItem(keyUser, JSON.stringify(action.payload));
          clearTempLocalStorage();
          state.user = action.payload;
          state.data = {};
          state.status = 'login.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })

      .addCase(action.forgottenPassword.pending, (state: State, action: any) => {
        state.data = action.meta.arg;
        state.isLoading = true;
        state.status = 'forgottenPassword.pending';
      })
      .addCase(action.forgottenPassword.fulfilled, (state: State, action: PayloadAction<any>) => {
        if (action.payload) {
          state.data = {};
          state.status = 'forgottenPassword.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })

      .addCase(action.resetPassword.pending, (state: State, action: any) => {
        state.data = action.meta.arg;
        state.isLoading = true;
        state.status = 'resetPassword.pending';
      })
      .addCase(action.resetPassword.fulfilled, (state: State, action: PayloadAction<any>) => {
        if (action.payload) {
          state.data = {};
          state.status = 'resetPassword.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      });
  },
});
interface State {
  user: any;
  data: any;
  isLoading: boolean;
  isVisible: boolean;
  status: string;
  title: string;
  formatDate: string;
  language: string;
  locale: any;
}

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
export const GlobalFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state: any) => state[action.name]),
    set: (values: any) => dispatch(action.set(values)),
    logout: () => dispatch(action.logout()),
    profile: () => dispatch(action.profile()),
    putProfile: (values: any) => dispatch(action.putProfile(values)),
    login: (values: any) => dispatch(action.login(values)),
    forgottenPassword: (values: any) => dispatch(action.forgottenPassword(values)),
    resetPassword: (values: any) => dispatch(action.resetPassword(values)),
    setLanguage: (value: string) => dispatch(globalSlice.actions.setLanguage(value)),
  };
};
