import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Spin, Form, Button } from '@components';
import { GlobalFacade } from '@reducers';
import { ColumnProfile, ColumnProfileAvatar } from './column';
import { routerLinks } from '@utils';
import { useNavigate } from 'react-router';

const Page = () => {
  const { t } = useTranslation();
  const isBack = useRef(true);
   const navigate = useNavigate();
  const { user, isLoading, putProfile, profile } = GlobalFacade();
  const getProfile = () => navigate(routerLinks('User/List'));
  const listPosition = useRef([]);
  // @ts-ignore
  useEffect(() => profile(), []);
  return (
    <Fragment>
      <div className='flex justify-between'>
        <Spin className="intro-x" spinning={isLoading}>
        <Form
          className="intro-x w-[250px] h-[350px] border rounded-3xl bg-white text-center pt-5"
          columns={ColumnProfileAvatar({ t })}
          values={{ ...user }}
        />
      </Spin>
      <Spin className="intro-x"  spinning={isLoading}>
        <Form
          className="intro-x w-[750px] h-[350px] bg-white border rounded-3xl px-8 pt-4 pb-4 "
          columns={ColumnProfile({ t, listPosition: listPosition.current })}
          handSubmit={putProfile}
          disableSubmit={isLoading}
          extendButton={(form) => (
            <Button
              text={t('Huỷ Thao Tác')}
              className={'md:min-w-[8rem] justify-center out-line'}
              onClick={() => {
              //  form.submit();
                navigate(routerLinks('User/List'))
              }}
            />
          )}
          values={{ ...user }}
        //  handCancel={getProfile}
        />
      </Spin>
      </div>
    </Fragment>
  );
};
export default Page;
