import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { UserRoleFacade, UserFacade } from '@reducers';
import { routerLinks } from '@utils';
import { Form } from '@components/form';
import { User } from '@reducers/global';

import { ColumnFormAdd } from '@routes/admin/user/column';

const Page = () => {
  const { t } = useTranslation();
  const { result, get } = UserRoleFacade();
  const userFacade = UserFacade();
  const { data, isLoading, queryParams, status } = userFacade;
  const navigate = useNavigate();
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();
  const roleId = 1
  const subOrgId = null
  const orgId = null

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
    if (id) userFacade.put({ ...values, id });
    const status = "ACTIVE"
    userFacade.post({ ...values, orgId, subOrgId, roleId, status });
    //console.log({ ...values, orgId, subOrgId, roleId, status })
  };

  return (
    <div className={'bg-white rounded-2xl p-5'}>
      <div>
        <h1 className={'text-2xl text-teal-900 font-bold block pb-5'}>{t('titles.Userinformation')}</h1>
      </div>
      {!!result?.data && (
        <Form
          values={{ ...data }}
          className="intro-x"
          columns={ColumnFormAdd({ t })}
          handSubmit={handleSubmit}
          disableSubmit={isLoading}
          handCancel={handleBack}
        />
      )}
    </div>
  );
};
export default Page;
