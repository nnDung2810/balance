import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Form as FormAnt } from 'antd';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@globalContext';
import { Spin } from '@components';
import Form from '../../../components/form';
import { AuthService } from '../../../services/user';
// import { CodeTypeService } from '../../../services/code/type';
import { ColumnProfile } from '@columns';

const Page = () => {
  const { t } = useTranslation();
  const { user, timeOut, setUser } = useAuth();
  const [form] = FormAnt.useForm();
  const [isLoading, setIsLoading] = useState(true);
  const listPosition = useRef([]);

  const submit = async (values: any) => {
    setIsLoading(true);
    const { data: user } = await AuthService.putProfile(values);
    setUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      const { data: user } = await AuthService.profile();
      // const { data } = await CodeTypeService.getById('POS');
      // listPosition.current = data.items;
      setUser(user);
      setIsLoading(false);
    };
    init().then();
  }, []);

  return (
    <Fragment>
      <Spin className="intro-x" spinning={isLoading}>
        <Form
          form={form}
          className="intro-x w-[550px] mx-auto"
          columns={ColumnProfile({ t, listPosition: listPosition.current })}
          textSubmit={t('components.form.modal.save')}
          isShowCancel={true}
          handSubmit={submit}
          disableSubmit={isLoading}
          values={user}
        />
      </Spin>
    </Fragment>
  );
};
export default Page;
