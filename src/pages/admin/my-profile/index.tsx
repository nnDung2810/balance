import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Tabs } from 'antd';

import { Form } from '@core/form';
import { Spin } from '@core/spin';
import { Button } from '@core/button';
import { GlobalFacade, User } from '@store';
import { routerLinks } from '@utils';
import { UserSolid } from '@svgs';

const Page = () => {
  const { t } = useTranslation();
  const { user, status,isLoading, putProfile, setPassword, profile } = GlobalFacade();
  const navigate = useNavigate();
  const globalFacade = GlobalFacade();

  useEffect(() => {
    profile();
  }, []);

  const handleSubmit = (values: User) => {
    globalFacade.putProfile(values),
    navigate(routerLinks('MyProfile'));
  };

  return (
    <Fragment>
      <div className='grid grid-cols-3 gap-5 w-full'>
        <div className='col-span-1 bg-white p-5 border rounded-xl'>
          <Spin spinning={isLoading}>
            <Form
              className="text-center items-centers text-2xl text-black font-semibold"
              columns={[
                {
                  title: '',
                  name: 'profileImage',
                  formItem: {
                    type: 'upload',
                  //  mode: 'multiple',
                    onlyImage: true,
                  },
                },
                {
                  title: 'user.Fullname',
                  name: 'name',
                  formItem: {
                    render: (form, values) => {
                      return (
                        <div>
                          {values.name}
                        </div>
                      )
                    }
                  },
                },
                {
                  title: 'user.role',
                  name: 'userRole',
                  formItem: {
                    render: (text: any, item: any) => {
                      if (text = item.userRole[0].mtRole.code === "ADMIN") {
                        return (
                          <div className='flex w-full flex-row justify-center pt-2'>
                            <div><UserSolid className='w-7 h-7 mr-2 fill-slate-500' /></div>
                            <div className='text-xl text-gray-500'>
                            {t('user.RoleUser.ADMIN')}
                            </div>
                          </div>
                        )
                      } else if (text = item.userRole[0].mtRole.code === "OWNER_SUPPLIER") {
                        return (
                          <div className='flex w-full flex-row justify-center'>
                            <div><UserSolid className='w-7 h-7 mr-2' /></div>
                            <div>{t('user.RoleUser.SUPPLIER')}</div>
                          </div>
                        )
                      } else {
                        return (
                          <div className='flex w-full flex-row justify-center'>
                            <div><UserSolid className='w-7 h-7 mr-2' /></div>
                            <div>{t('user.RoleUser.STORE')}</div>
                          </div>
                        )
                      }
                    }
                  },
                },
              ]}
              disableSubmit={isLoading}
              values={{ ...user }}
            />
          </Spin>
        </div>

        <div className='col-span-2 bg-white p-5 border rounded-xl mr-4 fill-black'>
          <Spin spinning={isLoading}>
              <Tabs defaultActiveKey="1" size="large" className='font-bold text-gray-500 hover:text-gray-500'>
                <Tabs.TabPane tab={t('routes.admin.Layout.My Profile')} key="1">
                  <Form
                    columns={[
                      {
                        title: 'user.Fullname',
                        name: 'name',
                        formItem: {
                          col: 12,
                          rules: [{ type: 'required' }],
                        },
                      },
                      {
                        title: 'Email',
                        name: 'email',
                        formItem: {
                          tabIndex: 1,
                          col: 6,
                          rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
                        },
                      },
                      {
                        title: 'user.Phone Number',
                        name: 'phoneNumber',
                        formItem: {
                          tabIndex: 1,
                          col: 6,
                          rules: [{ type: 'required' }, { type: 'phone', min: 10, max: 15 }],
                        },
                      },
                      {
                        title: 'user.Note',
                        name: 'note',
                        formItem: {
                          type: 'textarea',
                        },
                      },
                    ]}
                    disableSubmit={isLoading}
                    handSubmit={handleSubmit}
                    extendButton={(form) => (
                      <Button
                        text={t('components.button.Cancel')}
                        className={'md:min-w-[8rem] justify-center out-line'}
                        onClick={() => {
                          navigate(routerLinks('User/List'))
                        }}
                      />
                    )}
                    values={{ ...user }}
                  />
                </Tabs.TabPane>

                <Tabs.TabPane tab={t('routes.admin.Layout.Change Password')} key="2">
                  <Form
                    columns={[
                      {
                        title: 'columns.auth.login.Password',
                        name: 'password',
                        formItem: {
                          col: 12,
                          type: 'password',
                          rules: [{ type: 'required' }, { type: 'min', value: 6 }],
                          placeholder: t('columns.auth.placeholder.Password').toString(),
                        },
                      },
                      {
                        title: 'columns.auth.login.newPassword',
                        name: 'passwordNew',
                        formItem: {
                          col: 12,
                          type: 'password',
                          rules: [{ type: 'required' }, { type: 'custom' }, { type: 'min', value: 6 }],
                          placeholder: t('columns.auth.placeholder.newPassword').toString(),
                        },
                      },
                      {
                        title: 'columns.auth.login.Confirm Password',
                        name: 'passwordComfirm',
                        formItem: {
                          col: 12,
                          type: 'password',
                          condition: (values: any) => !values?.id,
                          rules: [
                            { type: 'required' },
                            {
                              type: 'custom',
                              validator: ({ getFieldValue }: any) => ({
                                validator(rule: any, value: string) {
                                  if (!value || getFieldValue('passwordNew') === value) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(new Error('Hai mật khẩu không giống nhau!'));
                                },
                              }),
                            },
                          ],
                          placeholder: t('columns.auth.placeholder.Confirm Password').toString(),
                        },
                      },
                    ]}
                    disableSubmit={isLoading}
                    extendButton={(form) => (
                      <Button
                        text={t('components.button.Cancel')}
                        className={'md:min-w-[8rem] justify-center out-line'}
                        onClick={() => {
                          navigate(routerLinks('User/List'))
                        }}
                      />
                    )}
                    extendButtonChangePassword={setPassword}
                    values={{ ...user }}
                  />
                </Tabs.TabPane>
              </Tabs>
          </Spin>
        </div>
        <div>
        </div>
      </div>
    </Fragment>
  );
};
export default Page;
