import { Popconfirm, Tooltip } from 'antd';

import { DataTableModel, FormModel } from '@models';
import { ProvinceFacade } from 'src/reducers/address/province';

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
export const ColumnFormStore = (listProvince: any) => {
  const col: FormModel[] = [
    {
      title: 'Tên cửa hàng',
      name: 'name',
      formItem: {
        tabIndex: 1,
        col: 6,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: 'Số fax',
      name: 'fax',
      formItem: {
        tabIndex: 2,
        col: 6,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: 'Tỉnh/Thành phố',
      name: 'province',
      formItem: {
        tabIndex: 3,
        col: 3,
        type: 'select',
        // list: listProvince.map((item: any) => ({
        //   value: item?.id,
        //   label: item?.name,
        // })),
      },
    },
    // {
    //   name: 'address.province.name',
    //   title: 'Tỉnh/Thành phố',
    //   formItem: {
    //     type: 'select',
    //     col: 3,
    //   },
    // },
    // {
    //   name: 'address.district.name ',
    //   title: 'Quận/Huyện',
    //   formItem: {
    //     type: 'select',
    //     col: 3,
    //   },
    // },
    // {
    //   name: 'address.ward.name ',
    //   title: 'Phường/Xã',
    //   formItem: {
    //     type: 'select',
    //     col: 3,
    //   },
    // },
    // {
    //   name: 'address.street',
    //   title: 'Địa chỉ cụ thể',
    //   formItem: {
    //     col: 3,
    //   },
    // },
    // {
    //   name: 'userRole[0].userAdmin.name',
    //   title: 'Họ tên đại diện',
    //   formItem: {
    //     col: 4,
    //     rules: [{ type: 'required' }],
    //   },
    // },
    // {
    //   name: 'userRole[0].userAdmin.phoneNumber',
    //   title: 'Số điện thoại đại diện',
    //   formItem: {
    //     col: 4,
    //     rules: [{ type: 'required' }],
    //   },
    // },
    // {
    //   name: 'userRole[0].userAdmin.email',
    //   title: 'Email đại diện',
    //   formItem: {
    //     col: 4,
    //     rules: [{ type: 'required' }],
    //   },
    // },
    // {
    //   name: 'note',
    //   title: 'Ghi chú',
    //   formItem: {
    //     type: 'textarea',
        
    //   },
    // },
  ];
  return col;
};
