import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Spin, Form } from '@components';
import { GlobalFacade } from '@reducers';
import { ColumnProfile } from './column';

const Page = () => {
  const { t } = useTranslation();
  const { user, isLoading, putProfile, profile } = GlobalFacade();
  const listPosition = useRef([]);
  const submit = async (values: any) => putProfile(values);
  useEffect(() => profile(), []);
  return (
    <Fragment>
      <Spin className="intro-x" spinning={isLoading}>
        <Form
          className="intro-x w-[550px] mx-auto"
          columns={ColumnProfile({ t, listPosition: listPosition.current })}
          handSubmit={submit}
          disableSubmit={isLoading}
          values={{ ...user }}
        />
      </Spin>
    </Fragment>
  );
};
export default Page;
