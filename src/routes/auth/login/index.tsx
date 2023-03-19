import React, {Fragment, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {Form as FormAnt} from 'antd';
import {useNavigate} from 'react-router';
// import { Rocketchat } from '@rocket.chat/sdk';
import {useAuth} from '@globalContext';
import {Spin} from '@components';
import Form from '../../../components/form';
import {routerLinks} from '@utils';
import {ColumnLogin} from '@columns';
import {AuthService} from '../../../services/user';
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
        Don&apos;t have an account?
        <Link to={routerLinks('Login')}>{t('routes.auth.login.Forgot Password')}</Link>
      </div>
    </Fragment>
  );
};

export default Page;
