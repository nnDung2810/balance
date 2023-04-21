import React, { useState } from 'react';

import { DataTableModel, FormModel } from '@models';
import { GlobalFacade, UserFacade, UserRoleFacade } from '@reducers';
import { LockOutlined } from '@ant-design/icons';

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
        render: (text: string, item: any) => text ,
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
        render:(text:any, item:any) => {
          if (text=item.userRole[0].mtRole.code === "ADMIN") {
            return "Quản trị viên";
          } else if (text=item.userRole[0].mtRole.code === "OWNER_SUPPLIER") {
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

export const ColumnFormUserEdit = ({ t, listRole }: any) => {
  const col: FormModel[] = [
    {
      title: t('Mã người dùng'),
      name: 'code',
      formItem: {
        disabled: () => true,
        addonAfter: () => <LockOutlined />,
        tabIndex: 1,
        col: 6,
        rules: [{ type: 'required' }],
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
      title: t('Vai trò'),
      name: 'roleCode',
      formItem: {
        disabled: () => true,
        col: 6,
        type: 'select',
        render: (text , values) =>{
          if((text=values.roleCode) === "ADMIN"){
            return "Quản trị viên";
          } else if((text=values.roleCode) === "OWNER_SUPPLIER"){
            return "Nhà cung cấp";
          } else {
            return "Chủ cửa hàng";
          }
        }
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
