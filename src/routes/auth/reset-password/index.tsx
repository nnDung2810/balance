import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form as FormAnt } from 'antd';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '@globalContext';
import { Spin } from '@components';
import Form from '../../../components/form';
import { routerLinks } from '@utils';
import { ColumnResetPassword } from '@columns';
import { AuthService } from '../../../services/user';
// import { urlChat, passChat } from 'variable';

// const realTimeAPI = new Rocketchat({
//   protocol: 'ddp',
//   host: `https://${urlChat}`,
//   useSsl: true,
// });
const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = FormAnt.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useLocation();
  const submit = async (values: any) => {
    setIsLoading(true);
    const data = await AuthService.resetPassword(values, new URLSearchParams(search).get("token") || '');
    setIsLoading(false);
    if (data) {
      console.log(data);
      navigate(routerLinks('Login'), { replace: true });
    }
  };
  return (
    <Fragment>
      <div className="mb-8">
        <h1 className="intro-x text-4xl mb-3 font-bold" id={'title-login'}>
          {t('routes.auth.login.Reset password')}
        </h1>
        <h5 className="intro-x font-medium text-gray-300">{t('routes.auth.login.subTitle')}</h5>
      </div>
      <Spin spinning={isLoading}>
        <Form
          form={form}
          className="intro-x"
          columns={ColumnResetPassword({ t })}
          textSubmit={t('routes.auth.login.Reset password')}
          handSubmit={submit}
          disableSubmit={isLoading}
        />
      </Spin>
    </Fragment>
  );
};

export default Page;
