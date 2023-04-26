import { FormModel } from '@models';

export const ColumnForgetPassword = ({ t }: any) => {
  const col: FormModel[] = [
    {
      name: 'email',
      title: t('columns.auth.reset-password.Recovery Email'),
      formItem: {
        placeholder: 'Email khôi phục',
        rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
      },
    },
  ];
  return col;
};
export const ColumnOTP = () => {
  const col: FormModel[] = [
    {
      name: 'otp',
      title: 'Mã OTP',
      formItem: {
        placeholder: 'Mã OTP',
        rules: [{ type: 'required' }, { type: 'min', value: 6 }, { type: 'max', value: 6 }],
      },
    },
    {
      name: 'uuid',
      formItem: {
        type: 'hidden',
      },
    },
    {
      name: 'email',
      formItem: {
        type: 'hidden',
      },
    },
  ];
  return col;
};
export const ColumnFormSetPassword = () => {
  const col: FormModel[] = [
    {
      name: 'password',
      title: 'Mật khẩu',
      formItem: {
        placeholder: 'Mật khẩu',
        type: 'password',
        rules: [{ type: 'required' }, { type: 'min', value: 8 }],
      },
    },
    {
      name: 'passwordComfirm',
      title: 'Xác nhận mật khẩu',
      formItem: {
        placeholder: 'Xác nhận mật khẩu',
        type: 'password',
        rules: [
          {
            type: 'custom',
            validator: ({ getFieldValue }) => ({
              validator(rule, value: string) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Hai mật khẩu không giống nhau!'));
              },
            }),
          },
          { type: 'required' }, { type: 'min', value: 8 }
        ],
      },
    },
    {
      name: 'uuid',
      formItem: {
        type: 'hidden',
      },
    },
    {
      name: 'email',
      formItem: {
        type: 'hidden',
      },
    },
  ];
  return col;
};
