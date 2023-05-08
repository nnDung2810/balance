import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import viVN from 'antd/lib/locale/vi_VN';
import enUS from 'antd/lib/locale/en_US';
import dayjs from 'dayjs';
import i18n from 'i18next';

import { API, keyRefreshToken, keyToken, keyUser, routerLinks } from '@utils';
import { Message } from '@core/message';
import { useAppDispatch, useTypedSelector } from '@store';
import { CommonEntity, Responses } from '@models';
// import Slice, { State } from '../slice';
const name = 'User-admin';
const action = {
  name,
  set: createAsyncThunk(name + '/set', async (values: State) => values),
  logout: createAsyncThunk(name + '/logout', async () => {
    // if (localStorage.getItem(keyRefreshToken)) {
    //   return await API.get(`${routerLinks(name, 'api')}/logout`);
    // }
    return true;
  }),
  profile: createAsyncThunk(name + '/get-my-info', async () => {
    const { data } = await API.get<User>(`${routerLinks(name, 'api')}/get-my-info`);
    return data || {};
  }),
  putProfile: createAsyncThunk(name + '/putProfile', async (values: User) => {
    // if (values.avatar && typeof values.avatar === 'object') {
    //   values.avatar = values.avatar[0].url;
    // }
    const { data } = await API.put<User>(`${routerLinks(name, 'api')}/profile`, values);
    return data || {};
  }),
  login: createAsyncThunk(name + '/sign-in', async (values: { password: string; username: string }) => {
    const { data, message } = await API.post<{ userInfor: User; accessToken: string; refreshToken: string }>(
      `${routerLinks(name, 'api')}/sign-in`,
      values,
    );
    if (data) {
      if (message) await Message.success({ text: message });
      localStorage.setItem(keyToken, data?.accessToken);
      localStorage.setItem(keyRefreshToken, data?.refreshToken);
    }
    return data!.userInfor;
  }),
  forgotPassword: createAsyncThunk(name + '/forgot-password', async (values: { email: string }) => {
    const { data, message } = await API.put< verify >(`${routerLinks(name, 'api')}/forgot-password`, values);
    if (message) await Message.success({ text: message });
    return data?.uuid;
  }),
  verifyForgotPassword: createAsyncThunk(name + '/verify-forgot-password', async (values: verify) => {
    const { data, message } = await API.put<{email: string; uuid: string}>(`${routerLinks(name, 'api')}/verify-forgot-password`, values);
    if (message) await Message.success({ text: message })
    return data;
  }),
  setPassword: createAsyncThunk(name + '/reset-password', async (values : setPassword) => {
    const { data, message } = await API.put(`${routerLinks(name, 'api')}/set-password`, values,);
    if (message) await Message.success({ text: message });
    return data;
  }),
};
// interface StatePassword<T = object> {
//   [selector: string]: any;
//   data?: T;
//   isLoading?: boolean;
//   status?: string;
// }
interface verify {
  otp?: string;
  uuid?: string;
  email?: string
}
interface setPassword {
  password?: string;
  retypedPassword?: string;
  email?: string;
  uuid?: string;
}

export class User extends CommonEntity {
  constructor(
    // public userName?: string,
    public code?: string,
    public email?: string,
    public isMain?: boolean,
    public name?: string,
    public note?: string,
    public phoneNumber?: string,
    public roleCode?: string,
    public roleId?: number,
    public status?: string,
    public subOrgId?: number,
    public userRoleId?: number,
    // public profileImage?: string,
    // public subOrgName?: string,
    // public roleName?: string,
  ) {
    super();
  }
}

const checkLanguage = (language: 'vn' | 'en') => {
  const formatDate = language === 'vn' ? 'DD-MM-YYYY' : 'DD-MM-YYYY';
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
  ...checkLanguage(JSON.parse(JSON.stringify(localStorage.getItem('i18nextLng') || 'en'))),
};
export const globalSlice = createSlice({
  name: action.name,
  initialState,
  reducers: {
    setLanguage: (state: State, action: PayloadAction<'vn' | 'en'>) => {
      if (action.payload !== state.language) {
        const { language, formatDate, locale } = checkLanguage(action.payload);
        i18n.changeLanguage(language).then(() => {
          state.language = language;
          state.formatDate = formatDate;
          state.locale = locale;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(action.set.fulfilled, (state, action: PayloadAction<State>) => {
        let key: keyof State;
        for (key in action.payload) {
          state[key] = action.payload[key];
        }
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
      .addCase(action.profile.fulfilled, (state: State, action: PayloadAction<User>) => {
        if (action.payload) {
          state.user = action.payload;
          localStorage.setItem(keyUser, JSON.stringify(action.payload));
          state.status = 'profile.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })

      .addCase(action.putProfile.pending, (state: State, action) => {
        state.data = action.meta.arg;
        state.isLoading = true;
        state.status = 'putProfile.pending';
      })
      .addCase(action.putProfile.fulfilled, (state: State, action: PayloadAction<User>) => {
        if (action.payload) {
          state.user = action.payload;
          state.status = 'putProfile.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })

      .addCase(
        action.login.pending,
        (
          state: State,
          action: PayloadAction<
            undefined,
            string,
            { arg: { password?: string; username?: string; }; requestId: string; requestStatus: 'pending' }
          >,
        ) => {
          state.data = action.meta.arg;
          state.isLoading = true;
          state.status = 'login.pending';
        },
      )
      .addCase(action.login.fulfilled, (state: State, action: PayloadAction<User>) => {
        if (action.payload) {
          localStorage.setItem(keyUser, JSON.stringify(action.payload));
          clearTempLocalStorage();
          state.user = action.payload;
          state.data = {};
          state.status = 'login.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })

      .addCase(
        action.forgotPassword.pending,
        (
          state: State,
          action: PayloadAction<
            undefined,
            string,
            { arg: { email?: string }; requestId: string; requestStatus: 'pending' }
          >,
        ) => {
          state.data = action.meta.arg;
          state.isLoading = true;
          state.status = 'forgotPassword.pending';
        },
      )
      .addCase(action.forgotPassword.fulfilled, (state: State, action) => {
        if (action.payload) {
          state.data = {...action,uuid: action.payload,email: state.data?.email};
          state.status = 'forgotPassword.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })
      .addCase(
        action.verifyForgotPassword.pending,
        (
          state: State,
          action: PayloadAction<
            undefined,
            string,
            { arg: verify; requestId: string; requestStatus: 'pending' }
          >,
        ) => {
          state.data = action.meta.arg;
          state.isLoading = true;
          state.status = 'verifyForgotPassword.pending';
        },
      )
      .addCase(action.verifyForgotPassword.fulfilled, (state: State, action) => {
        if (action.payload) {
          state.data = action.payload;
          state.status = 'verifyForgotPassword.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })

      .addCase(
        action.setPassword.pending,
        (
          state: State,
          action: PayloadAction<undefined, string, { arg: setPassword; requestId: string; requestStatus: 'pending' }>,
        ) => {
          state.data = action.meta.arg;
          state.isLoading = true;
          state.status = 'setPassword.pending';
        },
      )
      .addCase(action.setPassword.fulfilled, (state: State, action) => {
        if (action.payload) {
          state.data = {};
          state.status = 'setPassword.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      });
  },
});
interface State {
  [selector: string]: any;
  user?: User;
  data?: setPassword | verify | { email?: string } | { password?: string; email?: string } ;
  isLoading?: boolean;
  isVisible?: boolean;
  status?: string;
  title?: string;
  language?: 'vn' | 'en' | null;
  locale?: typeof viVN | typeof enUS;
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
    ...(useTypedSelector((state) => state[action.name]) as State),
    set: (values: State) => dispatch(action.set(values)),
    logout: () => dispatch(action.logout()),
    profile: () => dispatch(action.profile()),
    putProfile: (values: User) => dispatch(action.putProfile(values)),
    login: (values: { password: string; username: string }) => dispatch(action.login(values)),
    forgotPassword: (values: { email: string }) => dispatch(action.forgotPassword(values)),
    verifyForgotPassword: (values: { email: string, otp: string, uuid: string }) => dispatch(action.verifyForgotPassword(values)),
    setPassword: (values: setPassword) => dispatch(action.setPassword(values)),
    setLanguage: (value: 'vn' | 'en') => dispatch(globalSlice.actions.setLanguage(value)),
  };
};
