import { Input, Popconfirm, Tooltip } from 'antd';

import { DataTableModel, FormModel } from '@models';
import { routerLinks } from '@utils';
import { DistrictFacade, UserFacade } from '@store';

export const ColumnTableStore = () => {
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
        render: (value, item) => item.address?.street + ', ' + item.address?.ward.name + ', ' + item.address?.district.name + ', ' + item.address?.province.name,
      },
    },
    {
      title: 'Loại cửa hàng',
      name: 'isMain',
      tableItem: {
        render: (text: string) => text ? 'Cửa hàng chính' : 'Cửa hàng chi nhánh'
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
export const ColumnFormStoreAdd = ({ listProvince }: any) => {
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
      },
    },
    {
      title: '',
      name: 'address',
      formItem: {
        type: 'tab',
        rules: [{ type: 'required' }],
        tab: {
          label: 'Địa chỉ',
          value: 'address'
        },
        list: [
          { label: 'Địa chỉ cửa hàng', value: '' },
        ],
        column: [
          {
            title: 'Tỉnh/Thành phố',
            name: 'provinceId',
            formItem: {
              tabIndex: 3,
              col: 3,
              type: 'select',
              rules: [{ type: 'required' }],
              list: listProvince.map((item: any) => ({
                value: item?.id,
                label: item?.name,
              })),
              onChange(value, form) {
                form.resetFields(['district'])
              },
            },
          },
          {
            name: 'districtId',
            title: 'Quận/Huyện',
            formItem: {
              type: 'select',
              col: 3,
              get: {
                facade: DistrictFacade,
                format: (item: any) => ({
                  label: item.name,
                  value: item.code,
                }),
              }
            },
          },
          {
            name: 'wardId',
            title: 'Phường/Xã',
            formItem: {
              type: 'select',
              col: 3,
            },
          },
          {
            name: 'street',
            title: 'Địa chỉ cụ thể',
            formItem: {
              col: 3,
            },
          },
        ]
      }
    },
    {
      name: 'nameContact',
      title: 'Họ tên đại diện',
      formItem: {
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      name: 'phoneNumber',
      title: 'Số điện thoại đại diện',
      formItem: {
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      name: 'emailContact',
      title: 'Email đại diện',
      formItem: {
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
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
export const ColumnFormStoreEdit = ({ listProvince }: any) => {
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
        rules: [{ type: 'required' }],
        list: listProvince.map((item: any) => ({
          value: item?.id,
          label: item?.name,
        })),
        onChange(value, form) {
          form.resetFields(['district'])
          console.log(form.getFieldsValue(['province']))
        },
      },
    },
    {
      name: 'district',
      title: 'Quận/Huyện',
      formItem: {
        type: 'select',
        col: 3,
        get: {
          facade: DistrictFacade,
          format: (item: any) => ({
            label: item.name,
            value: item.code,
          }),
        }
      },
    },
    {
      name: 'ward',
      title: 'Phường/Xã',
      formItem: {
        type: 'select',
        col: 3,
      },
    },
    {
      name: 'street',
      title: 'Địa chỉ cụ thể',
      formItem: {
        col: 3,
      },
    },
    {
      name: 'userRole',
      title: 'Họ tên đại diện',
      formItem: {
        col: 4,
        rules: [{ type: 'required' }],
        convert(data) {
          return data[0]?.userAdmin
        },
      },
    },
    // {
    //   name: 'userRole',
    //   title: 'Số điện thoại đại diện',
    //   formItem: {
    //     col: 4,
    //     rules: [{ type: 'required' }],
    //   },
    // },
    // {
    //   name: 'userRole',
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
