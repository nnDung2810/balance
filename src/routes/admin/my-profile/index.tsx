import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Form } from '@components/form';
import { Spin } from '@components/spin';
import { GlobalFacade } from '@reducers';
import { ColumnProfile } from './column';

const Page = () => {
  const { t } = useTranslation();
  const { user, isLoading, putProfile, profile } = GlobalFacade();
  const listPosition = useRef([]);
  // @ts-ignore
  useEffect(() => profile(), []);
  return (
    <Fragment>
      <Spin className="intro-x" spinning={isLoading}>
        <Form
          className="intro-x w-[550px] mx-auto"
          columns={ColumnProfile({ t, listPosition: listPosition.current })}
          handSubmit={putProfile}
          disableSubmit={isLoading}
          values={{ ...user }}
        />
      </Spin>
    </Fragment>
  );
};
export default Page;
