import { Popconfirm, Tooltip } from 'antd';
import React from 'react';
import dayjs from 'dayjs';

import { Avatar } from '@components';
import { keyRole, routerLinks } from '@utils';
import { DataTableModel, FormModel } from '@models';
import { CodeFacade } from '@reducers';
import { Edit, Trash } from '@svgs';

export const ColumnTableStore = ({ t, formatDate, permissions, navigate, dataTableRef }: any) => {
  const col: DataTableModel[] = [
    {
      title: 'Mã cửa hàng',
      name: 'name',
      tableItem: {
        width: 200,
        fixed: window.innerWidth > 767,
      },
    },
    {
      title: 'Tên cửa hàng',
      name: 'email',
      tableItem: {
      },
    },
    {
      title: 'Địa chỉ',
      name: 'phoneNumber',
      tableItem: {
      },
    },
    {
      title: 'Loại cửa hàng',
      name: 'dob',
      tableItem: {
        render: (text: string) => dayjs(text).format(formatDate),
      },
    },
    {
      title: 'Người đại diện',
      name: 'startDate',
      tableItem: {
        render: (text: string) => dayjs(text).format(formatDate),
      },
    },
    {
        title: 'Số điện thoại',
        name: 'phoneNumber',
        tableItem: {
        },
      },
  ];
  return col;
};
export const ColumnFormUser = ({ t, listRole }: any) => {
  const col: FormModel[] = [
    {
      title: t('dayoff.Fullname'),
      name: 'name',
      formItem: {
        tabIndex: 1,
        col: 6,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('columns.auth.login.password'),
      name: 'password',
      formItem: {
        tabIndex: 2,
        col: 6,
        type: 'password',
        condition: (value: string, form: any, index: number, values: any) => !values?.id,
        rules: [{ type: 'required' }, { type: 'min', value: 6 }],
      },
    },
    {
      title: t('Email'),
      name: 'email',
      formItem: {
        tabIndex: 1,
        col: 6,
        rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
      },
    },
    {
      title: t('columns.auth.register.retypedPassword'),
      name: 'retypedPassword',
      formItem: {
        placeholder: t('columns.auth.register.retypedPassword'),
        tabIndex: 2,
        col: 6,
        type: 'password',
        condition: (value: string, form: any, index: number, values: any) => !values?.id,
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
    {
      title: t('user.Start Date'),
      name: 'startDate',
      formItem: {
        col: 6,
        type: 'date',
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('components.button.Role'),
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
