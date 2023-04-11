import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { useTypedSelector, userAction, userRoleAction, useAppDispatch } from '@reducers';
import { routerLinks } from '@utils';
import { Button, Form } from '@components';
import { ColumnFormUser } from './column';

const Page = () => {
  const { t } = useTranslation();
  const { result } = useTypedSelector((state: any) => state[userRoleAction.name]);
  const { data, isLoading, queryParams, status } = useTypedSelector((state: any) => state[userAction.name]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isBack = useRef(true);
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();

  useEffect(() => {
    if (!result.data) dispatch(userRoleAction.get({}));

    if (id) dispatch(userAction.getById({ id }));
    else dispatch(userAction.set({ data: {} }));

    return () => isReload.current && dispatch(userAction.get(param));
  }, [id]);

  useEffect(() => {
    switch (status) {
      case 'post.fulfilled':
      case 'put.fulfilled':
        if (Object.keys(param).length > 0) isReload.current = true;

        if (isBack.current) handleBack();
        else {
          isBack.current = true;
          if (status === 'put.fulfilled') navigate(routerLinks('User/Add'));
        }
        break;
    }
  }, [status]);

  const handleBack = () => navigate(routerLinks('User/List') + '?' + new URLSearchParams(param).toString());
  const handleSubmit = (values: any) => {
    if (id) dispatch(userAction.put({ ...values, id }));
    else dispatch(userAction.post(values));
  };

  return (
    <div className={'max-w-4xl mx-auto'}>
      <Form
        values={{ ...data }}
        className="intro-x"
        columns={ColumnFormUser({ t, listRole: result.data || [] })}
        extendButton={(form) => (
          <Button
            text={t('Save and Add new')}
            className={'md:min-w-[12rem] w-full justify-center out-line'}
            onClick={() => {
              form.submit();
              isBack.current = false;
            }}
          />
        )}
        handSubmit={handleSubmit}
        disableSubmit={isLoading}
        handCancel={handleBack}
      />
    </div>
  );
};
export default Page;
