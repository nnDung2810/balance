import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@components/button';
import DataTable from '@components/data-table';
import ModalForm from '@components/modal/form';
import { keyRole } from '@utils';
import { GlobalFacade, CodeFacade, CodeTypeFacade } from '@reducers';
import { Edit, Plus, Trash } from '@svgs';
import { FormModalRefObject, TableRefObject } from '@models';
import { Popconfirm, Tooltip } from 'antd';
import slug from 'slug';
const Page = () => {
  const { t } = useTranslation();
  const { user } = GlobalFacade();
  const { result, get } = CodeTypeFacade();
  const listType = (result?.data || []).map((item) => ({ value: item.code, label: item.name }));
  useEffect(() => {
    if (!result?.data) get({});
  }, []);

  const codeFacade = CodeFacade();
  const { status } = codeFacade;
  useEffect(() => {
    switch (status) {
      case 'put.fulfilled':
      case 'post.fulfilled':
      case 'delete.fulfilled':
        dataTableRef?.current?.onChange!();
        break;
    }
  }, [status]);

  const dataTableRef = useRef<TableRefObject>(null);
  const modalFormRef = useRef<FormModalRefObject>(null);
  return (
    <Fragment>
      <DataTable
        facade={codeFacade}
        ref={dataTableRef}
        onRow={() => ({
          onDoubleClick: () => null,
        })}
        pageSizeRender={(sizePage: number) => sizePage}
        pageSizeWidth={'50px'}
        paginationDescription={(from: number, to: number, total: number) =>
          t('routes.admin.Layout.Pagination', { from, to, total })
        }
        columns={[
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
              render: (text: string) => text && listType.filter((item) => item.value === text)[0]?.label,
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
              render: (text: string, data) => (
                <div className={'flex gap-2'}>
                  {user?.role?.permissions?.includes(keyRole.P_CODE_UPDATE) && (
                    <Tooltip title={t('routes.admin.Layout.Edit')}>
                      <Edit
                        className="icon-cud bg-blue-600 hover:bg-blue-400"
                        onClick={() => modalFormRef?.current?.handleEdit!(data)}
                      />
                    </Tooltip>
                  )}
                  {user?.role?.permissions?.includes(keyRole.P_CODE_DELETE) && (
                    <Tooltip title={t('routes.admin.Layout.Delete')}>
                      <Popconfirm
                        placement="left"
                        title={t('components.datatable.areYouSureWant')}
                        onConfirm={() => modalFormRef?.current?.handleDelete!(data.id)}
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
            {user?.role?.permissions?.includes(keyRole.P_CODE_CREATE) && (
              <Button
                icon={<Plus className="icon-cud !h-5 !w-5" />}
                text={t('routes.admin.Layout.Add')}
                onClick={() => modalFormRef?.current?.handleEdit!()}
              />
            )}
          </div>
        }
      />
      <ModalForm
        facade={codeFacade}
        ref={modalFormRef}
        title={() => (!codeFacade.data?.id ? t('routes.admin.Layout.Add') : t('routes.admin.Layout.Edit'))}
        columns={[
          {
            title: t('Code.Name'),
            name: 'name',
            formItem: {
              col: 4,
              rules: [{ type: 'required' }],
              onBlur: (e, form) => {
                if (e.target.value && !form.getFieldValue('code')) {
                  form.setFieldValue('code', slug(e.target.value).toUpperCase());
                }
              },
            },
          },
          {
            title: t('Code.Type'),
            name: 'type',
            formItem: {
              type: 'select',
              col: 4,
              rules: [{ type: 'required' }],
              list: listType || [],
            },
          },
          {
            title: t('titles.Code'),
            name: 'code',
            formItem: {
              col: 4,
              rules: [{ type: 'required' }],
            },
          },
          {
            title: t('user.Description'),
            name: 'description',
            formItem: {
              type: 'textarea',
            },
          },
        ]}
        widthModal={600}
        idElement={'user'}
      />
    </Fragment>
  );
};
export default Page;
