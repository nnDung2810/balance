import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Button, DataTable } from '@components';
import { keyRole, routerLinks } from '@utils';
import { UserFacade, GlobalFacade } from '@reducers';
import { Plus } from '@svgs';
import { ColumnTableStore } from './column';
import { TableRefObject } from '@models';

const Page = () => {
  const { t } = useTranslation();
  const { formatDate, user } = GlobalFacade();
  const navigate = useNavigate();

  const userFacade = UserFacade();
  useEffect(() => {
    switch (userFacade.status) {
      case 'delete.fulfilled':
        dataTableRef?.current?.onChange!();
        break;
    }
  }, [userFacade.status]);

  const dataTableRef = useRef<TableRefObject>(null);
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
      columns={ColumnTableStore({
        t,
        formatDate,
        permissions: user?.role?.permissions,
        navigate,
        dataTableRef,
      })}
      rightHeader={
        <div className={'flex gap-2 !bg-teal-900 !rounded-lg'}>
          {user?.role?.permissions?.includes(keyRole.P_USER_CREATE) && (
            <Button
              className='!bg-teal-900 !rounded-3xl'
              icon={<Plus className="icon-cud !h-5 !w-5 !fill-slate-200 " />}
              text='Thêm quản trị viên'
              onClick={() => navigate(routerLinks('User/Add'))}
            />
          )}
        </div>
      }
    />
  );
};
export default Page;
