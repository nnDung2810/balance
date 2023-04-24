import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { UserRoleFacade, UserFacade, CodeFacade } from '@reducers';
import { routerLinks } from '@utils';
import { Button } from '@components/button';
import { Form } from '@components/form';

import { GlobalFacade, User } from '../../../reducers/global';
import { ColumnFormUser } from './column';

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

  const {profile } = GlobalFacade();

  useEffect(() => {
    if (!result?.data) get({});

    if (id) userFacade.getById({ id });
    else userFacade.set({ data: undefined });
    profile();
    return () => {
      isReload.current && userFacade.get(param);
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
  const handleSubmit = (values: User) => {
    if (id) userFacade.put({ ...values, id });
    else userFacade.post(values);
  };
  const listRole = [
    {
      id: 1,
      label: t('ADMIN'),
    },
    {
      id: 2,
      label: t('OWNER_STORE'),
    },
    {
      id: 3,
      label: t('OWNER_SUPPLIER'),
    },
  ];
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
          columns={ColumnFormUser({ t, listRole})}
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
