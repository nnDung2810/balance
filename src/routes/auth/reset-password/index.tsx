import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router';
import { Spin, Form } from '@components';
import { routerLinks } from '@utils';
import { GlobalFacade } from '@reducers';
import { ColumnResetPassword } from './column';

const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { search } = useLocation();

  const { isLoading, status, resetPassword } = GlobalFacade();

  useEffect(() => {
    if (status === 'resetPassword.fulfilled') {
      navigate(routerLinks('Login'), { replace: true });
    }
  }, [status]);
  const submit = async (values: any) => {
    values.token = new URLSearchParams(search).get('token') || '';
    resetPassword(values);
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
