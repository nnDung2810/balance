import { FormModel } from '@models';

const Column = ({ t }: any) => {
  const col: FormModel[] = [
    {
      name: 'firstName',
      title: t('columns.auth.register.firstName'),
      formItem: {
        rules: [{ type: 'required' }],
      },
    },
    {
      name: 'lastName',
      title: t('columns.auth.register.lastName'),
      formItem: {
        rules: [{ type: 'required' }],
      },
    },
    {
      name: 'email',
      title: t('columns.auth.login.Username'),
      formItem: {
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
    {
      name: 'retypedPassword',
      title: t('columns.auth.register.retypedPassword'),
      formItem: {
        type: 'password',
        rules: [{ type: 'required' }, { type: 'min', value: 6 }],
      },
    },
  ];
  return col;
};
export default Column;
