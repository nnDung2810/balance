import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { UserRoleFacade, UserFacade } from '@reducers';
import { routerLinks } from '@utils';
import { Button, Form } from '@components';
import { ColumnFormUser } from './column';
import { User } from '../../../reducers/global';
import classNames from 'classnames';

const Page = () => {
  const { t } = useTranslation();
  const { result, get } = UserRoleFacade();
  const userFacade = UserFacade();
  const { data, isLoading, queryParams, status } = userFacade;
  const navigate = useNavigate();
  const isBack = useRef(true);
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();

  
  console.log("userFacade111",UserFacade());
  

  useEffect(() => {
    if (!result?.data) get({});

    if (id) userFacade.getById({ id });
    else userFacade.set({ data: {} });  

    return () => {
      isReload.current && userFacade.get(param);
    };
  }, [id]);

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
  const handleSubmit = (values: User) => {
    if (id) userFacade.put({ ...values, id });
    else userFacade.post(values);
  };

  return (
    <div className={'w-full'}>
      <Fragment>
        <div className='bg-white'>
          <div className='text-xl text-green-900 px-6 pt-4 font-mono font-bold'>
            Thông tin người dùng
          </div>
      {!!result?.data && (
        <Form
          values={{ ...data }}
          className="intro-x p-6 pb-4 pt-3 rounded-lg w-full "
          columns={ColumnFormUser({ t, listRole: result?.data || [] })}
          // handSubmit={handleSubmit}  
          disableSubmit={isLoading}
          // handCancel={handleBack}
          extendButton={() => (
            <div className='max-w-5xl flex justify-between mt-4'>
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
      )}
      </div>
      </Fragment>
    </div>
  );
};
export default Page;