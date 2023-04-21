import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Avatar, Button, DataTable } from '@components';
import { keyRole, routerLinks } from '@utils';
import { UserFacade, GlobalFacade, CodeFacade, UserRoleFacade } from '@reducers';
import { Edit, Plus, Trash } from '@svgs';
import { TableRefObject } from '@models';
import dayjs from 'dayjs';
import { Popconfirm, Tooltip } from 'antd';
import { ColumnTableUser } from './column';

const Page = () => {
  const { t } = useTranslation();
  const { formatDate, user } = GlobalFacade();
  const navigate = useNavigate();
  const userFacade = UserFacade();
  const { data, isLoading, queryParams, status } = userFacade;
  const { result, get } = UserRoleFacade();
  useEffect(() => {
    switch (userFacade.status) {
      case 'delete.fulfilled':
        dataTableRef?.current?.onChange!();
        break;
    }
  }, [userFacade.status, data]);

  const dataTableRef = useRef<TableRefObject>(null);
  return (
    <DataTable
      facade={userFacade}
      ref={dataTableRef}
      xScroll={'1400px'}
      onRow={(data: any) => ({ onDoubleClick: () =>  navigate(routerLinks('User/Edit') + '/' + data.id)})}
      pageSizeRender={(sizePage: number) => sizePage}
      pageSizeWidth={'50px'}
      paginationDescription={(from: number, to: number, total: number) =>
        t('routes.admin.Layout.Pagination', { from, to, total })
      }
      columns={ColumnTableUser({
        t,
        formatDate,
        listRole: result?.data || [],
      //  permissions: user?.role?.permissions,
        navigate,
        dataTableRef,
      })}
      rightHeader={
        <div className={'flex gap-2'}>
          {/* {user?.role?.permissions?.includes(keyRole.P_USER_CREATE) && ( */}
            <Button
              className='!bg-green-900 !rounded-xl'
              icon={<Plus className="icon-cud !h-5 !w-5" />}
              text={t('Thêm quản trị viên')}
              onClick={() => navigate(routerLinks('User/Add'))}
            />
          {/* )} */}
        </div>
      }
    />
  );
};
export default Page;
