import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import classNames from 'classnames';
import { ColumnFormSupplier, ColumnFormSupplierDetail, ColumnTableSupplierDiscount, ColumnTableSupplierProduct } from './column';
import { SupplierFacade } from '@store/supplier';
import { DistrictFacade } from '@store/address/district';
import { WardFacade } from '@store/address/ward';
import { routerLinks } from '@utils';
import { GlobalFacade, ProductFacade, User } from '@store';
import { TableRefObject } from '@models';
import { Form } from '@core/form';
import { DataTable } from '@core/data-table';
import { Button } from '@core/button';
import { ProvinceFacade } from '@store/address/province';
import { Download } from '@svgs';

const Page = () => {
  const { t } = useTranslation();

  const provinceFacade = ProvinceFacade()
  const { result } = provinceFacade
  const supplierFacade = SupplierFacade();
  const { data, isLoading, queryParams, status } = supplierFacade;
  const navigate = useNavigate();
  const isBack = useRef(true);
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();
  


  useEffect(() => {
    if (!result?.data) provinceFacade.get({})

    if (id) supplierFacade.getById({ id });

    return () => {
      isReload.current && supplierFacade.get(param);
    };
  }, [id, data]);

  useEffect(() => {
    switch (status) {
      case 'post.fulfilled':
        navigate(routerLinks('Supplier') + '/' + data?.id);
        break;
      case 'put.fulfilled':
        if (Object.keys(param).length > 0) isReload.current = true;

        if (isBack.current) handleBack();
        break;
    }
  }, [status]);

  const [tab, setTab] = useState('tab1');
  const { user } = GlobalFacade();
  const dataTableRef = useRef<TableRefObject>(null);

  const productFacede = ProductFacade();


  const handleBack = () => navigate(routerLinks('Supplier') + '?' + new URLSearchParams(param).toString());
  const handleSubmit = (values: any) => {
    if (id) supplierFacade.put({ ...values, id });
    else supplierFacade.post(values);
  };
  const test = [
    {
      title: 'Thông tin nhà cung cấp',
      tab: 'tab1'
    },
    {
      title: 'Danh sách hàng hoá',
      tab: 'tab2'
    },
    {
      title: 'Quản lý đơn hàng',
      tab: 'tab3'
    },
    {
      title: 'Doanh thu',
      tab: 'tab4'
    },
    {
      title: 'Chiết khấu',
      tab: 'tab5'
    },
    {
      title: 'Hợp đồng',
      tab: 'tab6'
    },
  ]

  return (
    <div className={'w-full'}>
      <Fragment>
        <div className='flex'>
          <div className='flex overflow-hidden whitespace-nowrap cursor-pointer select-none'>
            {test.map((e) => (
              <div onClick={() => setTab(e.tab)} className={classNames(
              { 'bg-white text-xl text-teal-900 px-5 py-4 font-bold rounded-t-xl' : tab === e.tab,
                'bg-gray-100 text-xl text-teal-900 px-5 py-4 font-bold rounded-t-xl' : tab !== e.tab})}>
              {e.title}
            </div>
            ))}
          </div>
          {/* <div className='flex overflow-hidden whitespace-nowrap cursor-pointer select-none'>
            <div onClick={() => setTab('tab1')} className={classNames(
              { 'bg-white text-xl text-teal-900 px-5 py-4 font-bold rounded-t-xl' : tab === 'tab1',
                'bg-gray-100 text-xl text-teal-900 px-5 py-4 font-bold rounded-t-xl' : tab !== 'tab1'})}>
              Thông tin nhà cung cấp
            </div>
            <div onClick={() => setTab('tab2')} className={classNames(
              { 'bg-white text-xl text-teal-900 px-5 py-4 font-bold rounded-t-xl' : tab === 'tab2',
                'bg-gray-100 text-xl text-teal-900 px-5 py-4 font-bold rounded-t-xl' : tab !== 'tab2'})}>
              Danh sách hàng hoá
            </div>
            <div onClick={() => setTab('tab3')} className={classNames(
              { 'bg-white text-xl text-teal-900 px-5 py-4 font-bold rounded-t-xl' : tab === 'tab3',
                'bg-gray-100 text-xl text-teal-900 px-5 py-4 font-bold rounded-t-xl' : tab !== 'tab3'})}>
              Quản lý đơn hàng
            </div>
            <div onClick={() => setTab('tab4')} className={classNames(
              { 'bg-white text-xl text-teal-900 px-5 py-4 font-bold rounded-t-xl' : tab === 'tab4',
                'bg-gray-100 text-xl text-teal-900 px-5 py-4 font-bold rounded-t-xl' : tab !== 'tab4'})}>
              Doanh thu
            </div>
            <div onClick={() => setTab('tab5')} className={classNames(
              { 'bg-white text-xl text-teal-900 px-5 py-4 font-bold rounded-t-xl' : tab === 'tab5',
                'bg-gray-100 text-xl text-teal-900 px-5 py-4 font-bold rounded-t-xl' : tab !== 'tab5'})}>
              Chiết khấu
            </div>
            <div onClick={() => setTab('tab6')} className={classNames(
              { 'bg-white text-xl text-teal-900 px-5 py-4 font-bold rounded-t-xl' : tab === 'tab6',
                'bg-gray-100 text-xl text-teal-900 px-5 py-4 font-bold rounded-t-xl' : tab !== 'tab6'})}>
              Hợp đồng
            </div>
          </div> */}
          <div className='xl:hidden flex justify-center text-center'>
            <button className='py-2 px-4 cursor-pointer h-full border-l-2 border-l-gray-200 text-xl'>
              ...
            </button>
          </div>
        </div>
        <div className='bg-white px-5 rounded-xl rounded-tl-none'>
        {tab === 'tab1' && (
          !!result?.data && (
            <Form
              key={'tab1'}
              values={{ ...data, street: data?.address?.street, province: data?.address?.province?.name, district: data?.address?.district?.name, ward: data?.address?.ward?.name,
              username: data?.userRole?.[0].userAdmin.name, email: data?.userRole?.[0].userAdmin.email, phoneNumber: data?.userRole?.[0].userAdmin.phoneNumber  }}
              className="intro-x pt-6 rounded-lg w-full "
              columns={ColumnFormSupplierDetail({ t, listRole: result?.data || []})}
              // handSubmit={handleSubmit}
              disableSubmit={isLoading}
              extendButton={() => (
                    <div className='w-full flex mt-8 justify-between'>
                      <button className='sm:w-28 h-11 rounded-xl bg-white hover:text-teal-700 text-teal-900 border-teal-900 hover:border-teal-600 border'
                      onClick={handleBack}>
                        {t('components.form.modal.cancel')}
                      </button>
                      <button className='sm:w-44 h-11 rounded-xl text-white bg-teal-900 hover:bg-teal-600'
                      onClick={handleSubmit}>
                        {t('components.form.modal.save')}
                      </button>
                    </div>
                  )}
            />
          ) )
        }
        {tab === 'tab2' && (
          <div className={'w-full mx-auto bg-white rounded-xl'}>
          {!!result?.data && (
            <div className='px-1 pt-6 pb-4'>
              <DataTable
              facade={productFacede}
              defaultRequest={{page: 1, perPage: 10,type: "BALANCE"}}
              ref={dataTableRef}
              xScroll = '895px'
              pageSizeRender={(sizePage: number) => sizePage}
              pageSizeWidth={'50px'}
              paginationDescription={(from: number, to: number, total: number) =>
                t('routes.admin.Layout.Pagination', { from, to, total })
              }
              columns={ColumnTableSupplierProduct({
                t,
                navigate,
                dataTableRef,
              })}
              rightHeader={
                <div className={'flex h-10 w-36'}>
                  {user && (
                    <Button
                      className='!bg-white !font-normal whitespace-nowrap text-left flex justify-between w-full !px-3 !border !border-gray-600 !text-gray-600 hover:!bg-teal-900 hover:!text-white group'
                      icon={<Download className="icon-cud !p-0 !h-5 !w-5 !fill-gray-600 group-hover:!fill-white" />}
                      text={t('Xuất file excel')}
                      onClick={() => navigate(routerLinks('Supplier/Excel'))}
                    />
                  )}
                </div>
              }
              leftHeader={
                <div>aaaaaaaaaaaaaa</div>
              }
              showSearch={false}
              />
            </div>
          )} </div>)
        }
        {tab === 'tab3' && (
          !!result?.data && (
            <DataTable
              // facade={supplierFacade}
              ref={dataTableRef}
              xScroll = '1440px'
              pageSizeRender={(sizePage: number) => sizePage}
              pageSizeWidth={'50px'}
              paginationDescription={(from: number, to: number, total: number) =>
                t('routes.admin.Layout.Pagination', { from, to, total })
              }
              columns={ColumnTableSupplierProduct({
                t,
                navigate,
                dataTableRef,
              })}
            />
          ) )
        }
        {tab === 'tab4' && (
          !!result?.data && (
            <Form
              key={'tab1'}
              values={{ ...data, street: data?.address?.street, province: data?.address?.province?.name, district: data?.address?.district?.name, ward: data?.address?.ward?.name,
              username: data?.userRole?.[0].userAdmin.name, email: data?.userRole?.[0].userAdmin.email, phoneNumber: data?.userRole?.[0].userAdmin.phoneNumber  }}
              className="intro-x pt-6 rounded-lg w-full "
              columns={ColumnFormSupplierDetail({ t, listRole: result?.data || []})}
              // handSubmit={handleSubmit}
              disableSubmit={isLoading}
              extendButton={() => (
                    <div className='w-full flex mt-8 justify-between'>
                      <button className='sm:w-28 h-11 rounded-xl bg-white hover:text-teal-700 text-teal-900 border-teal-900 hover:border-teal-600 border'
                      onClick={handleBack}>
                        {t('components.form.modal.cancel')}
                      </button>
                      <button className='sm:w-44 h-11 rounded-xl text-white bg-teal-900 hover:bg-teal-600'
                      onClick={handleSubmit}>
                        {t('components.form.modal.save')}
                      </button>
                    </div>
                  )}
            />
          ) )
        }
        {tab === 'tab5' && (
          !!result?.data && (
            <DataTable
              // facade={supplierFacade}
              ref={dataTableRef}
              xScroll = '1440px'
              pageSizeRender={(sizePage: number) => sizePage}
              pageSizeWidth={'50px'}
              paginationDescription={(from: number, to: number, total: number) =>
                t('routes.admin.Layout.Pagination', { from, to, total })
              }
              columns={ColumnTableSupplierDiscount({
                t,
                navigate,
                dataTableRef,
              })}
              showSearch={false}
              rightHeader={
                <div className={'flex h-10 w-36'}>
                  {user && (
                    <Button
                      className='!bg-white flex justify-between w-full !px-3 !border !border-gray-600 !text-gray-600 hover:!bg-teal-900 hover:!text-white group'
                      // icon={<Download className="icon-cud !h-6 !w-6 !fill-gray-600 group-hover:!fill-white" />}
                      text={t('Xuất file excel')}
                      onClick={() => navigate(routerLinks('Supplier/Excel'))}
                    />
                  )}
                </div>
              }
            />
          ) )
        }
        </div>
        { tab !== 'tab1' && tab !== 'tab6' && tab !== 'tab4' && (
          <div className='w-full flex mt-8 justify-between'>
          <button className='sm:w-28 h-11 rounded-xl bg-white hover:text-teal-700 text-teal-900 border-teal-900 hover:border-teal-600 border'
          onClick={handleBack}>
            {t('components.form.modal.cancel')}
          </button>
        </div>
        )}
        <div className='h-20'>
        </div>
      </Fragment>
    </div>
    // <div className={'max-w-7xl mx-auto'}>
    //   <div className=' pr-5 h-full pb-10'>
    //     <div className='bg-white rounded-xl px-4 relative text-center '>
    //       <div>
    //         <p className='text-xl text-left font-bold text-teal-900 py-5'>
    //           Thông tin nhà cung cấp  
    //         </p>
    //       </div>
    //       {!!result?.data && (
    //         <div>
    //           <Form
    //             values={{ ...data }}
    //             className="intro-x"
    //             columns={ColumnFormSupplierDetail({ t, listRole: result?.data || [] })}
    //             disableSubmit={isLoading}
    //             extendButton={() => (
    //               <div className='max-w-7xl flex items-center absolute -right-4 -left-4 justify-between mt-4'>
    //                 <button className={'text-teal-900 bg-white border-solid border border-teal-900 rounded-xl p-2 w-auto h-11 px-8'} 
    //                 onClick={handleBack}>
    //                   {t('Trở về')}
    //                 </button>
    //                 <button className={'text-white bg-teal-900 border-solid border rounded-xl p-2 w-auto h-11 px-8'} 
    //                 onClick={() => handleSubmit}>
    //                   {t('Lưu')}
    //                 </button>
    //               </div>
    //              )}
    //           />
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};
export default Page;
