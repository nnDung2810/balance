import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { SupplierRoleFacade, SupplierFacade, UserFacade } from '@reducers';
import { routerLinks } from '@utils';
import { Button, DataTable, Form } from '@components';
import { ColumnFormSupplierDetail, ColumnTableSupplierProduct } from './column';
import { GlobalFacade, User } from '../../../reducers/global';
import classNames from 'classnames';
import { TableRefObject } from '@models';
import { Download, Plus } from '@svgs';

const Page = () => {
  const { t } = useTranslation();
  const { result, get } = SupplierRoleFacade();
  const supplierFacade = SupplierFacade();
  const { data, isLoading, queryParams, status } = supplierFacade;
  const navigate = useNavigate();
  const isBack = useRef(true);
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();

  
  console.log("SupplierFacade",SupplierFacade());

  // console.log("data user",supplierFacade);
  // console.log("supplierFacade1",supplierFacade1);

  useEffect(() => {
    if (!result?.data) get({});

    if (id) supplierFacade.getById({ id });
    else supplierFacade.set({ data: {} });

    return () => {
      isReload.current && supplierFacade.get(param);
    };
  }, [id]);

  useEffect(() => {
    switch (status) {
      case 'post.fulfilled':
        navigate(routerLinks('Supplier') + '/' + data?.id);
        break;
      case 'put.fulfilled':
        if (Object.keys(param).length > 0) isReload.current = true;

        if (isBack.current) handleBack();
        else {
          isBack.current = true;
          if (status === 'put.fulfilled') navigate(routerLinks('Supplier/Add'));
        }
        break;
    }
  }, [status]);

  const [tab, setTab] = useState('tab1');
  const { user } = GlobalFacade();
  const dataTableRef = useRef<TableRefObject>(null);


  const handleBack = () => navigate(routerLinks('Supplier') + '?' + new URLSearchParams(param).toString());
  const handleSubmit = (values: User) => {
    if (id) supplierFacade.put({ ...values, id });
    else supplierFacade.post(values);
  };
  return (
    <div className={'w-full'}>
      <Fragment>
        <div className='flex'>
          <div className='flex overflow-hidden whitespace-nowrap cursor-pointer select-none'>
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
          </div>
          <div className='flex justify-center text-center'>
            <button className='py-2 px-4 cursor-pointer h-full border-l-2 border-l-gray-200 text-xl'>
              ...
            </button>
          </div>
        </div>
        <div className='bg-white rounded-xl rounded-tl-none'>
        {tab === 'tab1' && (
          !!result?.data && (
            <Form
              values={{ ...data }}
              className="intro-x p-6 pb-4 pt-6 rounded-lg w-full "
              columns={ColumnFormSupplierDetail({ t, listRole: result?.data || [] })}
              handSubmit={handleSubmit}
              disableSubmit={isLoading}
              handCancel={handleBack}
            />
          ) )
        }
        {tab === 'tab2' && (
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
              rightHeader={
                <div className={'flex gap-2'}>
                  {user && (
                    <Button
                      className='!bg-white !border !border-gray-600 !text-gray-600 hover:!bg-teal-900 hover:!text-white group'
                      icon={<Download className="icon-cud !h-5 !w-5 !fill-gray-600 group-hover:!fill-white" />}
                      text={t('Xuất file excel')}
                      onClick={() => navigate(routerLinks('Supplier/Excel'))}
                    />
                  )}
                </div>
              }
              showSearch={false}
            />
          ) )
        }
        {tab === 'tab3' && (
          !!result?.data && (
            <Form
              values={{ ...data }}
              className="intro-x p-6 pb-4 pt-6 rounded-lg w-full "
              columns={ColumnFormSupplierDetail({ t, listRole: result?.data || [] })}
              handSubmit={handleSubmit}
              disableSubmit={isLoading}
              handCancel={handleBack}
            />
          ) )
        }
        {tab === 'tab4' && (
          !!result?.data && (
            <Form
              values={{ ...data }}
              className="intro-x p-6 pb-4 pt-6 rounded-lg w-full "
              columns={ColumnFormSupplierDetail({ t, listRole: result?.data || [] })}
              handSubmit={handleSubmit}
              disableSubmit={isLoading}
              handCancel={handleBack}
            />
          ) )
        }
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
