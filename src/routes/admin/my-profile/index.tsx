import React, { useEffect, Fragment, useState } from 'react';
import { Form as FormAnt } from 'antd';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@globalContext';
import { Form, Spin } from '@components';
import { AuthService } from '@services';
import { ColumnRegister } from '@columns';

const Page = () => {
  const { t } = useTranslation();
  const { user, timeOut } = useAuth();
  const [form] = FormAnt.useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [values, setValues] = useState(user);

  const submit = async (values: any) => {
    setValues(values);
  };

  useEffect(() => {
    const init = async () => {
      const { data } = await AuthService.profile();
      setValues(data);
      setIsLoading(false);
    };
    if (timeOut.current) {
      clearTimeout(timeOut.current);
    }
    timeOut.current = setTimeout(() => {
      init().then();
    }, 10);
  }, []);

  return (
    <Fragment>
      <Spin className="intro-x" spinning={isLoading}>
        <Form
          form={form}
          className="intro-x"
          columns={ColumnRegister({ t })}
          textSubmit={t('components.form.modal.save')}
          isShowCancel={true}
          handSubmit={submit}
          disableSubmit={isLoading}
          values={values}
        />
      </Spin>
    </Fragment>
  );
};
export default Page;
