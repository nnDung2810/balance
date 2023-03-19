import {FormModel} from '@models';
import {routerLinks} from '@utils';

const Column = ({ t, listRole }: any) => {
  const col: FormModel[] = [
    {
      title: t('Họ và tên'),
      name: 'name',
      formItem: {
        col: 6,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Mật khẩu'),
      name: 'password',
      formItem: {
        col: 6,
        type: 'password',
        condition: (value: string, form: any, index: number, values: any) => !values?.name,
        rules: [{ type: 'required' }, { type: 'min', value: 6 }],
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
      title: t('Nhập lại mật khẩu'),
      name: 'retypedPassword',
      formItem: {
        col: 6,
        type: 'password',
        condition: (value: string, form: any, index: number, values: any) => !values?.name,
        rules: [
          { type: 'required' },
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
      title: t('Số điện thoại'),
      name: 'phoneNumber',
      formItem: {
        col: 6,
        rules: [{ type: 'required' }, { type: 'phone', min: 10, max: 15 }],
      },
    },
    {
      title: t('Ngày sinh'),
      name: 'dob',
      formItem: {
        col: 6,
        type: 'date',
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Vị trí'),
      name: 'positionCode',
      formItem: {
        col: 6,
        type: 'select',
        rules: [{ type: 'required' }],
        convert: (data: any) =>
          data?.map ? data.map((_item: any) => (_item?.id !== undefined ? +_item.id : _item)) : data,
        api: {
          link: () => routerLinks('Code', 'api') + '/',
          format: (item: any) => ({
            label: item.name,
            value: item.code,
          }),
          params: (form: any, fullTextSearch: string) => ({
            fullTextSearch,
            filter: { type: 'POS' },
          }),
        },
      },
    },
    {
      title: t('Ngày đầu đi làm'),
      name: 'startDate',
      formItem: {
        col: 6,
        type: 'date',
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Quyền'),
      name: 'roleId',
      formItem: {
        col: 6,
        type: 'select',
        rules: [{ type: 'required' }],
        list: listRole.map((item: any) => ({
          value: item?.id,
          label: item?.name,
        })),
      },
    },
    {
      title: t('Description'),
      name: 'description',
      formItem: {
        col: 8,
        type: 'textarea',
      },
    },
    {
      name: 'avatar',
      title: 'Upload avatar',
      formItem: {
        col: 4,
        type: 'upload',
        mode: 'multiple',
      },
    },
  ];
  return col;
};
export default Column;
