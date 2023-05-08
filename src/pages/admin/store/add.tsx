import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Form } from '@core/form';
import { Button } from '@core/button';
import { routerLinks } from '@utils';
import { ProvinceFacade, StoreFacade } from '@store';
import { ColumnFormStoreAdd } from './column';

const Page = () => {
  const { t } = useTranslation();
  // const { formatDate, user } = GlobalFacade();
  const navigate = useNavigate();
  const isReload = useRef(false);

  const provinceFacade = ProvinceFacade()
  const { result } = provinceFacade

  const storeFace = StoreFacade();
  const { isLoading, queryParams, status } = storeFace;
  const param = JSON.parse(queryParams || '{}');

  useEffect(() => {
    if (!result?.data) provinceFacade.get({})
  }, []);

  const handleBack = () => navigate(routerLinks('Store') + '?' + new URLSearchParams(param).toString());
  const handleSubmit = (values: any) => {
    storeFace.post(values);
  };
  return (
    <div className={'w-full mx-auto bg-white rounded-xl'}>
      <div className='text-2xl text-teal-900 p-3.5 pt-4 font-bold bg-white w-max rounded-t-2xl'>
        Thông tin cửa hàng
      </div>
      <div className='p-5 bg-white'>
        {!!result?.data &&
          <Form
            values={{ ...result }}
            className="intro-x "
            columns={ColumnFormStoreAdd({ listProvince: result.data || [] })}
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
        }
      </div>
    </div>
  );
};
export default Page;
