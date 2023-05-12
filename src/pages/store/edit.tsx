import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Dropdown, Select, Switch, Tabs } from 'antd';

import { routerLinks } from '@utils';
import { Form } from '@core/form';
import { DistrictFacade, StoreFacade, WardFacade, ProvinceFacade, StoreManagement, SubStoreFacade, ConnectSupplierFacade, ProductFacade, InventoryProductFacade } from '@store';
import { DataTable } from '@core/data-table';
import { Button } from '@core/button';
import { Plus } from '@svgs';

const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const storeFacade = StoreFacade()
  const { data, isLoading, queryParams, status } = storeFacade;
  const productFacede = ProductFacade()
  const subStoreFacade = SubStoreFacade()
  const connectSupplierFacade = ConnectSupplierFacade()
  const inventoryProductFacade = InventoryProductFacade()

  const isBack = useRef(true);
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();

  useEffect(() => {
    if (id) storeFacade.getById({ id });
    console.log(inventoryProductFacade.get({page: 1, perPage: 10, idStore: id }))
    return () => {
      isReload.current && storeFacade.get(param);
    };
  }, [id, data]);

  const handleBack = () => navigate(routerLinks('Store') + '?' + new URLSearchParams(param).toString());
  const handleSubmit = (values: StoreManagement) => {
    storeFacade.put(values);
  };

  return (
    <div className={'w-full'}>
      <Fragment>
        <div className=''>
          <Tabs defaultActiveKey='1' type='card' size='large'>
          <Tabs.TabPane tab={'Thông tin cửa hàng'} key='1' className='bg-white rounded-xl rounded-tl-none '>
              <Form
                values={{ ...data }}
                className="intro-x p-6 pb-4 pt-3 rounded-lg w-full "
                columns={[
                  {
                    title: 'store.Code',
                    name: 'code',
                    formItem: {
                      tabIndex: 1,
                      col: 4,
                      disabled: () => true
                    },
                  },
                  {
                    title: 'store.Name',
                    name: 'name',
                    formItem: {
                      tabIndex: 2,
                      col: 4,
                      rules: [{ type: 'required' }],
                    },
                  },
                  {
                    title: 'store.Fax',
                    name: 'fax',
                    formItem: {
                      tabIndex: 3,
                      col: 4,
                    },
                  },
                  {
                    title: '',
                    name: 'address',
                    formItem: {
                      rules: [{ type: 'required' }],
                      render() {
                        return (
                          <h3 className='mb-2.5 text-base text-black font-medium'>Địa chỉ cửa hàng</h3>
                        )
                      },
                    }
                  },
                  {
                    title: 'store.Province',
                    name: 'provinceId',
                    formItem: {
                      tabIndex: 3,
                      col: 3,
                      rules: [{ type: 'required' }],
                      type: 'select',
                      get: {
                        facade: ProvinceFacade,
                        format: (item: any) => ({
                          label: item.name,
                          value: item.id + '|' + item.code,
                        }),
                      },
                      onChange(value, form) {
                        form.resetFields(['districtId', 'wardId'])
                      },
                    },
                  },
                  {
                    title: 'store.District',
                    name: 'districtId',
                    formItem: {
                      type: 'select',
                      rules: [{ type: 'required' }],
                      col: 3,
                      get: {
                        facade: DistrictFacade,
                        format: (item: any) => ({
                          label: item.name,
                          value: item.id + '|' + item.code,
                        }),
                        params: (fullTextSearch, value) => ({
                          fullTextSearch,
                          code: value().provinceId.slice(value().provinceId.indexOf('|') + 1),
                        }),
                      },
                      onChange(value, form) {
                        form.resetFields(['wardId'])
                      },
                    },
                  },
                  {
                    title: 'store.Ward',
                    name: 'wardId',
                    formItem: {
                      type: 'select',
                      rules: [{ type: 'required' }],
                      col: 3,
                      get: {
                        facade: WardFacade,
                        format: (item: any) => ({
                          label: item.name,
                          value: item.id,
                        }),
                        params: (fullTextSearch, value) => ({
                          fullTextSearch,
                          code: value().districtId.slice(value().districtId.indexOf('|') + 1),
                        })
                      }
                    },
                  },
                  {
                    title: 'store.Street',
                    name: 'street',
                    formItem: {
                      rules: [{ type: 'required' }],
                      col: 3,
                    },
                  },
                  {
                    title: '',
                    name: '',
                    formItem: {
                      render() {
                        return (
                          <div className='text-xl text-teal-900 font-bold mb-2.5'>Thông tin người đại diện</div>
                        )
                      }
                    }
                  },
                  {
                    title: 'store.ContactName',
                    name: 'nameContact',
                    formItem: {
                      col: 4,
                      rules: [{ type: 'required' }],
                    },
                  },
                  {
                    title: 'store.Contact Phone Number',
                    name: 'phoneNumber',
                    formItem: {
                      col: 4,
                      rules: [{ type: 'required' }],
                    },
                  },
                  {
                    title: 'store.Contact Email',
                    name: 'email',
                    formItem: {
                      col: 4,
                      rules: [{ type: 'required' }],
                    },
                  },
                  {
                    title: 'store.Note',
                    name: 'note',
                    formItem: {
                      type: 'textarea',
                    },
                  },
                  {
                    title: '',
                    name: '',
                    formItem: {
                      render() {
                        return (
                          <div className='flex items-center mb-2.5'>
                            <div className='text-xl text-teal-900 font-bold mr-6'>Kết nối KiotViet</div>
                            <Switch className='bg-gray-500' />
                          </div>
                        )
                      }
                    }
                  },

                ]}
                handSubmit={handleSubmit}
                disableSubmit={isLoading}
                handCancel={handleBack}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Danh sách hàng hóa' key='2' className='rounded-xl'>
              <DataTable
                facade={productFacede}
                defaultRequest={{ page: 1, perPage: 10, storeId: data?.id, type: 'BALANCE' }}
                xScroll='1440px'
                className=' bg-white p-5 rounded-lg'
                onRow={(data: any) => ({
                  onDoubleClick: () => {
                    navigate(routerLinks('store-managerment/edit') + '/' + data.id);
                  },
                })}
                showSearch={false}
                pageSizeRender={(sizePage: number) => sizePage}
                pageSizeWidth={'50px'}
                paginationDescription={(from: number, to: number, total: number) =>
                  t('routes.admin.Layout.PaginationProduct', { from, to, total })
                }
                columns={[
                  {
                    title: 'product.Code',
                    name: 'code',
                    tableItem: {
                      width: 150,
                      sorter: true,
                      filter: { type: 'search' }
                    },
                  },
                  {
                    title: 'product.StoreCode',
                    name: 'storeBarcode',
                    tableItem: {
                      sorter: true,
                      filter: { type: 'search' }
                    },
                  },
                  {
                    title: 'product.SupplierCode',
                    name: 'barcode',
                    tableItem: {
                      sorter: true,
                      filter: { type: 'search' }
                    },
                  },
                  {
                    title: 'product.Name',
                    name: 'name',
                    tableItem: {
                      sorter: true,
                      filter: { type: 'search' }
                    },
                  },
                  {
                    title: 'product.Category',
                    name: 'category',
                    tableItem: {
                      render: (value: any, item: any) => item.category?.child?.name
                    },
                  },
                  {
                    title: 'product.SupplierName',
                    name: 'supplierName',
                    tableItem: {
                    },
                  },
                  {
                    title: 'product.Unit',
                    name: 'basicUnit',
                    tableItem: {

                    },
                  },
                  {
                    title: 'product.Price',
                    name: 'productPrice',
                    tableItem: {
                      render: (text, item) => item.productPrice[0] ? item.productPrice[0]?.price.toLocaleString() : '0'
                    },
                  },
                ]}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Danh sách chi nhánh' key='3' className='rounded-xl'>
              <DataTable
                facade={subStoreFacade}
                defaultRequest={{ page: 1, perPage: 10, storeId: data?.id, supplierType: 'BALANCE' }}
                xScroll='1440px'
                className=' bg-white p-5 rounded-lg'
                onRow={(data: any) => ({
                  onDoubleClick: () => {
                    navigate(routerLinks('store/branch/edit') + '/' + data.id);
                  },
                })}
                pageSizeRender={(sizePage: number) => sizePage}
                pageSizeWidth={'50px'}
                paginationDescription={(from: number, to: number, total: number) =>
                  t('routes.admin.Layout.PaginationSubStore', { from, to, total })
                }
                columns={[
                  {
                    title: 'store.Code',
                    name: 'code',
                    tableItem: {
                      width: 120,
                    },
                  },
                  {
                    title: 'store.Name',
                    name: 'name',
                    tableItem: {
                    },
                  },
                  {
                    title: 'store.Address',
                    name: 'address',
                    tableItem: {
                      render: (value: any, item: any) => item.address?.street + ', ' + item.address?.wardName + ', ' + item.address?.districtName + ', ' + item.address?.provinceName,
                    },
                  },
                  {
                    title: 'store.ContactName',
                    name: 'peopleContact',
                    tableItem: {
                      render: (value: any, item: any) => item.peopleContact?.name,
                    },
                  },
                  {
                    title: 'store.Phone Number',
                    name: 'userpeopleContactRole',
                    tableItem: {
                      render: (value: any, item: any) => item.peopleContact?.phoneNumber,
                    },
                  },
                  {
                    title: 'Trạng thái',
                    name: 'isActive',
                    tableItem: {
                      render: (text: string) => text ? (<div className='bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded'>Đang hoạt động</div>)
                        : (<div className='bg-red-100 text-center p-1 border border-red-500 text-red-600 rounded'></div>),
                    },
                  },
                ]}
                rightHeader={
                  <div className={'block sm:flex gap-2 !bg-teal-900 !rounded-2xl mt-0 max-lg:mt-2.5 w-48 lg:w-auto'}>
                    <Button
                      className='!bg-teal-900 !h-9 !rounded-2xl'
                      icon={<Plus className="icon-cud !h-5 !w-5 !fill-slate-200 " />}
                      text={t('titles.Store/SubStore')}
                      onClick={() => navigate(routerLinks('store-managerment/create'))}
                    />
                  </div>
                }
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Quản lý NCC' key='4' className='rounded-xl'>
              <DataTable
                facade={connectSupplierFacade}
                defaultRequest={{ page: 1, perPage: 10, idSuppiler: id }}
                xScroll='1440px'
                className=' bg-white p-5 rounded-lg'
                onRow={(data: any) => ({
                  onDoubleClick: () => {
                    navigate(routerLinks('store-managerment/edit') + '/' + data.id);
                  },
                })}
                pageSizeRender={(sizePage: number) => sizePage}
                pageSizeWidth={'50px'}
                paginationDescription={(from: number, to: number, total: number) =>
                  t('routes.admin.Layout.PaginationSupplier', { from, to, total })
                }
                columns={[
                  {
                    title: 'supplier.CodeName',
                    name: 'supplier',
                    tableItem: {
                      width: 150,
                      render: (value: any, item: any) => item.supplier?.code,
                    },
                  },
                  {
                    title: 'supplier.Name',
                    name: 'supplier',
                    tableItem: {
                      render: (value: any, item: any) => item.supplier?.name,
                    },
                  },
                  {
                    title: 'store.Address',
                    name: 'supplier',
                    tableItem: {
                      render: (value: any, item: any) => item.supplier.address?.street + ', ' + item.supplier.address?.ward.name + ', ' + item.supplier.address?.district.name + ', ' + item.supplier.address?.province.name,
                    },
                  },
                  {
                    title: 'store.Name management',
                    name: 'supplier',
                    tableItem: {
                      render: (value: any, item: any) => item.supplier.userRole[0].userAdmin.name,
                    },
                  },
                  {
                    title: 'store.Phone Number',
                    name: 'supplier',
                    tableItem: {
                      render: (value: any, item: any) => item.supplier.userRole[0].userAdmin.phoneNumber,
                    },
                  },
                ]}
              />
            </Tabs.TabPane>
            {/* <Tabs.TabPane tab='Doanh thu' key='5' className='rounded-xl'>
              <DataTable
                facade={invoicevietFacade}
                defaultRequest={{ page: 1, perPage: 10, idSuppiler: id }}
                xScroll='1440px'
                className=' bg-white p-5 rounded-lg'
                onRow={(data: any) => ({
                  onDoubleClick: () => {
                    navigate(routerLinks('store-managerment/edit') + '/' + data.id);
                  },
                })}
                pageSizeRender={(sizePage: number) => sizePage}
                pageSizeWidth={'50px'}
                paginationDescription={(from: number, to: number, total: number) =>
                  t('routes.admin.Layout.PaginationSupplier', { from, to, total })
                }
                columns={[
                  // {
                  //   title: 'supplier.CodeName',
                  //   name: 'supplier',
                  //   tableItem: {
                  //     width: 150,
                  //     render: (value: any, item: any) => item.supplier?.code,
                  //   },
                  // },
                  // {
                  //   title: 'supplier.Name',
                  //   name: 'supplier',
                  //   tableItem: {
                  //     render: (value: any, item: any) => item.supplier?.name,
                  //   },
                  // },
                  // {
                  //   title: 'store.Address',
                  //   name: 'supplier',
                  //   tableItem: {
                  //     render: (value: any, item: any) => item.supplier.address?.street + ', ' + item.supplier.address?.ward.name + ', ' + item.supplier.address?.district.name + ', ' + item.supplier.address?.province.name,
                  //   },
                  // },
                  // {
                  //   title: 'store.Name management',
                  //   name: 'supplier',
                  //   tableItem: {
                  //     render: (value: any, item: any) => item.supplier.userRole[0].userAdmin.name,
                  //   },
                  // },
                  // {
                  //   title: 'store.Phone Number',
                  //   name: 'supplier',
                  //   tableItem: {
                  //     render: (value: any, item: any) => item.supplier.userRole[0].userAdmin.phoneNumber,
                  //   },
                  // },
                ]}
              />
            </Tabs.TabPane> */}
            <Tabs.TabPane tab='Quản lý kho' key='6' className='rounded-xl'>
            <DataTable
                facade={inventoryProductFacade.data}
                defaultRequest={{ page: 1, perPage: 10, idStore: id }}
                xScroll='1440px'
                className=' bg-white p-5 rounded-lg'
                pageSizeRender={(sizePage: number) => sizePage}
                pageSizeWidth={'50px'}
                paginationDescription={(from: number, to: number, total: number) =>
                  t('routes.admin.Layout.PaginationSubStore', { from, to, total })
                }
                columns={[
                  {
                    title: 'store.Code',
                    name: 'productCode',
                    tableItem: {
                      width: 120,
                      // render: (text, item) => 'a'&&console.log(item)
                    },
                  },
                  // {
                  //   title: 'store.Name',
                  //   name: 'name',
                  //   tableItem: {
                  //   },
                  // },
                  // {
                  //   title: 'store.Address',
                  //   name: 'address',
                  //   tableItem: {
                  //     render: (value: any, item: any) => item.address?.street + ', ' + item.address?.wardName + ', ' + item.address?.districtName + ', ' + item.address?.provinceName,
                  //   },
                  // },
                  // {
                  //   title: 'store.ContactName',
                  //   name: 'peopleContact',
                  //   tableItem: {
                  //     render: (value: any, item: any) => item.peopleContact?.name,
                  //   },
                  // },
                  // {
                  //   title: 'store.Phone Number',
                  //   name: 'userpeopleContactRole',
                  //   tableItem: {
                  //     render: (value: any, item: any) => item.peopleContact?.phoneNumber,
                  //   },
                  // },
                  // {
                  //   title: 'Trạng thái',
                  //   name: 'isActive',
                  //   tableItem: {
                  //     render: (text: string) => text ? (<div className='bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded'>Đang hoạt động</div>)
                  //       : (<div className='bg-red-100 text-center p-1 border border-red-500 text-red-600 rounded'></div>),
                  //   },
                  // },
                ]}
                // rightHeader={
                //   <div className={'block sm:flex gap-2 !bg-teal-900 !rounded-2xl mt-0 max-lg:mt-2.5 w-48 lg:w-auto'}>
                //     <Button
                //       className='!bg-teal-900 !h-9 !rounded-2xl'
                //       icon={<Plus className="icon-cud !h-5 !w-5 !fill-slate-200 " />}
                //       text={t('titles.Store/SubStore')}
                //       onClick={() => navigate(routerLinks('store-managerment/create'))}
                //     />
                //   </div>
                // }
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Fragment>
    </div>
  );
};
export default Page;
