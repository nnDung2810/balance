import { FormModel } from '@models';

export const ColumnLogin = ({ t }: any) => {
  const col: FormModel[] = [
    {
      name: 'username',
      title: t('columns.auth.login.Username'),
      formItem: {
        placeholder: t('columns.auth.login.Enter Username'),
        rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
      },
    },
    {
      name: 'password',
      title: t('columns.auth.login.password'),
      formItem: {
        placeholder: t('columns.auth.login.Enter Password'),
        type: 'password',
        rules: [{ type: 'required' }, { type: 'min', value: 6 }],
      },
    },
  ];
  return col;
};
