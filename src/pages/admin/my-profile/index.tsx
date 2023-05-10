import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Tabs } from 'antd';

import { Form } from '@core/form';
import { Spin } from '@core/spin';
import { Button } from '@core/button';
import { GlobalFacade } from '@store';
import { routerLinks } from '@utils';
import { UserSolid } from '@svgs';

const Page = () => {
  const { t } = useTranslation();
  const { user, isLoading, putProfile, setPassword, profile } = GlobalFacade();
  const navigate = useNavigate();
  const { TabPane } = Tabs;

  useEffect(() => {
    profile();
  }, []);

  return (
    <Fragment>
      <div className='lg:grid lg:grid-cols-3 gap-5 w-full block'>
        <div className='col-span-1 bg-white p-5 lg:border lg:rounded-xl'>
          <Spin spinning={isLoading}>
            <Form
              className="text-center items-centers text-2xl text-black font-semibold"
              columns={[
                {
                  name: 'profileImage',
                  formItem: {
                    type: 'upload',
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
                  title: 'user.Role',
                  name: 'userRole',
                  formItem: {
                    render: (text: any, item: any) => {
                      if (text = item.userRole[0].mtRole.code === "ADMIN") {
                        return (
                          <div className='flex w-full flex-row justify-center pt-2'>
                            <div><UserSolid className='w-7 h-7 mr-2 fill-slate-500' /></div>
                            <div className='text-xl text-gray-500'>{t('user.Roles.ADMIN')}</div>
                          </div>
                        )
                      } else if (text = item.userRole[0].mtRole.code === "OWNER_SUPPLIER") {
                        return (
                          <div className='flex w-full flex-row justify-center'>
                            <div><UserSolid className='w-7 h-7 mr-2' /></div>
                            <div>{t('user.Roles.OWNER_SUPPLIER')}</div>
                          </div>
                        )
                      } else {
                        return (
                          <div className='flex w-full flex-row justify-center'>
                            <div><UserSolid className='w-7 h-7 mr-2' /></div>
                            <div>{t('user.Roles.OWNER_STORE')}</div>
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

        <div className='col-span-2 bg-white p-5 lg:border lg:rounded-xl fill-black'>
          <Spin spinning={isLoading}>
            <Tabs defaultActiveKey="1" size="large">
              <TabPane tab={t('titles.Personalinformation')} key="1">
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
                  handSubmit={putProfile}
                  extendButton={(form) => (
                    <Button
                      text={t('components.form.modal.Canceloperation')}
                      className={'md:min-w-[8rem] justify-center out-line'}
                      onClick={() => {
                        navigate(routerLinks('User/List'))
                      }}
                    />
                  )}
                  values={{ ...user }}
                />
              </TabPane>

              <TabPane tab={t('titles.Changepassword')} key="2">
                <Form
                  columns={[
                    {
                      title: 'user.Password',
                      name: 'password',
                      formItem: {
                        col: 12,
                        type: 'password',
                        rules: [{ type: 'required' }, { type: 'min', value: 6 }],
                      },
                    },
                    {
                      title: 'user.New password',
                      name: 'passwordNew',
                      formItem: {
                        col: 12,
                        type: 'password',
                        rules: [{ type: 'custom' }, { type: 'min', value: 6 }],
                      },
                    },
                    {
                      title: 'user.Confirm password',
                      name: 'passwordComfirm',
                      formItem: {
                        col: 12,
                        type: 'password',
                        condition: (value: string, form: any, index: number, values: any) => !values?.id,
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
                      },
                    },
                  ]}
                  disableSubmit={isLoading}
                  extendButton={(form) => (
                    <Button
                      text={t('components.form.modal.Canceloperation')}
                      className={'md:min-w-[8rem] justify-center out-line'}
                      onClick={() => {
                        navigate(routerLinks('User/List'))
                      }}
                    />
                  )}
                  extendButtonChangePassword={setPassword}
                  values={{ ...user }}
                />
              </TabPane>
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
