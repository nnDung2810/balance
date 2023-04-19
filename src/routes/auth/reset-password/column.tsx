import { FormModel } from '@models';

export const ColumnResetPassword = ({ t }: any) => {
  const col: FormModel[] = [
    {
      name: 'password',
      title: t('columns.auth.login.password'),
      formItem: {
        placeholder: t('columns.auth.login.Enter Password'),
        type: 'password',
        rules: [{ type: 'required' }, { type: 'min', value: 6 }],
      },
    },
    {
      name: 'retypedPassword',
      title: t('columns.auth.register.retypedPassword'),
      formItem: {
        placeholder: t('columns.auth.register.retypedPassword'),
        type: 'password',
        rules: [{ type: 'required' }, { type: 'min', value: 6 }],
      },
    },
  ];
  return col;
};
