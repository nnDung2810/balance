import { Popconfirm, Tooltip } from 'antd';
import React from 'react';
import { keyRole, routerLinks } from '@utils';
import { DataTableModel, FormModel } from '@models';

export const ColumnTableStore = ({ t, navigate, dataTableRef }: any) => {
  const col: DataTableModel[] = [
    {
      title: 'Mã cửa hàng',
      name: 'code',
      tableItem: {
        width: 150,
        // fixed: window.innerWidth > 767,
      },
    },
    {
      title: 'Tên cửa hàng',
      name: 'name',
      tableItem: {
      },
    },
    {
      title: 'Địa chỉ',
      name: 'address',
      tableItem: {
        render: (value, item) => item.address?.street + ', ' + item.address?.ward.name + ', ' + item.address?.district.name + ', ' + item.address?.province  .name,
      },
    },
    {
      title: 'Loại cửa hàng',
      name: 'isMain',
      tableItem: {
        render: (text: string ) => text ? 'Cửa hàng chính' : 'Cửa hàng chi nhánh'
      },
    },
    {
      title: 'Người đại diện',
      name: 'userRole',
      tableItem: {
        render: (value, item) => item.userRole[0]?.userAdmin.name,
      },
    },
    {
      title: 'Số điện thoại',
      name: 'userRole',
      tableItem: {
        render: (value, item) => item.userRole[0]?.userAdmin.phoneNumber,
      },
    },
  ];
  return col;
};
export const ColumnFormStore = () => {
  const col: FormModel[] = [
    {
      title: 'Tên cửa hàng',
      name: 'code',
      formItem: {
        tabIndex: 1,
        col: 6,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: 'Số fax',
      name: 'code',
      formItem: {
        tabIndex: 1,
        col: 6,
        rules: [{ type: 'required' }],
      },
    },
    {
      name: 'type',
      title: 'Tỉnh/Thành phố',
      formItem: {
        type: 'select',
        col: 3,
      },
    },
    {
      name: 'type',
      title: 'Quận/Huyện',
      formItem: {
        type: 'select',
        col: 3,
      },
    },
    {
      name: 'type',
      title: 'Phường/Xã',
      formItem: {
        type: 'select',
        col: 3,
      },
    },
    {
      name: 'type',
      title: 'Địa chỉ cụ thể',
      formItem: {
        type: 'select',
        col: 3,
      },
    },
    {
      name: 'type',
      title: 'Họ tên đại diện',
      formItem: {
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      name: 'type',
      title: 'Số điện thoại đại diện',
      formItem: {
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      name: 'type',
      title: 'Email đại diện',
      formItem: {
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      name: 'type',
      title: 'Ghi chú',
      formItem: {
        type: 'textarea',
        
      },
    },
  ];
  return col;
};
