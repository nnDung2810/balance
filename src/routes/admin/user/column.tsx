import React, { useEffect, useState } from 'react';

import { DataTableModel, FormModel } from '@models';
import { GlobalFacade, UserFacade, UserRoleFacade } from '@reducers';
import { LockOutlined } from '@ant-design/icons';
import { Input , Col, FormInstance, Row } from 'antd';
import { Select } from 'antd';
const { Option } = Select;

export const ColumnTableUser = ({ t }: any) => {
  const col: DataTableModel[] = [
    {
      title: t(`Mã người dùng`),
      name: 'code',
      tableItem: {
        width: 140,
      },
    },
    {
      title: t('Họ và tên'),
      name: 'name',
      tableItem: {
        width: 400,
        filter: { type: 'search' },
        onCell: () => ({
          style: { paddingTop: '0.25rem', paddingBottom: 0 },
          onClick: async () => null,
        }),
        render: (text: string, item: any) => text,
      },
    },
    {
      title: t('Email'),
      name: 'email',
      tableItem: {
        width: 130,
        filter: { type: 'search' },
      },
    },
    {
      title: t('Số điện thoại'),
      name: 'phoneNumber',
      tableItem: {
        width: 100,
      },
    },
    {
      title: t('Vai trò'),
      name: 'userRole',
      tableItem: {
        width: 200,
        filter: { type: 'search' },
        render: (text: any, item: any) => {
          if (text = item.userRole[0].mtRole.code === "ADMIN") {
            return "Quản trị viên";
          } else if (text = item.userRole[0].mtRole.code === "OWNER_SUPPLIER") {
            return "Đại diện NCC";
          } else {
            return "Đại diện cửa hàng";
          }
        }
      },
    },
  ];
  return col;
};

export const ColumnFormUser = ({ t }: any) => {
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
      title: t('Số điện thoại'),
      name: 'phoneNumber',
      formItem: {
        col: 6,
        rules: [{ type: 'required' }, { type: 'phone', min: 10, max: 15 }],
      },
    },
    {
      title: t('RoleId'),
      name: 'roleId',
      formItem: {
        type:'hidden',
        initialValues: '1',
        label : 1
      },
    },
    {
      title: t('addressDto'),
      name: 'addressDto.street',
      formItem: {
        type:'hidden',
      },
    },
    {
      title: t('Ghi chú'),
      name: 'note',
      formItem: {
        col: 12,
        type: 'textarea',
      },
    },
  ];
  return col;
};

export const ColumnFormUserEdit = ({ t }: any) => {
  const col: FormModel[] = [
    {
      title: t('Mã người dùng'),
      name: 'code',
      formItem: {
        disabled: () => true,
        addonAfter: () => <LockOutlined />,
        tabIndex: 1,
        col: 6,
      },
    },
    {
      title: t('Họ và tên'),
      name: 'name',
      formItem: {
        tabIndex: 1,
        col: 6,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Email'),
      name: 'email',
      formItem: {
        disabled: () => true,
      //  type: 'select',
        addonAfter: () => <LockOutlined />,
        tabIndex: 1,
        col: 6,
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
