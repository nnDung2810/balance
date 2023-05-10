import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Switch } from 'antd';

import { routerLinks } from '@utils';
import { Form } from '@core/form';
import { DistrictFacade, StoreFacade, WardFacade, ProvinceFacade, StoreManagement } from '@store';
import classNames from 'classnames';
import { DataTable } from '@core/data-table';

const Page = () => {
  const { t } = useTranslation();
  const provinceFacade = ProvinceFacade()
  const { result } = provinceFacade

  // const wardFacade = WardFacade()
  // const districtFacade = DistrictFacade()

  const storeFacade = StoreFacade()
  const { data, isLoading, queryParams, status } = storeFacade;

  const navigate = useNavigate();
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
            {tab === 'tab1' && !!result?.data && (
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
                      type: 'select',
                      rules: [{ type: 'required' }],
                      list: result.data.map((item: any) => ({
                        label: item?.name,
                        value: item?.code,
                      })),
                      onChange(value, form) {
                        form.resetFields(['district'])
                        DistrictFacade().get(`${value}`)
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
                          value: item.code,
                        }),
                      },
                      onChange(value, form, reRender) {
                        form.resetFields(['wardId'])
                        WardFacade().get(`${value}`)
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
                          value: item.code,
                        }),
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
                    name: 'emailContact',
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
            )}
            {/* Danh sách chi nhánh  */}
            <DataTable
              facade={storeFacade}
              defaultRequest={{ page: 1, perPage: 10, type: 'STORE' }}
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
                t('routes.admin.Layout.PaginationStore', { from, to, total })
              }
              columns={[
                {
                  title: 'store.Code',
                  name: 'code',
                  tableItem: {
                    width: 150,
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
                    render: (value: any, item: any) => item.address?.street + ', ' + item.address?.ward.name + ', ' + item.address?.district.name + ', ' + item.address?.province.name,
                  },
                },
                {
                  title: 'store.ContactName',
                  name: 'userRole',
                  tableItem: {
                    render: (value: any, item: any) => item.userRole[0]?.userAdmin.name,
                  },
                },
                {
                  title: 'store.Phone Number',
                  name: 'userRole',
                  tableItem: {
                    render: (value: any, item: any) => item.userRole[0]?.userAdmin.phoneNumber,
                  },
                },
                {
                  title: 'Trạng thái',
                  name: 'isMain',
                  tableItem: {
                    render: (text: string) => text ? 'Cửa hàng chính' : 'Cửa hàng chi nhánh'
                  },
                },
              ]}
            // rightHeader={
            //   <div className={'flex gap-2 !bg-teal-900 !rounded-lg mt-0 max-lg:mt-2.5 max-lg:w-48'}>
            //     <Button
            //       className='!bg-teal-900 !rounded-3xl'
            //       icon={<Plus className="icon-cud !h-5 !w-5 !fill-slate-200 " />}
            //       text={t('titles.Store/Add')}
            //       onClick={() => navigate(routerLinks('store-managerment/create'))}
            //     />
            //   </div>
            // }
            />
            {/* end */}
          </div>
          {/* ///// */}
        </div>
      </Fragment>
    </div>
  );
};
export default Page;
