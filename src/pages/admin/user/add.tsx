import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { UserRoleFacade, UserFacade } from '@store';
import { routerLinks } from '@utils';
import { Form } from '@core/form';
import { User } from '@store/global';

const Page = () => {
  const { t } = useTranslation();
  const { result, get } = UserRoleFacade();
  const userFacade = UserFacade();
  const { data, isLoading, queryParams, status } = userFacade;
  const navigate = useNavigate();
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();

  useEffect(() => {
    if (!result?.data) get({});

    userFacade.set({ data: undefined });

    return () => {
      isReload.current && userFacade.get(param);
    };
  }, [id]);

  useEffect(() => {
    switch (status) {
      case 'post.fulfilled':
        navigate(routerLinks('User') + '/' + data?.id);
        break;
    }
  }, [status]);

  const handleBack = () => navigate(routerLinks('User/List') + '?' + new URLSearchParams(param).toString());
  const handleSubmit = (values: User) => {
    userFacade.post(values);
  };

  return (
    <Fragment>
      <div className='bg-white rounded-2xl p-5'>
        <div className={'text-xl text-teal-900 font-bold block pb-5'}>{t('titles.Userinformation')}</div>
        {!!result?.data && (
          <Form
            values={{ ...data }}
            className="intro-x"
            columns={[
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
                  tabIndex: 1,
                  col: 6,
                  rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
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
                title: 'user.Note',
                name: 'note',
                formItem: {
                  col: 12,
                  type: 'textarea',
                },
              },
              {
                title: 'fdfdf',
                name: 'roleId',
                formItem: {
                  type: 'hidden',

                },
              },
              {
                title: 'a',
                name: 'orgId',
                formItem: {
                  type: 'hidden',
                }
              },
              {
                title: 'a',
                name: 'subOrgId',
                formItem: {
                  type: 'hidden',
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
