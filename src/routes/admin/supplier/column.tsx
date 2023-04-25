import { Popconfirm, Tooltip } from 'antd';
import React from 'react';
import dayjs from 'dayjs';

import { Avatar } from '@components';
import { keyRole, routerLinks } from '@utils';
import { DataTableModel, FormModel } from '@models';
import { CodeFacade, DistrictRoleFacade, SupplierFacade, SupplierRoleFacade } from '@reducers';
import { Edit, Trash } from '@svgs';
import { LockOutlined } from '@ant-design/icons';

export const ColumnTableSupplier = ({ t, navigate, dataTableRef }: any) => {
  const col: DataTableModel[] = [
    {
      title: t(`supplier.Code`),
      name: 'code',
      tableItem: {
        width: 140,
      },
    },
    {
      title: t(`supplier.Name`),
      name: 'name',
      tableItem: {
        width: 230,
      },
    },
    {
      title: t(`supplier.Address`),
      name: ('address'),
      tableItem: {
        width: 555,
        render: (value: any,item: any) => item?.address?.street + ', ' + item?.address?.ward?.name + ', ' + item?.address?.district?.name + ', ' + item?.address?.province?.name,
      }
    },
    {
      title: t(`supplier.Representative`),
      name: 'contract',
      tableItem: {
        width: 242  ,
        render: (value: any,item: any) => item?.contract[0].name,
      },
    },
    {
      title: t(`supplier.Phone Number`),
      name: 'userRole',
      tableItem: {
        width: 115,
        render: (value: any,item: any) => item?.userRole[0].userAdmin.phoneNumber,
      },
    },
    {
      title: t(`supplier.Status`),
      name: "isActive",
      tableItem: {
        width: 100,  
        align: 'center',
        render: (text: string) => text
        ? (<div className='bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded'>Đã ký</div>) 
        : (<div className='bg-red-100 text-center p-1 border border-red-500 text-red-600 rounded'>Chờ ký</div>),
      },
    },
  ];
  return col;
};

export const ColumnFormSupplier= ({ t, listRole }: any) => {
  
  const col: FormModel[] = [
    {
      title: t('Tên nhà cung cấp'),
      name: 'name',
      formItem: {
        tabIndex: 1,
        col: 6,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Số fax'),
      name: 'fax',
      formItem: {
        tabIndex: 2,
        col: 6,
        rules: [{ type: 'required' }, { type: 'min', value: 6 }],
      },
    },
    {
      title: t('Tỉnh/Thành phố'),
      name: 'province',
      formItem: {
        col: 3,
        rules: [{ type: 'required' }],
        type: 'select',
        list: listRole.map((item: any) => ({
          value: item?.id,
          label: item?.name,
        })),
      },
    },
    {
      title: t('Quận/Huyện'),
      name: 'district',
      formItem: {
        col: 3,
        rules: [{ type: 'required' }],
        type: 'select',
        get: {
          facade: DistrictRoleFacade,
          // params: (form: any, fullTextSearch: string) => ({
          //   fullTextSearch,
          //   filter: { id: listRole.code },
          //   extend: {},
          // }),
          params: (fullTextSearch: string) => ({
            fullTextSearch,
            filter: { type: 'SUPPLIER' },
            extend: {},
          }),
          format: (item: any) => ({
            label: item.name,
            value: item.id,
          }),
        },
      },
    },
    {
      title: t('Phường/Xã'),
      name: 'email',
      formItem: {
        col: 3,
        rules: [{ type: 'required' }],
        type: 'select',
        // get: {
        //   facade: SupplierFacade,
        //   params: (form: any, fullTextSearch: string) => ({
        //     fullTextSearch,
        //     filter: { roleId: listRole.filter((item: any) => item.name == 'Manager')[0]?.id },
        //     extend: {},
        //   }),
        //   format: (item: any) => ({
        //     label: item.name,
        //     value: item.id,
        //   }),
        // },
      },
    },
    {
      title: t('Địa chỉ cụ thể'),
      name: 'email',
      formItem: {
        tabIndex: 1,
        col: 3,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Họ tên đại diện'),
      name: 'name',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Số điện thoại đại diện'),
      name: 'password',
      formItem: {
        tabIndex: 2,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Email đại diện'),
      name: 'email',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Ghi chú'),
      name: 'email',
      formItem: {
        type: 'textarea',
        tabIndex: 1,
        col: 12,
      },
    },
  ];
  return col;
};

export const ColumnFormSupplierDetail = ({ t, listRole }: any) => {
 const col: FormModel[] = [
  {
      title: t('Mã nhà cung cấp'),
      name: 'code',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Tên nhà cung cấp'),
      name: 'name',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Số fax'),
      name: 'fax',
      formItem: {
        tabIndex: 2,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Tỉnh/Thành phố'),
      name: 'province',
      formItem: {
        col: 3,
        rules: [{ type: 'required' }],
        type: 'select',
        list: listRole.map((item: any) => ({
          value: item?.id,
          label: item?.name,
        })),
      },
    },
    {
      title: t('Quận/Huyện'),
      name: 'district',
      formItem: {
        col: 3,
        rules: [{ type: 'required' }],
        type: 'select',
        get: {
          facade: DistrictRoleFacade,
          // params: (form: any, fullTextSearch: string) => ({
          //   fullTextSearch,
          //   filter: { id: listRole.code },
          //   extend: {},
          // }),
          params: (fullTextSearch: string) => ({
            fullTextSearch,
            filter: { type: 'SUPPLIER' },
            extend: {},
          }),
          format: (item: any) => ({
            label: item.name,
            value: item.id,
          }),
        },
      },
    },
    {
      title: t('Phường/Xã'),
      name: 'email',
      formItem: {
        col: 3,
        rules: [{ type: 'required' }],
        type: 'select',
        // get: {
        //   facade: SupplierFacade,
        //   params: (form: any, fullTextSearch: string) => ({
        //     fullTextSearch,
        //     filter: { roleId: listRole.filter((item: any) => item.name == 'Manager')[0]?.id },
        //     extend: {},
        //   }),
        //   format: (item: any) => ({
        //     label: item.name,
        //     value: item.id,
        //   }),
        // },
      },
    },
    {
      title: t('Địa chỉ cụ thể'),
      name: 'email',
      formItem: {
        tabIndex: 1,
        col: 3,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Họ tên đại diện'),
      name: 'name',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Số điện thoại đại diện'),
      name: 'password',
      formItem: {
        tabIndex: 2,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Email đại diện'),
      name: 'email',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Ghi chú'),
      name: 'email',
      formItem: {
        type: 'textarea',
        tabIndex: 1,
        col: 12,
      },
    },
  ];
  return col;
};

export const ColumnFormSupplierOrder = ({ t, listRole }: any) => {
 const col: FormModel[] = [
  {
      title: t('Mã nhà cung cấp'),
      name: 'code',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Tên nhà cung cấp'),
      name: 'name',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Số fax'),
      name: 'fax',
      formItem: {
        tabIndex: 2,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Tỉnh/Thành phố'),
      name: 'province',
      formItem: {
        col: 3,
        rules: [{ type: 'required' }],
        type: 'select',
        list: listRole.map((item: any) => ({
          value: item?.id,
          label: item?.name,
        })),
      },
    },
    {
      title: t('Quận/Huyện'),
      name: 'district',
      formItem: {
        col: 3,
        rules: [{ type: 'required' }],
        type: 'select',
        get: {
          facade: DistrictRoleFacade,
          // params: (form: any, fullTextSearch: string) => ({
          //   fullTextSearch,
          //   filter: { id: listRole.code },
          //   extend: {},
          // }),
          params: (fullTextSearch: string) => ({
            fullTextSearch,
            filter: { type: 'SUPPLIER' },
            extend: {},
          }),
          format: (item: any) => ({
            label: item.name,
            value: item.id,
          }),
        },
      },
    },
    {
      title: t('Phường/Xã'),
      name: 'email',
      formItem: {
        col: 3,
        rules: [{ type: 'required' }],
        type: 'select',
        // get: {
        //   facade: SupplierFacade,
        //   params: (form: any, fullTextSearch: string) => ({
        //     fullTextSearch,
        //     filter: { roleId: listRole.filter((item: any) => item.name == 'Manager')[0]?.id },
        //     extend: {},
        //   }),
        //   format: (item: any) => ({
        //     label: item.name,
        //     value: item.id,
        //   }),
        // },
      },
    },
    {
      title: t('Địa chỉ cụ thể'),
      name: 'email',
      formItem: {
        tabIndex: 1,
        col: 3,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Họ tên đại diện'),
      name: 'name',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Số điện thoại đại diện'),
      name: 'password',
      formItem: {
        tabIndex: 2,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Email đại diện'),
      name: 'email',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Ghi chú'),
      name: 'email',
      formItem: {
        type: 'textarea',
        tabIndex: 1,
        col: 12,
      },
    },
  ];
  return col;
};

export const ColumnFormSupplierProduct = ({ t, listRole }: any) => {
 const col: FormModel[] = [
  {
      title: t('Mã nhà cung cấp'),
      name: 'code',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Tên nhà cung cấp'),
      name: 'name',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Số fax'),
      name: 'fax',
      formItem: {
        tabIndex: 2,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Tỉnh/Thành phố'),
      name: 'province',
      formItem: {
        col: 3,
        rules: [{ type: 'required' }],
        type: 'select',
        list: listRole.map((item: any) => ({
          value: item?.id,
          label: item?.name,
        })),
      },
    },
    {
      title: t('Quận/Huyện'),
      name: 'district',
      formItem: {
        col: 3,
        rules: [{ type: 'required' }],
        type: 'select',
        get: {
          facade: DistrictRoleFacade,
          // params: (form: any, fullTextSearch: string) => ({
          //   fullTextSearch,
          //   filter: { id: listRole.code },
          //   extend: {},
          // }),
          params: (fullTextSearch: string) => ({
            fullTextSearch,
            filter: { type: 'SUPPLIER' },
            extend: {},
          }),
          format: (item: any) => ({
            label: item.name,
            value: item.id,
          }),
        },
      },
    },
    {
      title: t('Phường/Xã'),
      name: 'email',
      formItem: {
        col: 3,
        rules: [{ type: 'required' }],
        type: 'select',
        // get: {
        //   facade: SupplierFacade,
        //   params: (form: any, fullTextSearch: string) => ({
        //     fullTextSearch,
        //     filter: { roleId: listRole.filter((item: any) => item.name == 'Manager')[0]?.id },
        //     extend: {},
        //   }),
        //   format: (item: any) => ({
        //     label: item.name,
        //     value: item.id,
        //   }),
        // },
      },
    },
    {
      title: t('Địa chỉ cụ thể'),
      name: 'email',
      formItem: {
        tabIndex: 1,
        col: 3,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Họ tên đại diện'),
      name: 'name',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Số điện thoại đại diện'),
      name: 'password',
      formItem: {
        tabIndex: 2,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Email đại diện'),
      name: 'email',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Ghi chú'),
      name: 'email',
      formItem: {
        type: 'textarea',
        tabIndex: 1,
        col: 12,
      },
    },
  ];
  return col;
};

export const ColumnFormSupplierRevenue = ({ t, listRole }: any) => {
 const col: FormModel[] = [
  {
      title: t('Mã nhà cung cấp'),
      name: 'code',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Tên nhà cung cấp'),
      name: 'name',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Số fax'),
      name: 'fax',
      formItem: {
        tabIndex: 2,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Tỉnh/Thành phố'),
      name: 'province',
      formItem: {
        col: 3,
        rules: [{ type: 'required' }],
        type: 'select',
        list: listRole.map((item: any) => ({
          value: item?.id,
          label: item?.name,
        })),
      },
    },
    {
      title: t('Quận/Huyện'),
      name: 'district',
      formItem: {
        col: 3,
        rules: [{ type: 'required' }],
        type: 'select',
        get: {
          facade: DistrictRoleFacade,
          // params: (form: any, fullTextSearch: string) => ({
          //   fullTextSearch,
          //   filter: { id: listRole.code },
          //   extend: {},
          // }),
          params: (fullTextSearch: string) => ({
            fullTextSearch,
            filter: { type: 'SUPPLIER' },
            extend: {},
          }),
          format: (item: any) => ({
            label: item.name,
            value: item.id,
          }),
        },
      },
    },
    {
      title: t('Phường/Xã'),
      name: 'email',
      formItem: {
        col: 3,
        rules: [{ type: 'required' }],
        type: 'select',
        // get: {
        //   facade: SupplierFacade,
        //   params: (form: any, fullTextSearch: string) => ({
        //     fullTextSearch,
        //     filter: { roleId: listRole.filter((item: any) => item.name == 'Manager')[0]?.id },
        //     extend: {},
        //   }),
        //   format: (item: any) => ({
        //     label: item.name,
        //     value: item.id,
        //   }),
        // },
      },
    },
    {
      title: t('Địa chỉ cụ thể'),
      name: 'email',
      formItem: {
        tabIndex: 1,
        col: 3,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Họ tên đại diện'),
      name: 'name',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Số điện thoại đại diện'),
      name: 'password',
      formItem: {
        tabIndex: 2,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Email đại diện'),
      name: 'email',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Ghi chú'),
      name: 'email',
      formItem: {
        type: 'textarea',
        tabIndex: 1,
        col: 12,
      },
    },
  ];
  return col;
};

export const ColumnFormSupplierdiscount = ({ t, listRole }: any) => {
 const col: FormModel[] = [
  {
      title: t('Mã nhà cung cấp'),
      name: 'code',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Tên nhà cung cấp'),
      name: 'name',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Số fax'),
      name: 'fax',
      formItem: {
        tabIndex: 2,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Tỉnh/Thành phố'),
      name: 'province',
      formItem: {
        col: 3,
        rules: [{ type: 'required' }],
        type: 'select',
        list: listRole.map((item: any) => ({
          value: item?.id,
          label: item?.name,
        })),
      },
    },
    {
      title: t('Quận/Huyện'),
      name: 'district',
      formItem: {
        col: 3,
        rules: [{ type: 'required' }],
        type: 'select',
        get: {
          facade: DistrictRoleFacade,
          // params: (form: any, fullTextSearch: string) => ({
          //   fullTextSearch,
          //   filter: { id: listRole.code },
          //   extend: {},
          // }),
          params: (fullTextSearch: string) => ({
            fullTextSearch,
            filter: { type: 'SUPPLIER' },
            extend: {},
          }),
          format: (item: any) => ({
            label: item.name,
            value: item.id,
          }),
        },
      },
    },
    {
      title: t('Phường/Xã'),
      name: 'email',
      formItem: {
        col: 3,
        rules: [{ type: 'required' }],
        type: 'select',
        // get: {
        //   facade: SupplierFacade,
        //   params: (form: any, fullTextSearch: string) => ({
        //     fullTextSearch,
        //     filter: { roleId: listRole.filter((item: any) => item.name == 'Manager')[0]?.id },
        //     extend: {},
        //   }),
        //   format: (item: any) => ({
        //     label: item.name,
        //     value: item.id,
        //   }),
        // },
      },
    },
    {
      title: t('Địa chỉ cụ thể'),
      name: 'email',
      formItem: {
        tabIndex: 1,
        col: 3,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Họ tên đại diện'),
      name: 'name',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Số điện thoại đại diện'),
      name: 'password',
      formItem: {
        tabIndex: 2,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Email đại diện'),
      name: 'email',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Ghi chú'),
      name: 'email',
      formItem: {
        type: 'textarea',
        tabIndex: 1,
        col: 12,
      },
    },
  ];
  return col;
};

export const ColumnFormSupplierContract = ({ t, listRole }: any) => {
 const col: FormModel[] = [
  {
      title: t('Mã nhà cung cấp'),
      name: 'code',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Tên nhà cung cấp'),
      name: 'name',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Số fax'),
      name: 'fax',
      formItem: {
        tabIndex: 2,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Tỉnh/Thành phố'),
      name: 'province',
      formItem: {
        col: 3,
        rules: [{ type: 'required' }],
        type: 'select',
        list: listRole.map((item: any) => ({
          value: item?.id,
          label: item?.name,
        })),
      },
    },
    {
      title: t('Quận/Huyện'),
      name: 'district',
      formItem: {
        col: 3,
        rules: [{ type: 'required' }],
        type: 'select',
        get: {
          facade: DistrictRoleFacade,
          // params: (form: any, fullTextSearch: string) => ({
          //   fullTextSearch,
          //   filter: { id: listRole.code },
          //   extend: {},
          // }),
          params: (fullTextSearch: string) => ({
            fullTextSearch,
            filter: { type: 'SUPPLIER' },
            extend: {},
          }),
          format: (item: any) => ({
            label: item.name,
            value: item.id,
          }),
        },
      },
    },
    {
      title: t('Phường/Xã'),
      name: 'email',
      formItem: {
        col: 3,
        rules: [{ type: 'required' }],
        type: 'select',
        // get: {
        //   facade: SupplierFacade,
        //   params: (form: any, fullTextSearch: string) => ({
        //     fullTextSearch,
        //     filter: { roleId: listRole.filter((item: any) => item.name == 'Manager')[0]?.id },
        //     extend: {},
        //   }),
        //   format: (item: any) => ({
        //     label: item.name,
        //     value: item.id,
        //   }),
        // },
      },
    },
    {
      title: t('Địa chỉ cụ thể'),
      name: 'email',
      formItem: {
        tabIndex: 1,
        col: 3,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Họ tên đại diện'),
      name: 'name',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Số điện thoại đại diện'),
      name: 'password',
      formItem: {
        tabIndex: 2,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Email đại diện'),
      name: 'email',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Ghi chú'),
      name: 'email',
      formItem: {
        type: 'textarea',
        tabIndex: 1,
        col: 12,
      },
    },
  ];
  return col;
};