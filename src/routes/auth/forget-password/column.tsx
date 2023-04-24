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
  ];
  return col;
};
