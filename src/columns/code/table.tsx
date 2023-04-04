import { Popconfirm, Tooltip } from 'antd';
import React from 'react';
import { keyRole } from '@utils';
import { DataTableModel } from '@models';
import { Edit, Question, Trash } from 'src/assets/svgs';
import '../../assets/styles/index.less';

const Column = ({ t, modalFormRef, listType, permissions }: any) => {
  const col: DataTableModel[] = [
    {
      title: t('titles.Code'),
      name: 'code',
      tableItem: {
        width: 100,
        filter: { type: 'search' },
        sorter: true,
      },
    },
    {
      title: t('Code.Name'),
      name: 'name',
      tableItem: {
        filter: { type: 'search' },
        sorter: true,
      },
    },
    {
      title: t('Code.Type'),
      name: 'type',
      tableItem: {
        filter: {
          type: 'radio',
          list: listType || [],
        },
        width: 110,
        sorter: true,
        render: (text: string) => text && listType.filter((item: any) => item.value === text)[0]?.label,
      },
    },
    {
      title: t('user.Description'),
      name: 'description',
      tableItem: {
        filter: { type: 'search' },
        sorter: true,
      },
    },
    {
      title: t('user.Action'),
      tableItem: {
        width: 100,
        align: 'center',
        onCell: () => ({
          style: { paddingTop: '0.25rem', paddingBottom: '0.25rem' },
        }),
        render: (text: string, data: any) => (
          <div className={'flex gap-2'}>
            {permissions?.includes(keyRole.P_CODE_UPDATE) && (
              <Tooltip title={t('routes.admin.Layout.Edit')}>
                {/* <Button icon={'las la-edit'} onClick={() => modalFormRef?.current?.handleEdit(data)} /> */}
                <Edit className="icon-cud bg-blue-600 " onClick={() => modalFormRef?.current?.handleEdit(data)} />
                {/* <img src={edit} className="h-7 w-7 bg-sky-900 !fill-white rounded hover:cursor-pointer"
                      onClick={() => modalFormRef?.current?.handleEdit(data)}/> */}
              </Tooltip>
            )}
            {permissions?.includes(keyRole.P_CODE_DELETE) && (
              <Tooltip title={t('routes.admin.Layout.Delete')}>
                <Popconfirm
                  placement="left"
                  title={t('components.datatable.areYouSureWant')}
                  icon={<Question className="h-6 w-6 fill-yellow-500 absolute -top-0.5 -left-1" />}
                  onConfirm={() => modalFormRef?.current?.handleDelete(data.id)}
                  okText={t('components.datatable.ok')}
                  cancelText={t('components.datatable.cancel')}
                >
                  <Trash className="icon-cud bg-red-500 " />
                  {/* <img src={trash} className="h-7 w-7 !bg-red-500 !fill-white rounded hover:cursor-pointer"/> */}
                  {/* <Button icon={'las la-trash-alt'} className={'!bg-red-500 text-white'} /> */}
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
