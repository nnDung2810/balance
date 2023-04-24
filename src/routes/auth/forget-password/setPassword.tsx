import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { Spin, Form } from '@components';
import { routerLinks } from '@utils';
import { GlobalFacade } from '@reducers';
import { ColumnFormSetPassword } from './column';
import '../../../layouts/auth/index.less'

const Page = () => {
const isReload = useRef(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const globalFacade = GlobalFacade();
  const { isLoading, status, data, setPassword } = globalFacade;
//   useEffect(() => {
//     if (status === 'verifyFotgotPassword.fulfilled') {
//       navigate(routerLinks('setPassword'));
//     }
//   }, [status]);

console.log(data)
  return (
    <Fragment>
      <div className="text-center mb-8">
        <h1 className="intro-x text-5xl mb-10 font-bold text-green-900 leading-10 max-md:text-3xl max-lg:leading-8">
          {'Đặt Lại Mật Khẩu'}
        </h1>
        <h5 className="intro-x font-semibold tracking-wide text-green-900 ">Mật khẩu yêu cầu có 8 ký tự trở lên, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 kí tự đặc biệt.</h5>
      </div>
      <div className='mx-auto w-full'>
        <Spin spinning={isLoading} >
          <Form
            values={{ ...data }}
            className="intro-x ant-form1"
            columns={ColumnFormSetPassword()}
            textSubmit={'Gửi OTP'}
            handSubmit={(values) => setPassword({ ...values})}
            disableSubmit={isLoading}
          />
        </Spin>
      </div>
    </Fragment>
  );
};

export default Page;
