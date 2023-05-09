import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { UserRoleFacade, UserFacade } from '@store';
import { routerLinks } from '@utils';
import { Form } from '@core/form';
import { User } from '@store/global';
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
    <Fragment>
      <div className='bg-white rounded-2xl p-5'>
        <div className={'text-xl text-teal-900 font-bold block pb-5'}>{t('titles.Userinformation')}</div>
        {!!result?.data && (
          <Form
            values={{ ...data }}
            className="intro-x"
            columns={[{
              title: 'user.UserId',
              name: 'code',
              formItem: {
                disabled: () => true,
                tabIndex: 1,
                col: 6,
              },
            },
            {
              title: 'user.Fullname',
              name: 'name',
              formItem: {
                tabIndex: 1,
                col: 6,
                rules: [{ type: 'required' }],
              },
            },
            {
              title: 'Email',
              name: 'email',
              formItem: {
                disabled: () => true,
                tabIndex: 1,
                col: 6,
              },
            },
            {
              title: 'user.Phone Number',
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
                        <Option value="ADMIN"><div>{t('user.Roles.ADMIN')}</div></Option>
                        <Option value="OWNER_SUPPLIER"><div>{t('user.Roles.OWNER_SUPPLIER')}</div></Option>
                        <Option value="OWNER_STORE"><div>{t('user.Roles.OWNER_STORE')}</div></Option>
                      </Select>
                    </div>
                  );
                },
              },
            },
            {
              title: 'user.Note',
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
  );
};
export default Page;
