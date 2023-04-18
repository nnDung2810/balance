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
      <div className="text-center mb-10">
        <h1 className="intro-x text-6xl mb-9 font-bold  text-green-900" id={'title-login'}>
          {t('routes.auth.login.title')}
        </h1>
        <h5 className="intro-x  font-semibold tracking-wider text-green-800">{t('routes.auth.login.subTitle')}</h5>
      </div>
      <div className='w-3/5'>
        <Spin spinning={isLoading} >
          <Form
            values={{ ...data }}
            className="intro-x"
            columns={ColumnLogin({ t })}
            textSubmit={'routes.auth.login.Log In'}
            handSubmit={login}
            disableSubmit={isLoading}
          />
        </Spin>
        <div className="mt-3 intro-x text-right">
          <button className={'text-green-900 font-semibold underline text-base'} onClick={() => modalFormRef?.current?.handleEdit!()}>
            {' '}
            {t('routes.auth.login.Forgot Password')}
          </button>
        </div>
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
