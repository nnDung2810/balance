import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Button } from '@core/button';
import { DataTable } from '@core/data-table';

import { routerLinks } from '@utils';
import { UserFacade } from '@store';
import { Plus } from '@svgs';
import { DataTableModel, TableRefObject } from '@models';


const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userFacade = UserFacade();
  const { data } = userFacade;

  useEffect(() => {
    switch (userFacade.status) {
      case 'delete.fulfilled':
        dataTableRef?.current?.onChange!();
        break;
    }
  }, [userFacade.status]);

  const dataTableRef = useRef<TableRefObject>(null);

  const columns: DataTableModel[] = [
    {
      title: 'user.UserId',
      name: 'code',
      tableItem: {
        width: 140,
      },
    },
    {
      title: 'user.Fullname',
      name: 'name',
      tableItem: {
        width: 400,
        filter: { type: 'search' },
        onCell: () => ({
          style: { paddingTop: '0.25rem', paddingBottom: 0 },
          onClick: async () => null,
        }),
        render: (text: string, item: any) => text,
      },
    },
    {
      title: 'Email',
      name: 'email',
      tableItem: {
        width: 130,
        filter: { type: 'search' },
      },
    },
    {
      title: 'user.Phone Number',
      name: 'phoneNumber',
      tableItem: {
        width: 100,
      },
    },
    {
      title: 'user.Role',
      name: 'userRole',
      tableItem: {
        width: 200,
        filter: { type: 'search' },
        render: (text: any, item: any) => {
          if (text = item.userRole[0].mtRole.code === "ADMIN") {
            return <div>{t('user.Roles.ADMIN')}</div>;
          } else if (text = item.userRole[0].mtRole.code === "OWNER_SUPPLIER") {
            return <div>{t('user.Roles.OWNER_SUPPLIER')}</div>;
          } else {
            return <div>{t('user.Roles.OWNER_STORE')}</div>;
          }
        }
      },
    },
  ];

  return (
    <DataTable
      facade={userFacade}
      ref={dataTableRef}
      onRow={(data: any) => ({ onDoubleClick: () => navigate(routerLinks('User/Edit') + '/' + data.id) })}
      xScroll={'1400px'}
      pageSizeRender={(sizePage: number) => sizePage}
      pageSizeWidth={'50px'}
      paginationDescription={(from: number, to: number, total: number) =>
        t('routes.admin.Layout.user', { from, to, total })
      }
      columns={columns}
      rightHeader={
        <div className={'flex gap-2'}>
          <Button
            icon={<Plus className="icon-cud !h-5 !w-5" />}
            text={t('titles.User/Button')}
            onClick={() => navigate(routerLinks('User/Add'))}
            className='!rounded-2xl'
          />
        </div>
      }
    />
  );
};
export default Page;
