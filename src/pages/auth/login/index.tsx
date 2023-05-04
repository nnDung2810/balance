import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Spin } from '@core/spin';
import { Form } from '@core/form'
import { routerLinks } from '@utils';
import { GlobalFacade } from '@store';
import { ColumnLogin } from './column';


const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const globalFacade = GlobalFacade();
  const { isLoading, status, user, data, login } = globalFacade;

  useEffect(() => {
    if (status === 'login.fulfilled' && user && Object.keys(user).length > 0) {
      // navigate(routerLinks('Dashboard'));
      navigate('/', { replace: true });
    }
  }, [status]);
  
  return (
    <Fragment>
      <div className="text-center mb-8">
        <h1 className="intro-x text-3xl mb-10 font-bold text-teal-900 leading-8 md:text-5xl lg:leading-10" id={'title-login'}>
          {t('routes.auth.login.title')}
        </h1>
        <h5 className="intro-x font-semibold tracking-wide text-teal-900 ">{t('routes.auth.login.subTitle')}</h5>
      </div>
      <div className='mx-auto w-3/4 relative'>
        <Spin spinning={isLoading} >
          <Form
            values={{ ...data }}
            className="intro-x form-login space-y-12"
            columns={ColumnLogin({ t })}
            textSubmit={'routes.auth.login.Log In'}
            handSubmit={login}
            disableSubmit={isLoading}
          />
        </Spin>
        <div className="absolute right-6 sm:top-2/3 sm:right-0 text-right">
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
