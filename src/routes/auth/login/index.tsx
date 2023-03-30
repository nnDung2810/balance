import React, { Fragment, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form as FormAnt } from 'antd';
import { useNavigate } from 'react-router';
// import { Rocketchat } from '@rocket.chat/sdk';
import { useAuth } from '@globalContext';
import { ModalForm, Spin } from '@components';
import Form from '../../../components/form';
import { routerLinks } from '@utils';
import { ColumnForgottenPassword, ColumnLogin } from '@columns';
import { AuthService } from '../../../services/user';
// import { urlChat, passChat } from 'variable';

// const realTimeAPI = new Rocketchat({
//   protocol: 'ddp',
//   host: `https://${urlChat}`,
//   useSsl: true,
// });
const Page = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form] = FormAnt.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({});

  const submit = async (values: any) => {
    setValues(values);
    setIsLoading(true);
    const data = await AuthService.login(values);
    setIsLoading(false);
    if (data) {
      login(data);
      console.log(data);
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
      // console.log(result);
      navigate(routerLinks('Dashboard'), { replace: true });
    }
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
          values={values}
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
        ref={modalFormRef}
        title={() => 'Quên mật khẩu'}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        columns={ColumnForgottenPassword({
          t,
        })}
        Post={AuthService.forgottenPassword}
        widthModal={400}
        idElement={'user'}
      />
    </Fragment>
  );
};

export default Page;
