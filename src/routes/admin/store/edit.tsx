import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { StoreFacade } from '@reducers';
import { routerLinks } from '@utils';
import { Form } from '@components/form';
import { Button } from '@components/button';
import classNames from 'classnames';
import { ColumnFormStore } from './column';
import { StoreManagement } from 'src/reducers/store-management';
import { ProvinceFacade } from 'src/reducers/address/province';

const Page = () => {
  //
  const provinceFacade = ProvinceFacade()
  const { result } = provinceFacade
  //
  const storeFacade = StoreFacade()
  const { data, isLoading, queryParams, status } = storeFacade;
  //
  const navigate = useNavigate();
  const isBack = useRef(true);
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();
  
  useEffect(() => {
    if(result?.data) provinceFacade.get({})

    if (id) storeFacade.getById1({ id });
    else storeFacade.set({ data: {} });
    console.log(data)
    return () => {
      isReload.current && storeFacade.get(param);
    };
  }, [id, data]);

  useEffect(() => {
    switch (status) {
      case 'post.fulfilled':
        navigate(routerLinks('User') + '/' + data?.id);
        break;
      case 'put.fulfilled':
        if (Object.keys(param).length > 0) isReload.current = true;

        if (isBack.current) handleBack();
        else {
          isBack.current = true;
          if (status === 'put.fulfilled') navigate(routerLinks('User/Add'));
        }
        break;
    }
  }, [status]);

  const handleBack = () => navigate(routerLinks('User/List') + '?' + new URLSearchParams(param).toString());
  const handleSubmit = (values: StoreManagement) => {
    if (id) storeFacade.put({ ...values, id });
    else storeFacade.post(values);
  };

  return (
    <div className={'w-full'}>
      <Fragment>
        <div className=''>
          <div className='text-2xl text-teal-900 p-3.5 pt-4 font-bold bg-white w-max rounded-t-2xl'>
            Thông tin cửa hàng
          </div>
      {!!result?.data && (
        <Form
          values={{ ...data }}
          className="intro-x p-6 pb-4 pt-3 rounded-lg w-full "
          columns={ColumnFormStore({listProvince: result.data || []})}
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
