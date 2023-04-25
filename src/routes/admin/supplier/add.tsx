import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { SupplierRoleFacade, SupplierFacade, UserRoleFacade } from '@reducers';
import { routerLinks } from '@utils';
import { Form } from '@components/form';
import { Button } from '@components/button';
import { ColumnFormSupplier, ColumnFormSupplier1, ColumnFormSupplier2, ColumnFormSupplier3 } from './column';
import { User } from '../../../reducers/global';

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

  // console.log("result",result);
  // console.log("supplierFacade",supplierFacade);


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

  const handleBack = () => navigate(routerLinks('Supplier') + '?' + new URLSearchParams(param).toString());
  const handleSubmit = (values: User) => {
    if (id) supplierFacade.put({ ...values, id });
    else supplierFacade.post(values);
  };

  return (
    <div className={'max-w-7xl mx-auto'}>
      <div className=' pr-5 h-full pb-10'>
        <div className='bg-white rounded-xl p-4 pb-10 relative text-center '>
          <div>
            <p className='text-xl text-left font-bold text-teal-900 py-5'>
              Thông tin nhà cung cấp
            </p>
          </div>
          {!!result?.data && (
            <div>
              <Form
                values={{ ...data }}
                className="intro-x"
                columns={ColumnFormSupplier({ t, listRole: result?.data || [] })}
                // extendButton={(form) => (
                //   <Button
                //     text={t('components.button.Save and Add new')}
                //     className={'md:min-w-[12rem] w-full justify-center out-line'}
                //     onClick={() => {
                //       form.submit();
                //       isBack.current = false;
                //     }}
                //   />
                // )}
                // handSubmit={handleSubmit}
                disableSubmit={isLoading}
                // handCancel={handleBack}
                extendButton={() => (
                  <div className='max-w-7xl flex items-center absolute -right-4 -left-4 justify-between mt-4'>
                    <button className={'text-teal-900 bg-white border-solid border border-teal-900 rounded-xl p-2 w-auto h-11 px-8'}
                    onClick={handleBack}>
                      {t('Trở về')}
                    </button>
                    <button className={'text-white bg-teal-900 border-solid border rounded-xl p-2 w-auto h-11 px-8'}
                    onClick={() => handleSubmit}>
                      {t('Lưu')}
                    </button>
                  </div>
                 )}
              />
              {/* <Form
                values={{ ...data }}
                className=""
                columns={ColumnFormSupplier1({ t, listRole: result?.data || [] })}
              />
              <p className='text-base text-left mb-4 text-black'>Địa chỉ nhà cung cấp</p>
              <Form
                values={{ ...data }}
                className="intro-x"
                columns={ColumnFormSupplier2({ t, listRole: result?.data || [] })}
              />
              <p className='text-xl font-bold text-left mb-5 text-black'>Thông tin người đại diện</p>
              <Form
                values={{ ...data }}
                className="intro-x"
                columns={ColumnFormSupplier3({ t, listRole: result?.data || [] })}
                // extendButton={(form) => (
                //   <Button
                //     text={t('components.button.Save and Add new')}
                //     className={'md:min-w-[12rem] w-full justify-center out-line'}
                //     onClick={() => {
                //       form.submit();
                //       isBack.current = false;
                //     }}
                //   />
                // )}
                // handSubmit={handleSubmit}
                disableSubmit={isLoading}
                // handCancel={handleBack}
                extendButton={() => (
                  <div className='w-7xl flex justify-between mt-4'>
                    <button className={'text-teal-900 bg-white border-solid border border-teal-900 rounded-xl p-2 w-auto h-11 px-8'}
                    onClick={handleBack}>
                      {t('Trở về')}
                    </button>
                    <button className={'text-white bg-teal-900 border-solid border rounded-xl p-2 w-auto h-11 px-8'}
                    onClick={() => handleSubmit}>
                      {t('Lưu')}
                    </button>
                  </div>
                 )}
              /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Page;
