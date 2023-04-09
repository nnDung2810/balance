import { Popconfirm, Tooltip } from 'antd';
import React from 'react';
import dayjs from 'dayjs';

import { Avatar } from '@components';
import { keyRole, routerLinks } from '@utils';
import { DataTableModel } from '@models';
import { codeAction } from '@reducers';
import { Edit, Trash } from '@svgs';

const Column = ({ t, formatDate, permissions, navigate, dataTableRef }: any) => {
  const col: DataTableModel[] = [
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
            action: codeAction,
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
        render: (text: string, data: any) => (
          <div className={'flex gap-2'}>
            {permissions?.includes(keyRole.P_USER_UPDATE) && (
              <Tooltip title={t('routes.admin.Layout.Edit')}>
                <Edit
                  className="icon-cud bg-blue-600 hover:bg-blue-400"
                  onClick={() => navigate(routerLinks('User') + '/' + data.id)}
                />
              </Tooltip>
            )}

            {permissions?.includes(keyRole.P_USER_DELETE) && (
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
  ];
  return col;
};
export default Column;
