import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Spin } from '@components/spin';
import { Form } from '@components/form'
import { routerLinks } from '@utils';
import { GlobalFacade } from '@reducers';
import { ColumnLogin } from './column';
import '../../../layouts/user-admin/index.less'

const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const globalFacade = GlobalFacade();
  const { isLoading, status, user, data, login } = globalFacade;
  useEffect(() => {
    console.log(status)
    if (status === 'login.fulfilled' && user && Object.keys(user).length > 0) {
      navigate(routerLinks('Dashboard'), { replace: true });
    }
  }, [status]);
  return (
    <Fragment>
      <div className="text-center mb-8">
        <h1 className="intro-x text-5xl mb-10 font-bold text-teal-900 leading-10 max-md:text-3xl max-lg:leading-8" id={'title-login'}>
          {t('routes.auth.login.title')}
        </h1>
        <h5 className="intro-x font-semibold tracking-wide text-teal-900 ">{t('routes.auth.login.subTitle')}</h5>
      </div>
      <div className='mx-auto w-3/4 relative'>
        <Spin spinning={isLoading} >
          <Form
            values={{ ...data }}
            className="intro-x ant-form1 space-y-12"
            columns={ColumnLogin({ t })}
            textSubmit={'routes.auth.login.Log In'}
            handSubmit={login}
            disableSubmit={isLoading}
          />
        </Spin>
        <div className="absolute -mt-20 right-0 max-sm:right-6 text-right">
          <button className={'text-teal-900 font-normal underline text-base hover:no-underline'} onClick={() => navigate(routerLinks('ForgetPassword'))}>
            {' '}
            {t('routes.auth.login.Forgot Password')}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Page;
