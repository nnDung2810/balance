import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { Spin, Form } from '@components';
import { routerLinks } from '@utils';
import { GlobalFacade } from '@reducers';
import { ColumnOTP } from './column';
import { FormModalRefObject } from '@models';
import '../../../layouts/auth/index.less'

const Page = () => {
const isReload = useRef(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const globalFacade = GlobalFacade();
  const { isLoading, status, data, verifyForgotPassword } = globalFacade;
  useEffect(() => {
    console.log(status)
    if (status === 'verifyForgotPassword.fulfilled') {
      navigate(routerLinks('SetPassword'));
    }
  }, [status]);
const result = {}
const email = 'nmmmdunaag@gmail.com'
console.log(data)
  return (
    <Fragment>
      <div className="text-center mb-8">
        <h1 className="intro-x text-5xl mb-10 font-bold text-green-900 leading-10 max-md:text-3xl max-lg:leading-8">
          {'Quên Mật Khẩu'}
        </h1>
        <h5 className="intro-x font-semibold tracking-wide text-green-900 ">Vui lòng nhập mã OTP đã gửi đến email của bạn</h5>
      </div>
      <div className='mx-auto w-full'>
        <Spin spinning={isLoading} >
          <Form
            values={{ ...data }}
            className="intro-x ant-form1"
            columns={ColumnOTP()}
            textSubmit={'Gửi OTP'}
            handSubmit={(values) => verifyForgotPassword({ ...values,email})}
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
