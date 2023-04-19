import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { ModalForm, Spin, Form } from '@components';
import { routerLinks } from '@utils';
import { GlobalFacade } from '@reducers';
import { ColumnForgetPassword } from './column';
import { FormModalRefObject } from '@models';
import '../../../layouts/auth/index.less'

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
      <div className="text-center mb-8">
        <h1 className="intro-x text-5xl mb-10 font-bold text-green-900 leading-10 max-md:text-3xl max-lg:leading-8" id={'title-login'}>
          {t('routes.auth.reset-password.title')}
        </h1>
        <h5 className="intro-x font-semibold tracking-wide text-green-900 ">{t('routes.auth.reset-password.subTitle')}</h5>
      </div>
      <div className='mx-auto w-3/4'>
        <Spin spinning={isLoading} >
          <Form
            values={{ ...data }}
            className="intro-x ant-form1"
            columns={ColumnForgetPassword({ t })}
            textSubmit={'routes.auth.reset-password.OTP'}
            handSubmit={login}
            disableSubmit={isLoading}
          />
        </Spin>
        <div className="mt-3 text-center">
          <button className={'text-sky-600 font-medium underline tracking-wide hover:no-underline hover:text-sky-500'} onClick={() => navigate(routerLinks('Login'))}>
            {' '}
            {t('routes.auth.reset-password.Back To Login')}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Page;
