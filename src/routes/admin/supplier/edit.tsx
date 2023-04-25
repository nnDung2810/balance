import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { UserRoleFacade, UserFacade, SupplierRoleFacade, SupplierFacade } from '@reducers';
import { routerLinks } from '@utils';
import { Button, Form } from '@components';
import { ColumnFormSupplierDetail, ColumnFormSupplierProduct } from './column';
import { User } from '../../../reducers/global';
import classNames from 'classnames';

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

  const tab = useState(2);

  useEffect(() => {
    if (!result?.data) get({});

    if (id) supplierFacade.getById({ id });
    else supplierFacade.set({ data: {} });

    return () => {
      isReload.current && supplierFacade.get(param);
    };
  }, [id, data]);

  useEffect(() => {
    switch (status) {
      case 'post.fulfilled':
        navigate(routerLinks('Supplier') + '/' + data?.id + '/');
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
  const test = false;
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
            <div key={1} className='bg-white text-xl text-teal-900 px-5 py-4 font-bold rounded-t-xl'>
              Thông tin nhà cung cấp
            </div>
            <div className='bg-gray-100 text-xl text-teal-900 px-5 py-4 font-bold rounded-t-xl'>
              Danh sách hàng hoá
            </div>
            <div className='bg-gray-100 text-xl text-teal-900 px-5 py-4 font-bold rounded-t-xl'>
              Quản lý đơn hàng
            </div>
            <div className='bg-gray-100 text-xl text-teal-900 px-5 py-4 font-bold rounded-t-xl'>
              Doanh thu
            </div>
            <div className='bg-gray-100 text-xl text-teal-900 px-5 py-4 font-bold rounded-t-xl'>
              Chiết khấu
            </div>
            <div className='bg-gray-100 text-xl text-teal-900 px-5 py-4 font-bold rounded-t-xl'>
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
        {!!result?.data && (
        <Form
          values={{ ...data }}
          className="intro-x p-6 pb-4 pt-3 rounded-lg w-full "
          columns={ColumnFormSupplierDetail({ t, listRole: result?.data || [] })}
          handSubmit={handleSubmit}
          disableSubmit={isLoading}
          handCancel={handleBack}
        />
        )}
        </div>
      </Fragment>
    </div>
  );
};
export default Page;