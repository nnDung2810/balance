import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Switch } from 'antd';

import { routerLinks } from '@utils';
import { Form } from '@core/form';
import { DistrictFacade, StoreFacade, WardFacade, ProvinceFacade, StoreManagement, SubStoreFacade, ConnectSupplierFacade, invoicekiotvietFacade, inventoryProductFacade } from '@store';
import classNames from 'classnames';
import { DataTable } from '@core/data-table';
import { Button } from '@core/button';
import { Plus } from '@svgs';
//import { inventoryProductFacade } from '../../store/store-management/inventory-product/index';

const Page = () => {
  const { t } = useTranslation();
  // const provinceFacade = ProvinceFacade()
  // const { result } = provinceFacade

  // const wardFacade = WardFacade()
  // const districtFacade = DistrictFacade()

  const storeFacade = StoreFacade()
  const { data, isLoading, queryParams, status } = storeFacade;

  const subStoreFacade = SubStoreFacade()
  const connectSupplierFacade = ConnectSupplierFacade()

  const navigate = useNavigate();
  const provinceFacade = ProvinceFacade()
  const { result } = provinceFacade;

  const inventoryproductFacade = inventoryProductFacade();
  const invoicevietFacade = invoicekiotvietFacade()

  const isBack = useRef(true);
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();

  useEffect(() => {
    if (!result?.data) provinceFacade.get({})

    if (id) storeFacade.getById({ id });

    return () => {
      isReload.current && storeFacade.get(param);
    };
  }, [id, data]);

  // useEffect(() => {
  //   switch (status) {
  //     case 'post.fulfilled':
  //       navigate(routerLinks('User') + '/' + data?.id);
  //       break;
  //     case 'put.fulfilled':
  //       if (Object.keys(param).length > 0) isReload.current = true;

  //       if (isBack.current) handleBack();
  //       else {
  //         isBack.current = true;
  //         if (status === 'put.fulfilled') navigate(routerLinks('User/Add'));
  //       }
  //       break;
  //   }
  // }, [status]);

  const [tab, setTab] = useState('tab1')

  const handleBack = () => navigate(routerLinks('Store') + '?' + new URLSearchParams(param).toString());
  const handleSubmit = (values: StoreManagement) => {
    storeFacade.put(values);
  };

  return (
    <div className={'w-full'}>
      <Fragment>
        <div className=''>
          <div className='flex'>
            <div className={classNames('text-xl text-teal-900 p-3.5 pt-4 font-bold bg-transparent w-max rounded-t-2xl', { '!bg-white': tab === 'tab1' })}>
              <button className='' onClick={() => setTab('tab1')}>Thông tin cửa hàng</button>
            </div>
            <div className={classNames('text-xl text-teal-900 p-3.5 pt-4 font-bold bg-transparent w-max rounded-t-2xl', { '!bg-white': tab === 'tab2' })}>
              <button className='' onClick={() => setTab('tab2')}>Danh sách hàng hóa</button>
            </div>
            <div className={classNames('text-xl text-teal-900 p-3.5 pt-4 font-bold bg-transparent w-max rounded-t-2xl', { '!bg-white': tab === 'tab3' })}>
              <button className='' onClick={() => setTab('tab3')}>Danh sách chi nhánh</button>
            </div>
            <div className={classNames('text-xl text-teal-900 p-3.5 pt-4 font-bold bg-transparent w-max rounded-t-2xl', { '!bg-white': tab === 'tab4' })}>
              <button className='' onClick={() => setTab('tab4')}>Quản lý NCC</button>
            </div>
            <div className={classNames('text-xl text-teal-900 p-3.5 pt-4 font-bold bg-transparent w-max rounded-t-2xl', { '!bg-white': tab === 'tab5' })}>
              <button className='' onClick={() => setTab('tab5')}>Doanh thu</button>
            </div>
            <div className={classNames('text-xl text-teal-900 p-3.5 pt-4 font-bold bg-transparent w-max rounded-t-2xl', { '!bg-white': tab === 'tab6' })}>
              <button className='' onClick={() => setTab('tab6')}>Quản lý kho</button>
            </div>
          </div>
          <div className='bg-white rounded-2xl rounded-t-none'>
            {tab === 'tab1' && (
              !!result?.data && (
                <Form
                  key={'tab1'}
                  values={{
                    ...data, street: data?.address?.street, province: data?.address?.province?.name, district: data?.address?.district?.name, ward: data?.address?.ward?.name,
                    username: data?.userRole?.[0].userAdmin.name, email: data?.userRole?.[0].userAdmin.email, phoneNumber: data?.userRole?.[0].userAdmin.phoneNumber
                  }}
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
                      name: 'name',
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
              ))}
            {/* Danh sách chi nhánh  */}
            {tab === 'tab3' && (
              <DataTable
                facade={subStoreFacade}
                defaultRequest={{ page: 1, perPage: 10, storeId: data?.id, supplierType: 'BALANCE' }}
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
                  <div className={'flex gap-2 !bg-teal-900 !rounded-lg mt-0 max-lg:mt-2.5 max-lg:w-48'}>
                    <Button
                      className='!bg-teal-900 !rounded-full !h-9'
                      icon={<Plus className="icon-cud !h-5 !w-5 !fill-slate-200 " />}
                      text={t('titles.Store/SubStore')}
                      onClick={() => navigate(routerLinks('store-managerment/create'))}
                    />
                  </div>
                }
              />
            )}

            {/* Quản lý NCC */}
            {tab === 'tab4' && (
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
            )}

            {/* Quản lý kho */}
            {tab === 'tab5' && (
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
            )}
            {/* {tab === 'tab6' && (
              <DataTable
                facade={inventoryproductFacade}
                defaultRequest={{ page: 1, perPage: 10, idStore:id }}
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
                    title: 'store.Inventory management.Product code',
                    name: 'inventory.productCode',
                    tableItem: {
                      width: 150,
                      // render
                    },
                  },
                  // {
                  //   title: 'store.Inventory management.Barcode (Supplier)',
                  //   name: 'supplierBarcode',
                  //   tableItem: {

                  //   },
                  // },
                  // {
                  //   title: 'store.Inventory management.Barcode (Product)',
                  //   name: 'storeBarcode',
                  //   tableItem: {
                  //   },
                  // },
                  // {
                  //   title: 'store.Inventory management.Product name',
                  //   name: 'productName',
                  //   tableItem: {

                  //   },
                  // },
                  // {
                  //   title: 'store.Inventory management.Category',
                  //   name: 'category',
                  //   tableItem: {

                  //   },
                  // },
                  // {
                  //   title: 'store.Inventory management.Supplier',
                  //   name: 'supplierName',
                  //   tableItem: {

                  //   },
                  // },
                  // {
                  //   title: 'store.Inventory management.Unit',
                  //   name: 'name',
                  //   tableItem: {

                  //   },
                  // },
                  // {
                  //   title: 'store.Inventory management.Quantity on KiotViet',
                  //   name: 'numberInKiot',
                  //   tableItem: {

                  //   },
                  // },
                  // {
                  //   title: 'store.Inventory management.Quantity on BALANCE',
                  //   name: 'numberInBal',
                  //   tableItem: {

                  //   },
                  // },
                  // {
                  //   title: 'store.Inventory management.Warehouse price',
                  //   name: 'inventoryPrice',
                  //   tableItem: {

                  //   },
                  // },
                  // {
                  //   title: 'store.Inventory management.Total amount',
                  //   name: 'numberInKiot*numberInBal*inventoryPrice',
                  //   tableItem: {

                  //   },
                  // },
                ]}
              />
            )} */}
          </div>
          {/* ///// */}
        </div>
      </Fragment>
    </div>
  );
};
export default Page;
