import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Form } from '@components/form';
import { DataTable } from '@components/data-table';
import { Button } from '@components/button';
import { routerLinks } from '@utils';
import { UserFacade, GlobalFacade, StoreFacade } from '@reducers';
import { Plus } from '@svgs';
import { ColumnFormStore } from './column';
import { FormModel, TableRefObject } from '@models';
import { StoreManagement } from 'src/reducers/store-management';

const Page = () => {
  const { t } = useTranslation();
  // const { formatDate, user } = GlobalFacade();
  const navigate = useNavigate();
  const isReload = useRef(false);
  const storeFace = StoreFacade();
  const { result, isLoading, queryParams, status } = storeFace;
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();

  useEffect(() => {
    if (id) storeFace.getById({ id });
    else storeFace.set({ data: undefined });
    console.log(result?.data)
    return () => {
      isReload.current && storeFace.getById(param);
    };
  }, [id]);
  const handleBack = () => navigate(routerLinks('Store') + '?' + new URLSearchParams(param).toString());
  const handleSubmit = (values: StoreManagement) => {
    // if (id) userFacade.put({ ...values, id });
    // else userFacade.post(values);
  };
  return (
    <div className={'w-full mx-auto bg-white rounded-xl'}>
      <div className='p-5'>

      {/* {!!result?.data &&  */}
        <Form
          values={{ ...result }}
          className="intro-x"
          columns={ColumnFormStore()}
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
          handSubmit={handleSubmit}
          disableSubmit={isLoading}
          handCancel={handleBack}
        />
      </div>
    </div>
  );
};
export default Page;
