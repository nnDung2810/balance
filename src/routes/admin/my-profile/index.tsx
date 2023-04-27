import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Form } from '@components/form';
import { Spin } from '@components/spin';
import { Button } from '@components/button';
import { GlobalFacade } from '@reducers';
// import { ColumnProfile } from './column';
import { t } from 'i18next';
import { routerLinks } from '@utils';
import { useNavigate } from 'react-router';
import classNames from 'classnames';
import { UserSolid } from '@svgs';
//import { ColumnProfile } from './column';
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';

const Page = () => {
  const { t } = useTranslation();
  const { user, isLoading, putProfile,setPassword, profile } = GlobalFacade();
  const listPosition = useRef([]);
  const navigate = useNavigate();
  useEffect(() => {
    profile();
  }, []);
  return (
    <Fragment>
      <div className='grid grid-cols-3 gap-5 w-full'>
        <div className='col-span-1 bg-white p-5 border rounded-xl'>
          <Spin className="" spinning={isLoading}>
            <Form
              className="text-center items-centers text-2xl text-black font-semibold"
              columns={[
                {
                  name: 'profileImage',
                  formItem: {
                    type: 'upload',
                    mode: 'multiple',
                    onlyImage: true,
                  },
                },
                {
                  title: t('Họ và tên'),
                  name: 'name',
                  formItem: {
                    render: (form, values) => {
                      return (
                        <div className=''>
                          {values.name}
                        </div>
                      )
                    }
                  },
                },
                {
                  title: t('Vai trò'),
                  name: 'userRole',
                  formItem: {
                    render: (text: any, item: any) => {
                      if (text = item.userRole[0].mtRole.code === "ADMIN") {
                        return (
                          <div className='flex w-full flex-row justify-center pt-2'>
                            <div><UserSolid className='w-7 h-7 mr-2 fill-slate-500' /></div>
                            <div className='text-xl text-gray-500'>Quản trị viên</div>
                          </div>
                        )
                      } else if (text = item.userRole[0].mtRole.code === "OWNER_SUPPLIER") {
                        return (
                          <div className='flex w-full flex-row justify-center'>
                            <div><UserSolid className='w-7 h-7 mr-2' /></div>
                            <div>Đại diện NCC</div>
                          </div>
                        )
                      } else {
                        return (
                          <div className='flex w-full flex-row justify-center'>
                            <div><UserSolid className='w-7 h-7 mr-2' /></div>
                            <div>Đại diện cửa hàng</div>
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
          <Spin className="" spinning={isLoading}>
            <React.Fragment>
              <Tabs defaultActiveKey="1" size="large">
                <TabPane tab="Thông tin cá nhân" key="1">
                  <Form
                    columns={[
                      {
                        title: ('Họ và tên'),
                        name: 'name',
                        formItem: {
                          col: 12,
                          rules: [{ type: 'required' }],
                        },
                      },
                      {
                        title: ('Email'),
                        name: 'email',
                        formItem: {
                          tabIndex: 1,
                          col: 6,
                          rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
                        },
                      },
                      {
                        title: ('Số điện thoại'),
                        name: 'phoneNumber',
                        formItem: {
                          tabIndex: 1,
                          col: 6,
                          rules: [{ type: 'required' }, { type: 'phone', min: 10, max: 15 }],
                        },
                      },
                      {
                        title: ('Ghi chú'),
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
                        text={t('Huỷ Thao Tác')}
                        className={'md:min-w-[8rem] justify-center out-line'}
                        onClick={() => {
                          navigate(routerLinks('User/List'))
                        }}
                      />
                    )}
                    values={{ ...user }}
                  />
                </TabPane>
                <TabPane tab="Đổi mật khẩu" key="2">
                  <Form
                    columns={[
                      {
                        title: ('Mật khẩu hiện tại'),
                        name: 'password',
                        formItem: {
                          col: 12,
                          type: 'password',
                          rules: [{ type: 'required' }, { type: 'min', value: 6 }],
                          placeholder: 'Nhập mật khẩu'
                        },
                      },
                      {
                        title: ('Mật khẩu mới'),
                        name: 'passwordNew',
                        formItem: {
                          col: 12,
                          type: 'password',
                          rules: [{ type: 'required' }, { type: 'min', value: 6 }],
                          placeholder: 'Nhập mật khẩu mới'
                        },
                      },
                      {
                        title: ('Xác nhận mật khẩu'),
                        name: 'passwordComfirm',
                        formItem: {
                          col: 12,
                          type: 'password',
                          rules: [{ type: 'required' }, { type: 'min', value: 6 }],
                          placeholder: 'Xác nhận mật khẩu'
                        },
                      },
                    ]}
                    disableSubmit={isLoading}
                    extendButton={(form) => (
                      <Button
                        text={t('Huỷ Thao Tác')}
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
            </React.Fragment>
          </Spin>
        </div>
        <div>
        </div>
      </div>
    </Fragment>
  );
};
export default Page;
