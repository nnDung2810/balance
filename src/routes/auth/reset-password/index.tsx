import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router';
import { Spin } from '@components';
import Form from '../../../components/form';
import { routerLinks } from '@utils';
import { ColumnResetPassword } from '@columns';
import { globalAction, useAppDispatch, useTypedSelector } from '@reducers';

const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { search } = useLocation();

  const { isLoading, status } = useTypedSelector((state: any) => state[globalAction.name]);

  useEffect(() => {
    if (status === 'resetPassword.fulfilled') {
      navigate(routerLinks('Login'), { replace: true });
    }
  }, [status]);
  const submit = async (values: any) => {
    values.token = new URLSearchParams(search).get('token') || '';
    dispatch(globalAction.resetPassword(values));
  };
  return (
    <Fragment>
      <div className="mb-8">
        <h1 className="intro-x text-4xl mb-3 font-bold" id={'title-login'}>
          {t('routes.auth.login.Reset password')}
        </h1>
        <h5 className="intro-x font-medium text-gray-300">{t('routes.auth.login.subTitle')}</h5>
      </div>
      <Spin spinning={isLoading}>
        <Form
          className="intro-x"
          columns={ColumnResetPassword({ t })}
          textSubmit={'routes.auth.login.Reset password'}
          handSubmit={submit}
          disableSubmit={isLoading}
        />
      </Spin>
    </Fragment>
  );
};

export default Page;
