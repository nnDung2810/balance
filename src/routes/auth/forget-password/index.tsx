import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { Spin } from '@components/spin';
import { Form } from '@components/form'
import { routerLinks } from '@utils';
import { GlobalFacade } from '@reducers';
import { ColumnForgetPassword } from './column';
import '../../../layouts/user-admin/index.less'

const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const globalFacade = GlobalFacade();
  const { isLoading, status, data, forgotPassword } = globalFacade;
  useEffect(() => {
    if (status === 'forgotPassword.fulfilled') {
      navigate(routerLinks('VerifyForotPassword'));
    }
  }, [status]);

  console.log(status)

  return (
    <Fragment>
      <div className="text-center mb-8">
        <h1 className="intro-x text-5xl mb-10 font-bold text-green-900 leading-10 max-md:text-3xl max-lg:leading-8" id={'title-login'}>
        {'Quên Mật Khẩu'}
        </h1>
        <h5 className="intro-x font-semibold tracking-wide text-green-900 ">{t('routes.auth.reset-password.subTitle')}</h5>
      </div>
      <div className='mx-auto w-3/4'>
        <Spin spinning={isLoading} >
          <Form
            values={{ ...data }}
            className="intro-x ant-form1 space-y-4"
            columns={ColumnForgetPassword({ t })}
            textSubmit={'routes.auth.reset-password.OTP'}
            handSubmit={(values) => forgotPassword({ ...values})}
            disableSubmit={isLoading}
          />
        </Spin>
        <div className="mt-3 text-center">
          <button className={'text-sky-600 font-medium underline tracking-wide hover:no-underline hover:text-sky-500'} onClick={() => navigate(routerLinks('Sign-in'))}>
            {' '}
            {'Quay trở lại Đăng nhập'}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Page;
