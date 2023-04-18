import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Spin, Form } from '@components';
import { GlobalFacade } from '@reducers';

const Page = () => {
  const { t } = useTranslation();
  const { user, isLoading, putProfile, profile } = GlobalFacade();
  const listPosition = useRef([]);
  useEffect(() => {
    profile();
  }, []);
  return (
    <Fragment>
      <Spin className="intro-x" spinning={isLoading}>
        <Form
          className="intro-x w-[550px] mx-auto"
          columns={[
            {
              title: t('dayoff.Fullname'),
              name: 'name',
              formItem: {
                col: 6,
                rules: [{ type: 'required' }],
              },
            },
            {
              title: t('columns.auth.login.password'),
              name: 'password',
              formItem: {
                col: 6,
                type: 'password',
                rules: [{ type: 'min', value: 6 }],
              },
            },
            {
              title: t('Email'),
              name: 'email',
              formItem: {
                col: 6,
                rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
              },
            },
            {
              title: t('columns.auth.register.retypedPassword'),
              name: 'retypedPassword',
              formItem: {
                placeholder: t('columns.auth.register.retypedPassword'),
                col: 6,
                type: 'password',
                rules: [
                  {
                    type: 'custom',
                    validator: ({ getFieldValue }) => ({
                      validator(rule, value: string) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Hai mật khẩu không giống nhau!'));
                      },
                    }),
                  },
                ],
              },
            },
            {
              title: t('customer.Phone Number'),
              name: 'phoneNumber',
              formItem: {
                col: 6,
                rules: [{ type: 'required' }, { type: 'phone', min: 10, max: 15 }],
              },
            },
            {
              title: t('user.Date of birth'),
              name: 'dob',
              formItem: {
                col: 6,
                type: 'date',
                rules: [{ type: 'required' }],
              },
            },
            {
              title: t('user.Position'),
              name: 'positionCode',
              formItem: {
                col: 6,
                type: 'select',
                rules: [{ type: 'required' }],
                list: listPosition.current.map((item: any) => ({ value: item.code, label: item.name })),
              },
            },
            {
              title: t('user.Description'),
              name: 'description',
              formItem: {
                col: 8,
                type: 'textarea',
              },
            },
            {
              name: 'avatar',
              title: t('user.Upload avatar'),
              formItem: {
                col: 4,
                type: 'upload',
                mode: 'multiple',
              },
            },
          ]}
          handSubmit={putProfile}
          disableSubmit={isLoading}
          values={{ ...user }}
        />
      </Spin>
    </Fragment>
  );
};
export default Page;
