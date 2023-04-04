import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Form as FormAnt } from 'antd';
import { useNavigate } from 'react-router';
// import { Rocketchat } from '@rocket.chat/sdk';
import { ModalForm, Spin } from '@components';
import Form from '../../../components/form';
import { routerLinks } from '@utils';
import { ColumnForgottenPassword, ColumnLogin } from '@columns';
import { globalAction, useAppDispatch, useTypedSelector } from '@reducers';
// import { urlChat, passChat } from 'variable';

// const realTimeAPI = new Rocketchat({
//   protocol: 'ddp',
//   host: `https://${urlChat}`,
//   useSsl: true,
// });
const Page = () => {
  const { t } = useTranslation();
  const [form] = FormAnt.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isLoading, status } = useTypedSelector((state: any) => state[globalAction.name]);
  useEffect(() => {
    if (status === 'login.fulfilled') {
      navigate(routerLinks('Dashboard'), { replace: true });
    }
  }, [status]);
  const submit = async (values: any) => {
    dispatch(globalAction.login(values));
    // await realTimeAPI.connect({
    //   protocol: 'ddp',
    //   host: `https://${urlChat}`,
    //   useSsl: true,
    // });
    //
    // const result = await realTimeAPI.login({ username: data.user.rocketChatUsername, password: values.password });
    // if (result.type === 'resume') {
    //   localStorage.setItem(passChat, result?.token);
    //   document.cookie = 'rc_token=' + result?.token;
    //   document.cookie = 'rc_uid=' + result?.id;
    // }
  };
  const modalFormRef = useRef<any>();

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
          form={form}
          className="intro-x"
          columns={ColumnLogin({ t })}
          textSubmit={t('routes.auth.login.Log In')}
          handSubmit={submit}
          disableSubmit={isLoading}
        />
      </Spin>
      <div className="mt-3 intro-x">
        {t('routes.auth.login.Account')}
        <button className={'text-blue-600'} onClick={() => modalFormRef.current.handleEdit()}>
          {' '}
          {t('routes.auth.login.Forgot Password')}
        </button>
      </div>
      <ModalForm
        action={globalAction}
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
