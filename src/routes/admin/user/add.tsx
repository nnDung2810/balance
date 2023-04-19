import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { UserRoleFacade, UserFacade, CodeFacade } from '@reducers';
import { routerLinks } from '@utils';
import { Button, Form } from '@components';
import { User } from '../../../reducers/global';

const Page = () => {
  const { t } = useTranslation();
  const { result, get } = UserRoleFacade();
  const userFacade = UserFacade();
  const { data, isLoading, queryParams, status } = userFacade;
  const navigate = useNavigate();
  const isBack = useRef(true);
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();

  useEffect(() => {
    if (!result?.data) get({});

    if (id) userFacade.getById({ id });
    else userFacade.set({ data: undefined });

    return () => {
      isReload.current && userFacade.get(param);
    };
  }, [id]);

  useEffect(() => {
    switch (status) {
      case 'post.fulfilled':
        navigate(routerLinks('User') + '/' + data?.id);
        break;
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
  const handleSubmit = (values: User) => {
    if (id) userFacade.put({ ...values, id });
    else userFacade.post(values);
  };

  return (
    <div className={'max-w-4xl mx-auto'}>
      {!!result?.data && (
        <Form
          values={{ ...data }}
          className="intro-x"
          columns={[
            {
              title: t('dayoff.Fullname'),
              name: 'name',
              formItem: {
                tabIndex: 1,
                col: 6,
                rules: [{ type: 'required' }],
              },
            },
            {
              title: t('columns.auth.login.password'),
              name: 'password',
              formItem: {
                tabIndex: 2,
                col: 6,
                type: 'password',
                condition: (value: string, form, index: number, values: any) => !values?.id,
                rules: [{ type: 'required' }, { type: 'min', value: 6 }],
              },
            },
            {
              title: t('Email'),
              name: 'email',
              formItem: {
                tabIndex: 1,
                col: 6,
                rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
              },
            },
            {
              title: t('columns.auth.register.retypedPassword'),
              name: 'retypedPassword',
              formItem: {
                placeholder: t('columns.auth.register.retypedPassword'),
                tabIndex: 2,
                col: 6,
                type: 'password',
                condition: (value: string, form, index: number, values) => !values?.id,
                rules: [
                  { type: 'required' },
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
              title: t('Số điện thoại'),
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
                convert: (data) =>
                  data?.map ? data.map((_item: any) => (_item?.id !== undefined ? +_item.id : _item)) : data,
                get: {
                  facade: CodeFacade,
                  params: (fullTextSearch: string) => ({
                    fullTextSearch,
                    filter: { type: 'POS' },
                    extend: {},
                  }),
                  format: (item) => ({
                    label: item.name,
                    value: item.code,
                  }),
                },
              },
            },
            {
              title: t('user.Start Date'),
              name: 'startDate',
              formItem: {
                col: 6,
                type: 'date',
                rules: [{ type: 'required' }],
              },
            },
            {
              title: t('components.button.Role'),
              name: 'roleId',
              formItem: {
                col: 6,
                type: 'select',
                rules: [{ type: 'required' }],
                list: result.data.map((item: any) => ({
                  value: item?.id,
                  label: item?.name,
                })),
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
          extendButton={(form) => (
            <Button
              text={t('components.button.Save and Add new')}
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
      )}
    </div>
  );
};
export default Page;
