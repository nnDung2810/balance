import React, { Fragment, useEffect, useRef } from 'react';
import { Form as FormAnt } from 'antd';
import { useTranslation } from 'react-i18next';

import { Spin } from '@components';
import Form from '../../../components/form';
import { ColumnProfile } from '@columns';
import { globalAction, useAppDispatch, useTypedSelector } from '@reducers';

const Page = () => {
  const { t } = useTranslation();
  const { user, isLoading } = useTypedSelector((state: any) => state[globalAction.name]);
  const [form] = FormAnt.useForm();
  const dispatch = useAppDispatch();
  const listPosition = useRef([]);

  const submit = async (values: any) => {
    dispatch(globalAction.putProfile(values));
  };

  useEffect(() => {
    dispatch(globalAction.profile());
  }, [dispatch]);
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
          values={{ ...user }}
        />
      </Spin>
    </Fragment>
  );
};
export default Page;
