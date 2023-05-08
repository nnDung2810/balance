import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Button } from '@core/button';
import { DataTable } from '@core/data-table';
import { routerLinks } from '@utils';
import { UserFacade} from '@store';
import { Plus } from '@svgs';
import { DataTableModel, TableRefObject } from '@models';

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

  const columns: DataTableModel[] = [
    {
      title: t(`Mã người dùng`),
      name: 'code',
      tableItem: {
        width: 140,
      },
    },
    {
      title: t('Họ và tên'),
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
      title: t('Email'),
      name: 'email',
      tableItem: {
        width: 130,
        filter: { type: 'search' },
      },
    },
    {
      title: t('Số điện thoại'),
      name: 'phoneNumber',
      tableItem: {
        width: 100,
      },
    },
    {
      title: t('Vai trò'),
      name: 'userRole',
      tableItem: {
        width: 200,
        filter: { type: 'search' },
        render: (text: any, item: any) => {
          if (text = item.userRole[0].mtRole.code === "ADMIN") {
            return "Quản trị viên";
          } else if (text = item.userRole[0].mtRole.code === "OWNER_SUPPLIER") {
            return "Đại diện NCC";
          } else {
            return "Đại diện cửa hàng";
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
        t('routes.admin.Layout.User', { from, to, total })
      }
      columns={columns}
      rightHeader={
        <div className={'flex gap-2'}>
          <Button
            icon={<Plus className="icon-cud !h-5 !w-5" />}
            text={t('titles.User/Add')}
            onClick={() => navigate(routerLinks('User/Add'))}
          />
        </div>
      }
    />
  );
};
export default Page;
