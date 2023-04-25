import { FormInstance, Popconfirm, Tooltip } from 'antd';
import React from 'react';
import dayjs from 'dayjs';

import { Avatar } from '@components';
import { keyRole, routerLinks } from '@utils';
import { DataTableModel, FormModel } from '@models';
import { CodeFacade } from '@reducers';
import { Edit, Trash } from '@svgs';
import classNames from 'classnames';
import { LockOutlined } from '@ant-design/icons';

export const ColumnTableUser = ({ t, formatDate, permissions, navigate, dataTableRef }: any) => {
  const col: DataTableModel[] = [
    {
      title: t(`user.Fullname`),
      name: 'name',
      tableItem: {
        // filter: { type: 'search' },
        width: 400,
        // onCell: () => ({
        //   style: { paddingTop: '0.25rem', paddingBottom: 0 },
        //   onClick: async () => null,
        // }),
        render: (text: string, item: any) => text && <Avatar src={item.avatar} text={item.name} />,
      },
    },
    {
      title: t('user.Position'),
      name: 'positionCode',
      tableItem: {
        width: 90,
        // filter: {
        //   type: 'checkbox',
        //   name: 'positionCode',
        //   get: {
        //     facade: CodeFacade,
        //     format: (item: any) => ({
        //       label: item.name,
        //       value: item.code,
        //     }),
        //     params: (fullTextSearch: string, value) => ({
        //       fullTextSearch,
        //       filter: { type: 'POS' },
        //       extend: { code: value },
        //     }),
        //   },
        // },
        render: (item) => item?.name,
      },
    },
    {
      title: t('Email'),
      name: 'email',
      tableItem: {
        width: 200,
        // filter: { type: 'search' },
    //    sorter: true,
      },
    },
    {
      title: t('user.Phone Number'),
      name: 'phoneNumber',
      tableItem: {
        width: 200,
        // filter: { type: 'search' },
      },
    },
    {
      title: t('user.Date of birth'),
      name: 'dob',
      tableItem: {
        // filter: { type: 'date' },
        width: 200,
        render: (text: string) => dayjs(text).format(formatDate),
      },
    },
    {
      title: t('user.Start Date'),
      name: 'startDate',
      tableItem: {
        // filter: { type: 'search' },
        width: 200,
        render: (text: string) => dayjs(text).format(formatDate),
      },
    },
    {
      title: t('user.Start Date'),
      name: 'startDate',
      tableItem: {
        // filter: { type: 'search' },
        width: 200,
        render: (text: string) => dayjs(text).format(formatDate),
      },
    },
    {
      title: t('user.Start Date'),
      name: 'startDate',
      tableItem:permissions?.includes() &&  {
        fixed: window.innerWidth > 767 && 'right',
        // filter: { type: 'search' },
        width: 200,
        render: (text: string) => dayjs(text).format(formatDate),
      },
    },


  ];
  return col;
};
export const ColumnFormUser = ({ t, listRole }: any) => {
  const col: FormModel[] = [
    {
      title: t('Họ và tên'),
      name: 'name',
      formItem: {
        tabIndex: 1,
        col: 6,
        rules: [{ type: 'required' }],
      },
    },
    // {
    //   title: t('columns.auth.login.password'),
    //   name: 'password',
    //   formItem: {
    //     tabIndex: 2,
    //     col: 6,
    //     type: 'password',
    //     condition: (value: string, form: any, index: number, values: any) => !values?.id,
    //     rules: [{ type: 'required' }, { type: 'min', value: 6 }],
    //   },
    // },
    {
      title: t('Email'),
      name: 'email',
      formItem: {
        tabIndex: 1,
        col: 6,
        rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
      },
    },
    // {
    //   title: t('columns.auth.register.retypedPassword'),
    //   name: 'retypedPassword',
    //   formItem: {
    //     placeholder: t('columns.auth.register.retypedPassword'),
    //     tabIndex: 2,
    //     col: 6,
    //     type: 'password',
    //     condition: (value: string, form: any, index: number, values: any) => !values?.id,
    //     rules: [
    //       { type: 'required' },
    //       {
    //         type: 'custom',
    //         validator: ({ getFieldValue }: any) => ({
    //           validator(rule: any, value: string) {
    //             if (!value || getFieldValue('password') === value) {
    //               return Promise.resolve();
    //             }
    //             return Promise.reject(new Error('Hai mật khẩu không giống nhau!'));
    //           },
    //         }),
    //       },
    //     ],
    //   },
    // },
    {
      title: t('Số điện thoại'),
      name: 'phoneNumber',
      formItem: {
        col: 6,
        rules: [{ type: 'required' }, { type: 'phone', min: 10, max: 15 }],
      },
    },
    // {
    //   title: t('user.Date of birth'),
    //   name: 'dob',
    //   formItem: {
    //     col: 6,
    //     type: 'date',
    //     rules: [{ type: 'required' }],
    //   },
    // },
    // {
    //   title: t('user.Position'),
    //   name: 'positionCode',
    //   formItem: {
    //     col: 6,
    //     type: 'select',
    //     rules: [{ type: 'required' }],
    //     convert: (data: any) =>
    //       data?.map ? data.map((_item: any) => (_item?.id !== undefined ? +_item.id : _item)) : data,
    //     get: {
    //       facade: CodeFacade,
    //       params: (fullTextSearch: string) => ({
    //         fullTextSearch,
    //         filter: { type: 'POS' },
    //         extend: {},
    //       }),
    //       format: (item: any) => ({
    //         label: item.name,
    //         value: item.code,
    //       }),
    //     },
    //   },
    // },
    // {
    //   title: t('user.Start Date'),
    //   name: 'startDate',
    //   formItem: {
    //     col: 6,
    //     type: 'date',
    //     rules: [{ type: 'required' }],
    //   },
    // },
    // {
    //   title: t('components.button.Role'),
    //   name: 'roleId',
    //   formItem: {
    //     col: 6,
    //     type: 'select',
    //     rules: [{ type: 'required' }],
    //     list: listRole.map((item: any) => ({
    //       value: item?.id,
    //       label: item?.name,
    //     })),
    //   },
    // },
    {
      title: t('user.Description'),
      name: 'description',
      formItem: {
        col: 12,
        type: 'textarea',
      },
    },
    // {
    //   name: 'avatar',
    //   title: t('user.Upload avatar'),
    //   formItem: {
    //     col: 4,
    //     type: 'upload',
    //     mode: 'multiple',
    //   },
    // },
  ];
  return col;
};

export const ColumnFormUserEdit = ({ t, listRole }: any) => {
  const col: FormModel[] = [
    {
      title: t('Họ và tên'),
      name: 'name',
      formItem: {
        tabIndex: 1,
        col: 6,
        rules: [{ type: 'required' }],
      },
    },
    // {
    //   title: t('columns.auth.login.password'),
    //   name: 'password',
    //   formItem: {
    //     tabIndex: 2,
    //     col: 6,
    //     type: 'password',
    //     condition: (value: string, form: any, index: number, values: any) => !values?.id,
    //     rules: [{ type: 'required' }, { type: 'min', value: 6 }],
    //   },
    // },
    {
      title: t('Email'),
      name: 'email',
      formItem: {
        tabIndex: 1,
        col: 6,
        rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
      },
    },
    // {
    //   title: t('columns.auth.register.retypedPassword'),
    //   name: 'retypedPassword',
    //   formItem: {
    //     placeholder: t('columns.auth.register.retypedPassword'),
    //     tabIndex: 2,
    //     col: 6,
    //     type: 'password',
    //     condition: (value: string, form: any, index: number, values: any) => !values?.id,
    //     rules: [
    //       { type: 'required' },
    //       {
    //         type: 'custom',
    //         validator: ({ getFieldValue }: any) => ({
    //           validator(rule: any, value: string) {
    //             if (!value || getFieldValue('password') === value) {
    //               return Promise.resolve();
    //             }
    //             return Promise.reject(new Error('Hai mật khẩu không giống nhau!'));
    //           },
    //         }),
    //       },
    //     ],
    //   },
    // },
    {
      title: t('Số điện thoại'),
      name: 'phoneNumber',
      formItem: {
        disabled: () => true,
        addonAfter: () => <LockOutlined />,
        col: 6,
        rules: [{ type: 'required' }, { type: 'phone', min: 10, max: 15 }],
      },
    },
    {
      title: t('user.Date of birth'),
      name: 'dob',
      formItem: {
        disabled: () => true,
        col: 6,
        type: 'date',
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('user.Position'),
      name: 'positionCode',
      formItem: {
        disabled: () => true,
        col: 6,
        type: 'select',
        rules: [{ type: 'required' }],
        convert: (data: any) =>
          data?.map ? data.map((_item: any) => (_item?.id !== undefined ? +_item.id : _item)) : data,
        get: {
          facade: CodeFacade,
          params: (fullTextSearch: string) => ({
            fullTextSearch,
            filter: { type: 'POS' },
            extend: {},
          }),
          format: (item: any) => ({
            label: item.name,
            value: item.code,
          }),
        },
      },
    },
    // {
    //   title: t('user.Start Date'),
    //   name: 'startDate',
    //   formItem: {
    //     col: 6,
    //     type: 'date',
    //     rules: [{ type: 'required' }],
    //   },
    // },
    // {
    //   title: t('components.button.Role'),
    //   name: 'roleId',
    //   formItem: {
    //     col: 6,
    //     type: 'select',
    //     rules: [{ type: 'required' }],
    //     list: listRole.map((item: any) => ({
    //       value: item?.id,
    //       label: item?.name,
    //     })),
    //   },
    // },
    {
      title: t('user.Description'),
      name: 'description',
      formItem: {
        col: 12,
        type: 'textarea',
      },
    },
    // {
    //   name: 'avatar',
    //   title: t('user.Upload avatar'),
    //   formItem: {
    //     col: 4,
    //     type: 'upload',
    //     mode: 'multiple',
    //   },
    // },
  ];
  return col;
};