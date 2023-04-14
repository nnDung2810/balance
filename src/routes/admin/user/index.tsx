import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Button, DataTable } from '@components';
import { keyRole, routerLinks } from '@utils';
import { UserFacade, GlobalFacade } from '@reducers';
import { Plus } from '@svgs';
import { ColumnTableUser } from './column';

const Page = () => {
  const { t } = useTranslation();
  const { formatDate, user } = GlobalFacade();
  const navigate = useNavigate();

  const userFacade = UserFacade();
  useEffect(() => {
    switch (userFacade.status) {
      case 'delete.fulfilled':
        dataTableRef.current.onChange();
        break;
    }
  }, [userFacade.status]);

  const dataTableRef = useRef<any>();
  return (
    <DataTable
      facade={userFacade}
      ref={dataTableRef}
      onRow={() => ({ onDoubleClick: () => null })}
      pageSizeRender={(sizePage: number) => sizePage}
      pageSizeWidth={'50px'}
      paginationDescription={(from: number, to: number, total: number) =>
        t('routes.admin.Layout.Pagination', { from, to, total })
      }
      columns={ColumnTableUser({
        t,
        formatDate,
        permissions: user?.role?.permissions,
        navigate,
        dataTableRef,
      })}
      rightHeader={
        <div className={'flex gap-2'}>
          {user?.role?.permissions?.includes(keyRole.P_USER_CREATE) && (
            <Button
              icon={<Plus className="icon-cud !h-5 !w-5" />}
              text={t('components.button.New')}
              onClick={() => navigate(routerLinks('User/Add'))}
            />
          )}
        </div>
      }
    />
  );
};
export default Page;
