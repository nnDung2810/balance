import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { ModalForm, Spin, Form } from '@components';
import { routerLinks } from '@utils';
import { GlobalFacade } from '@reducers';
import { ColumnForgottenPassword, ColumnLogin } from './column';
import { FormModalRefObject } from '@models';

const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const globalFacade = GlobalFacade();
  const { isLoading, status, user, data, login } = globalFacade;
  useEffect(() => {
    if (status === 'login.fulfilled' && user && Object.keys(user).length > 0) {
      navigate(routerLinks('Dashboard'), { replace: true });
    }
  }, [status]);
  const modalFormRef = useRef<FormModalRefObject>(null);
  return (
    <Fragment>
      <div className="mb-8">
        <h1 className="intro-x text-4xl mb-3 font-bold" id={'title-login'}>
          {t('routes.auth.login.title')}
        </h1>
        <h5 className="intro-x font-medium text-gray-300">{t('routes.auth.login.subTitle')}</h5>
      </div>
      <Spin spinning={isLoading}>
        <Form
          values={{ ...data }}
          className="intro-x"
          columns={ColumnLogin({ t })}
          textSubmit={'routes.auth.login.Log In'}
          handSubmit={login}
          disableSubmit={isLoading}
        />
      </Spin>
      <div className="mt-3 intro-x">
        {t('routes.auth.login.Account')}
        <button className={'text-blue-600'} onClick={() => modalFormRef?.current?.handleEdit!()}>
          {' '}
          {t('routes.auth.login.Forgot Password')}
        </button>
      </div>
      <ModalForm
        facade={globalFacade}
        ref={modalFormRef}
        title={() => 'Quên mật khẩu'}
        columns={ColumnForgottenPassword()}
        widthModal={400}
        idElement={'user'}
      />
    </Fragment>
  );
};

export default Page;
