import { FormModel } from '@models';

export const ColumnProfile = ({ t, listPosition }: any) => {
  const col: FormModel[] = [
    {
      title: t('dayoff.Fullname'),
      name: 'name',
      formItem: {
        col: 6,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('columns.auth.login.password'),
      name: 'password',
      formItem: {
        col: 6,
        type: 'password',
        rules: [{ type: 'min', value: 6 }],
      },
    },
    {
      title: t('Email'),
      name: 'email',
      formItem: {
        col: 6,
        rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
      },
    },
    {
      title: t('columns.auth.register.retypedPassword'),
      name: 'retypedPassword',
      formItem: {
        placeholder: t('columns.auth.register.retypedPassword'),
        col: 6,
        type: 'password',
        rules: [
          {
            type: 'custom',
            validator: ({ getFieldValue }: any) => ({
              validator(rule: any, value: string) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Hai mật khẩu không giống nhau!'));
              },
            }),
          },
        ],
      },
    },
    {
      title: t('customer.Phone Number'),
      name: 'phoneNumber',
      formItem: {
        col: 6,
        rules: [{ type: 'required' }, { type: 'phone', min: 10, max: 15 }],
      },
    },
    {
      title: t('user.Date of birth'),
      name: 'dob',
      formItem: {
        col: 6,
        type: 'date',
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('user.Position'),
      name: 'positionCode',
      formItem: {
        col: 6,
        type: 'select',
        rules: [{ type: 'required' }],
        list: listPosition.map((item: any) => ({ value: item.code, label: item.name })),
      },
    },
    {
      title: t('user.Description'),
      name: 'description',
      formItem: {
        col: 8,
        type: 'textarea',
      },
    },
    {
      name: 'avatar',
      title: t('user.Upload avatar'),
      formItem: {
        col: 4,
        type: 'upload',
        mode: 'multiple',
      },
    },
  ];
  return col;
};
