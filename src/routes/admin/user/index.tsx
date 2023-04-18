import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Avatar, Button, DataTable } from '@components';
import { keyRole, routerLinks } from '@utils';
import { UserFacade, GlobalFacade, CodeFacade } from '@reducers';
import { Edit, Plus, Trash } from '@svgs';
import { TableRefObject } from '@models';
import dayjs from 'dayjs';
import { Popconfirm, Tooltip } from 'antd';

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
      columns={[
        {
          title: t(`user.Fullname`),
          name: 'name',
          tableItem: {
            filter: { type: 'search' },
            width: 200,
            fixed: window.innerWidth > 767,
            sorter: true,
            onCell: () => ({
              style: { paddingTop: '0.25rem', paddingBottom: 0 },
              onClick: async () => null,
            }),
            render: (text: string, item: any) => text && <Avatar src={item.avatar} text={item.name} />,
          },
        },
        {
          title: t('user.Position'),
          name: 'positionCode',
          tableItem: {
            filter: {
              type: 'checkbox',
              name: 'positionCode',
              get: {
                facade: CodeFacade,
                format: (item: any) => ({
                  label: item.name,
                  value: item.code,
                }),
                params: (fullTextSearch: string, value) => ({
                  fullTextSearch,
                  filter: { type: 'POS' },
                  extend: { code: value },
                }),
              },
            },
            sorter: true,
            render: (item) => item?.name,
          },
        },
        {
          title: t('Email'),
          name: 'email',
          tableItem: {
            filter: { type: 'search' },
            sorter: true,
          },
        },
        {
          title: t('user.Phone Number'),
          name: 'phoneNumber',
          tableItem: {
            filter: { type: 'search' },
            sorter: true,
          },
        },
        {
          title: t('user.Date of birth'),
          name: 'dob',
          tableItem: {
            filter: { type: 'date' },
            sorter: true,
            render: (text: string) => dayjs(text).format(formatDate),
          },
        },
        {
          title: t('user.Start Date'),
          name: 'startDate',
          tableItem: {
            filter: { type: 'search' },
            sorter: true,
            render: (text: string) => dayjs(text).format(formatDate),
          },
        },
        {
          title: t('user.Action'),
          tableItem: {
            width: 80,
            align: 'center',
            onCell: () => ({
              style: { paddingTop: '0.25rem', paddingBottom: '0.25rem' },
            }),
            render: (text: string, data) => (
              <div className={'flex gap-2'}>
                {user?.role?.permissions?.includes(keyRole.P_USER_UPDATE) && (
                  <Tooltip title={t('routes.admin.Layout.Edit')}>
                    <Edit
                      className="icon-cud bg-blue-600 hover:bg-blue-400"
                      onClick={() => navigate(routerLinks('User') + '/' + data.id)}
                    />
                  </Tooltip>
                )}

                {user?.role?.permissions?.includes(keyRole.P_USER_DELETE) && (
                  <Tooltip title={t('routes.admin.Layout.Delete')}>
                    <Popconfirm
                      placement="left"
                      title={t('components.datatable.areYouSureWant')}
                      onConfirm={() => dataTableRef?.current?.handleDelete(data.id)}
                      okText={t('components.datatable.ok')}
                      cancelText={t('components.datatable.cancel')}
                    >
                      <Trash className="icon-cud bg-red-600 hover:bg-red-400" />
                    </Popconfirm>
                  </Tooltip>
                )}
              </div>
            ),
          },
        },
      ]}
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
