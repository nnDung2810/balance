import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Button } from '@components/button';
import { DataTable } from '@components/data-table';
import { routerLinks } from '@utils';
import { UserFacade } from '@reducers';
import { Plus } from '@svgs';
import { TableRefObject } from '@models';
import { ColumnFormUser } from '@routes/admin/user/column';

const Page = () => {
  const { t } = useTranslation();
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
      xScroll={"1400px"}
      pageSizeRender={(sizePage: number) => sizePage}
      onRow={(data: any) => ({ onDoubleClick: () => navigate(routerLinks('User/Edit') + '/' + data?.id) })}
      pageSizeWidth={'50px'}
      paginationDescription={(from: number, to: number, total: number) =>
        t('routes.admin.Layout.Pagination', { from, to, total })
      }
      columns={ColumnFormUser({ t })}
      rightHeader={
        <div className={'flex gap-2'}>
          <Button
            icon={<Plus className="icon-cud !h-5 !w-5" />}
            text={t(`titles.User/Button`)}
            onClick={() => navigate(routerLinks('User/Add'))}
          />
        </div>
      }
    />
  );
};
export default Page;
