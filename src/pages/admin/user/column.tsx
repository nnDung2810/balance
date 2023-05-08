import React, { useEffect, useState } from 'react';

import { DataTableModel, FormModel } from '@models';
import { GlobalFacade, UserFacade, UserRoleFacade } from '@store';
import { LockOutlined } from '@ant-design/icons';
import { Input, Col, FormInstance, Row } from 'antd';
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
        type: 'hidden',
        initialValues: '1',
        label: 1
      },
    },
    {
      title: t('addressDto'),
      name: 'addressDto.street',
      formItem: {
        type: 'hidden',
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
    {
      title: 'Vai trò',
      name: 'roleCode',
      formItem: {
        col: 12,
        type: 'select',
        render: (form, values, generateForm, index, reRender) => {
          const roleCode = values.roleCode;
          return (
            <div>
              <Row>
                <h2>Vai trò</h2>
              </Row>
              <Select value={roleCode} disabled={true} className="py-2" style={{ width: "100%" }}>
                <Option value="ADMIN">Quản trị viên</Option>
                <Option value="OWNER_SUPPLIER">Nhà cung cấp</Option>
                <Option value="OWNER_STORE">Chủ cửa hàng</Option>
              </Select>
            </div>
          );
        },
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
