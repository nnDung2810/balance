import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { UserRoleFacade, UserFacade } from '@reducers';
import { Form } from '@components/form';
import { User } from '@reducers/global';
import { LockOutlined } from '@ant-design/icons';
import { routerLinks } from '@utils';

import { Select } from 'antd';

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
  const { Option } = Select;

  useEffect(() => {
    if (!result?.data) get({});

    if (id) userFacade.getById({ id });

    return () => {
      isReload.current && userFacade.get(param);
    };
  }, [id, data]);

  useEffect(() => {
    switch (status) {
      case 'put.fulfilled':
        if (Object.keys(param).length > 0) isReload.current = true;

        if (isBack.current) handleBack();
        else {
          isBack.current = true;
        }
        break;
    }
  }, [status]);

  const handleBack = () => navigate(routerLinks('User/List') + '?' + new URLSearchParams(param).toString());
  const handleSubmit = (values: User) => {
    userFacade.put({ ...values, id });
  };

  return (
    <div className={'w-full'}>
      <Fragment>
        <div className='bg-white'>
          <div className='text-xl text-green-900 px-6 pt-4 font-mono font-bold'>
            Thông tin người dùng
          </div>
          {!!result?.data && (
            <Form
              values={{ ...data }}
              className="intro-x p-6 pb-4 pt-3 rounded-lg w-full "
              columns={[{
                title: t('Mã người dùng'),
                name: 'code',
                formItem: {
                  disabled: () => true,
                  addonAfter: () => <LockOutlined />,
                  tabIndex: 1,
                  col: 6,
                },
              },
              {
                title: t('Họ và tên'),
                name: 'name',
                formItem: {
                  tabIndex: 1,
                  col: 6,
                  rules: [{ type: 'required' }],
                },
              },
              {
                title: t('Email'),
                name: 'email',
                formItem: {
                  disabled: () => true,
                  addonAfter: () => <LockOutlined />,
                  tabIndex: 1,
                  col: 6,
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
                title: 'Vai trò',
                name: 'roleCode',
                formItem: {
                  col: 12,
                  type: 'select',
                  render: (form, values) => {
                    const roleCode = values.roleCode;
                    return (
                      <div>
                        <div>Vai trò</div>
                        <Select value={roleCode} disabled={true} className="py-2" style={{ width: "100%" }}>
                          <Option value="ADMIN">Quản trị viên</Option>
                          <Option value="OWNER_SUPPLIER">Nhà cung cấp</Option>
                          <Option value="OWNER_STORE">Chủ cửa hàng</Option>
                        </Select>
                      </div>
                    );
                  },
                },
              },
              {
                title: t('Ghi chú'),
                name: 'note',
                formItem: {
                  col: 12,
                  type: 'textarea',
                },
              },
              ]}
              handSubmit={handleSubmit}
              disableSubmit={isLoading}
              handCancel={handleBack}
            />
          )}
        </div>
      </Fragment>
    </div>
  );
};
export default Page;
