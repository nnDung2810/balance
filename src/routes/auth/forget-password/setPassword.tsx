import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { Spin } from '@components/spin';
import { Form } from '@components/form'
import { routerLinks } from '@utils';
import { GlobalFacade } from '@reducers';
import { ColumnFormSetPassword } from './column';
import '../../../layouts/user-admin/index.less'

const Page = () => {
const isReload = useRef(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const globalFacade = GlobalFacade();
  const { isLoading, status, data, setPassword } = globalFacade;
  useEffect(() => {
    if (status === 'setPassword.fulfilled') {
      navigate(routerLinks('Sign-in'));
    }
  }, [status]);

console.log(data)
  return (
    <Fragment>
      <div className="text-center mb-8 mx-auto">
        <h1 className="intro-x text-5xl mb-10 font-bold text-green-900 leading-10 max-md:text-3xl max-lg:leading-8">
          {'Đặt Lại Mật Khẩu'}
        </h1>
        <h5 className="intro-x font-semibold tracking-wide text-green-900">Mật khẩu yêu cầu có 8 ký tự trở lên, có ít nhất 1 chữ hoa, 1 chữ thường,<br></br> 1 chữ số và 1 kí tự đặc biệt.</h5>
      </div>
      <div className='mx-auto w-3/4'>
        <Spin spinning={isLoading} >
          <Form
            values={{ ...data }}
            className="intro-x ant-form1 space-y-8"
            columns={ColumnFormSetPassword()}
            textSubmit={'Đổi Mật Khẩu'}
            handSubmit={(values) => setPassword({ ...values})}
            disableSubmit={isLoading}
          />
        </Spin>
      </div>
    </Fragment>
  );
};

export default Page;
