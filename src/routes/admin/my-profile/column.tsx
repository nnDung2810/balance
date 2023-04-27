import { FormModel } from '@models';
import { Eye, User } from '@svgs';
import { Col, Input, Row, Tabs, Collapse } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';
import Column from 'antd/es/table/Column';
import TabPane from 'antd/es/tabs/TabPane';
import classNames from 'classnames';
import React from 'react';

const personalInfoColumn: FormModel[] = [
  {
    title: ('Họ và tên'),
    name: 'name',
    formItem: {
      col: 6,
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
];
const personalInfoColumn1: FormModel[] = [
  {
    title: ('Mật khẩu hiện tại'),
    name: 'password',
    formItem: {
      col: 6,
      type: 'password',
      rules: [{ type: 'required' }, { type: 'password' }],
      placeholder: 'Nhập mật khẩu'
    },
  },
  {
    title: ('Mật khẩu mới'),
    name: 'newpassword',
    formItem: {
      col: 6,
      type: 'password',
      rules: [{ type: 'required' }, { type: 'password' }, { type: 'min', value: 6 }],
      placeholder: 'Nhập mật khẩu mới'
    },
  },
  {
    title: ('Xác nhận mật khẩu'),
    name: 'retypedpassword',
    formItem: {
      col: 6,
      type: 'password',
      rules: [{ type: 'required' }, { type: 'password' }, { type: 'min', value: 6 }],
      placeholder: 'Xác nhận mật khẩu'
    },
  },
];

export const ColumnProfile = ({ t }: any) => {
  const col: FormModel[] = [
    {
      name: 'account',
      title: '',
      formItem: {
        type: 'tab',
        tab: {
          label: 'myProfile',
          value: 'myProfile',
        },
        list: [
          { label: 'Thông tin cá nhân', value: '1' },
          { label: 'Đổi mật khẩu', value: '2' },
        ],
        column:[
            {
              title: t('Họ và tên'),
              name: 'name',
              formItem: {
                col: 6,
                rules: [{ type: 'required' }],
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
              title: t('Số điện thoại'),
              name: 'phoneNumber',
              formItem: {
                col: 6,
                rules: [{ type: 'required' }, { type: 'phone', min: 10, max: 15 }],
              },
            },
            {
              title: t('Ghi chú'),
              name: 'note',
              formItem: {
                type: 'textarea',
              },
            },
        ]
      },
    },

  ];
  return col;
};
export const ColumnProfileAvatar = ({ t }: any) => {
  const col: FormModel[] = [
    {
      name: 'profileImage',
      formItem: {
        type: 'upload',
        mode: 'multiple',
      },
    },
    {
      name: 'name',
      formItem: {
        render: (form, values) => {
          return (
            <div>
              <Tabs defaultActiveKey="1" size="large">
                <TabPane tab="Thông tin cá nhân" key="1">
                  {personalInfoColumn.map((item) => {
                    return (
                      <div>
                        {item.name === 'name' ? (
                          <div className='col-span-12'>
                            <FormItem
                              {...item.formItem}
                              label={item.title}
                              name={item.name}
                              rules={item.formItem?.rules ? item.formItem.rules.map(rule => ({ ...rule, type: 'string', validator: undefined })) : undefined}
                              initialValue={values[item.name]}
                            >
                              <Input className='border-gray-400 col-span-6 rounded-lg' placeholder={'Nhập ' + item.title?.toString().toLocaleLowerCase()} />
                            </FormItem>
                          </div>
                        ) : null}
                        <div className='grid gap-5 grid-cols-12'>
                          <React.Fragment>
                          {item.name === 'email' || item.name === 'phoneNumber'  ? (
                            <>
                            <div className='col-span-6'>
                              <FormItem
                                {...item.formItem}
                                label={item.title}
                                name={item.name}
                                rules={item.formItem?.rules ? item.formItem.rules.map(rule => ({ ...rule, type: 'string', validator: undefined })) : undefined}
                                initialValue={values[item.name]}
                              >
                                <Input tabIndex={1} className='border-gray-400 rounded-lg' placeholder={'Nhập ' + item.title?.toString().toLocaleLowerCase()} />
                              </FormItem>
                            </div>
                            <div className='col-span-6'>
                              <FormItem
                                {...item.formItem}
                                label={item.title}
                                name={item.name}
                                rules={item.formItem?.rules ? item.formItem.rules.map(rule => ({ ...rule, type: 'string', validator: undefined })) : undefined}
                                initialValue={values[item.name]}
                              >
                                <Input tabIndex={1} className='border-gray-400 rounded-lg' placeholder={'Nhập ' + item.title?.toString().toLocaleLowerCase()} />
                              </FormItem>
                            </div>
                            </>
                            ) : null}
                          </React.Fragment>
                        </div>
                        {/* <div className='grid gap-5 grid-cols-12'>
                          <React.Fragment>
                            {item.name === 'email' && (
                              <div className='col-span-12 md:col-span-6'>
                                <FormItem
                                  {...item.formItem}
                                  label={item.title}
                                  name={item.name}
                                  rules={item.formItem?.rules ? item.formItem.rules.map(rule => ({ ...rule, type: 'string', validator: undefined })) : undefined}
                                  initialValue={values[item.name]}
                                >
                                  <Input tabIndex={1} className='border-gray-400 rounded-lg' placeholder={'Nhập ' + item.title?.toString().toLocaleLowerCase()} />
                                </FormItem>
                              </div>
                            )}
                            {item.name === 'phoneNumber' && (
                              <div className='col-span-12 md:col-span-6'>
                                <FormItem
                                  {...item.formItem}
                                  label={item.title}
                                  name={item.name}
                                  rules={item.formItem?.rules ? item.formItem.rules.map(rule => ({ ...rule, type: 'string', validator: undefined })) : undefined}
                                  initialValue={values[item.name]}
                                >
                                  <Input tabIndex={1} className='border-gray-400 rounded-lg' placeholder={'Nhập ' + item.title?.toString().toLocaleLowerCase()} />
                                </FormItem>
                              </div>
                            )}
                          </React.Fragment>
                        </div> */}
                        {item.name === 'note' ? (
                          <div className=''>
                            <FormItem
                              {...item.formItem}
                              label={item.title}
                              name={item.name}
                              rules={item.formItem?.rules ? item.formItem.rules.map(rule => ({ ...rule, type: 'string', validator: undefined })) : undefined}
                              initialValue={values[item.name]}
                            >
                              <TextArea rows={6} placeholder={'Nhập ' + item.title?.toString().toLocaleLowerCase()} />
                            </FormItem>
                          </div>
                        ) : null}
                        {/* <FormItem
                        {...item.formItem}
                        label={item.title}
                        name={item.name}
                        rules={item.formItem?.rules ? item.formItem.rules.map(rule => ({ ...rule, type: 'string', validator: undefined })) : undefined}
                        initialValue={values[item.name]}
                      >
                        {item.formItem?.type === 'textarea' ? (
                          <TextArea rows={6} placeholder={'Nhập ' + item.title?.toString().toLocaleLowerCase()} />
                        ) : (
                            <Input className='border-gray-400 col-span-6 rounded-lg' placeholder={'Nhập ' + item.title?.toString().toLocaleLowerCase()} />
                        )}
                      </FormItem> */}
                      </div>
                    );
                  })}
                </TabPane>
                <TabPane tab="Đổi mật khẩu" key="2">
                  {personalInfoColumn1.map((item) => {
                    return (
                      <FormItem
                        className=''
                        {...item.formItem}
                        label={item.title}
                        name={item.name}
                        rules={item.formItem?.rules ? item.formItem.rules.map(rule => ({ ...rule, type: 'string', validator: undefined })) : undefined}
                        initialValue={values[item.name]}
                      >
                        <Input  className='rounded-lg' type={item.formItem?.type === 'password' ? 'password' : 'password'} placeholder={item.formItem?.placeholder} />
                      </FormItem>
                    );
                  })}
                </TabPane>
              </Tabs>
            </div>
          );
        },
      },
    },
  ];
  return col;
};
