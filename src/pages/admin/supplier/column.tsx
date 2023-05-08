import { DataTableModel, FormModel } from '@models';
import { DistrictFacade } from '@store/address/district';
import { WardFacade } from '@store/address/ward';

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
  // const districtFaca = DistrictFacade();
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
                    title: '',
                    name: 'address',
                    formItem: {
                      rules: [{ type: 'required' }],
                      render() {
                        return (
                          <h3 className='mb-2.5 text-left text-base text-black font-medium'>Địa chỉ cửa hàng</h3>
                        )
                      },
                    }
                  },
                  {
                    title: 'Tỉnh/Thành phố',
                    name: 'provinceId',
                    formItem: {
                      tabIndex: 3,
                      col: 3,
                      type: 'select',
                      rules: [{ type: 'required' }],
                      list: listRole.map((item: any) => ({
                        label: item?.name,
                        value: item?.code,
                      })),
                      onChange(value, form) {
                        const districtFacade = DistrictFacade()
                        form.resetFields(['district'])
                        districtFacade.get(`${value}`)
                      },
                    },
                  },
                  {
                    name: 'districtId',
                    title: 'Quận/Huyện',
                    formItem: {
                      type: 'select',
                      rules: [{ type: 'required' }],
                      col: 3,
                      get: {
                        facade: DistrictFacade,
                        format: (item: any) => ({
                          label: item.name,
                          value: item.code,
                        }),
                      },
                      onChange(value, form) {
                        const wardFacade = WardFacade()
                        form.resetFields(['wardId'])
                        wardFacade.get(`${value}`)
                      },
                    },
                  },
                  {
                    name: 'wardId',
                    title: 'Phường/Xã',
                    formItem: {
                      type: 'select',
                      rules: [{ type: 'required' }],
                      col: 3,
                      get: {
                        facade: WardFacade,
                        format: (item: any) => ({
                          label: item.name,
                          value: item.code,
                        }),
                      }
                    },
                  },
                  {
                    name: 'street',
                    title: 'Địa chỉ cụ thể',
                    formItem: {
                      rules: [{ type: 'required' }],
                      col: 3,
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

export const ColumnFormSupplierDetail = ({ t, listRole, districtId, wardId }: any) => {

 const col: FormModel[] = [
    {
      title: t('Mã nhà cung cấp'),
      name: 'code',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'password' }],
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
        onChange: (value: any, form: any) => {
          if(value){
            
          }
        },
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
          facade: DistrictFacade,
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
      name: 'ward',
      formItem: {
        col: 3,
        rules: [{ type: 'required' }],
        type: 'select',
        get: {
          facade: WardFacade,
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
      title: t('Địa chỉ cụ thể'),
      name: `street`,
      formItem: {
        tabIndex: 1,
        col: 3,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Họ tên đại diện'),
      name: 'username',
      formItem: {
        tabIndex: 1,
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Số điện thoại đại diện'),
      name: 'phoneNumber',
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
      name: 'note',
      formItem: {
        type: 'textarea',
        tabIndex: 1,
        col: 12,
      },
    },
  ];
  return col;
};

export const ColumnTableSupplierOrder = ({ t, listRole }: any) => {
 const col: DataTableModel[] = [
    {
      title: t(`MÃ đơn hàng`),
      name: 'code',
      tableItem: {
        width: 300,
      },
    },
    {
      title: t(`Tên cửa hàng`),
      name: 'name',
      tableItem: {
        width: 150,
      },
    },
    {
      title: t(`Người nhận`),
      name: ('address'),
      tableItem: {
        width: 150,
        render: (value: any,item: any) => item?.address?.street + ', ' + item?.address?.ward?.name + ', ' + item?.address?.district?.name + ', ' + item?.address?.province?.name,
      }
    },
    {
      title: t(`Địa chỉ nhận hàng`),
      name: 'contract',
      tableItem: {
        width: 300  ,
        render: (value: any,item: any) => item?.contract[0].name,
      },
    },
    {
      title: t(`Tổng tiền (VND)`),
      name: 'userRole',
      tableItem: {
        width: 150,
        render: (value: any,item: any) => item?.userRole[0].userAdmin.phoneNumber,
      },
    },
    {
      title: t(`Ngày đặt`),
      name: 'userRole',
      tableItem: {
        width: 150,
        render: (value: any,item: any) => item?.userRole[0].userAdmin.phoneNumber,
      },
    },
    {
      title: t(`supplier.Status`),
      name: "isActive",
      tableItem: {
        width: 180,  
        align: 'center',
        render: (text: string) => text
        ? (<div className='bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded'>Đã ký</div>) 
        : (<div className='bg-red-100 text-center p-1 border border-red-500 text-red-600 rounded'>Chờ ký</div>),
      },
    },
  ];
  return col;
};

export const ColumnTableSupplierProduct = ({ t, listRole }: any) => {
  const col: DataTableModel[] = [
    {
      title: t(`Mã sẩn phẩm`),
      name: 'code',
      tableItem: {
        width: 170,
      },
    },
    {
      title: t(`Tên sản phẩm`),
      name: 'name',
      tableItem: {
        width: 255,
      },
    },
    {
      title: t(`Danh mục`),
      name: ('address'),
      tableItem: {
        width: 145,
        render: (value: any,item: any) => item?.address?.street + ', ' + item?.address?.ward?.name + ', ' + item?.address?.district?.name + ', ' + item?.address?.province?.name,
      }
    },
    {
      title: t(`Giá bán`),
      name: 'contract',
      tableItem: {
        width: 225  ,
        render: (value: any,item: any) => item?.contract[0].name,
      },
    },
    {
      title: t(`Tình trạng`),
      name: "isActive",
      tableItem: {
        width: 160,  
        align: 'center',
        render: (text: string) => text
        ? (<div className='bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded'>Đang bán</div>) 
        : (<div className='bg-red-100 text-center p-1 border border-red-500 text-red-600 rounded'>Hết</div>),
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
          facade: DistrictFacade,
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
        get: {
          facade: WardFacade,
          params: (form: any, fullTextSearch: string) => ({
            fullTextSearch,
            filter: { roleId: listRole.filter((item: any) => item.name == 'Manager')[0]?.id },
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

export const ColumnTableSupplierDiscount = ({ t, listRole }: any) => {
 const col: DataTableModel[] = [
    {
      title: t(`STT`),
      name: 'code',
      tableItem: {
        width: 300,
      },
    },
    {
      title: t(`Thời gian`),
      name: 'name',
      tableItem: {
        width: 150,
      },
    },
    {
      title: t(`Chiết khấu (VND)`),
      name: ('address'),
      tableItem: {
        width: 150,
        render: (value: any,item: any) => item?.address?.street + ', ' + item?.address?.ward?.name + ', ' + item?.address?.district?.name + ', ' + item?.address?.province?.name,
      }
    },
    {
      title: t(`Đã thanh toán (VND)`),
      name: 'contract',
      tableItem: {
        width: 300  ,
        render: (value: any,item: any) => item?.contract[0].name,
      },
    },
    {
      title: t(`Chưa thanh toán (VND)`),
      name: 'userRole',
      tableItem: {
        width: 150,
        render: (value: any,item: any) => item?.userRole[0].userAdmin.phoneNumber,
      },
    },
    {
      title: t(`Trạng thái`),
      name: "isActive",
      tableItem: {
        width: 180,  
        align: 'center',
        render: (text: string) => text
        ? (<div className='bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded'>Đã ký</div>) 
        : (<div className='bg-red-100 text-center p-1 border border-red-500 text-red-600 rounded'>Chờ ký</div>),
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
          facade: DistrictFacade,
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
        get: {
          facade: WardFacade,
          params: (form: any, fullTextSearch: string) => ({
            fullTextSearch,
            filter: { roleId: listRole.filter((item: any) => item.name == 'Manager')[0]?.id },
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