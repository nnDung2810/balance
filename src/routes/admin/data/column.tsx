import { Popconfirm, Tooltip } from 'antd';
import React from 'react';

import { keyRole } from '@utils';
import { DataTableModel, FormModel } from '@models';
import { Edit, Trash } from '@svgs';
import slug from 'slug';

export const ColumnDataTable = ({ t, modalFormRef, listType, permissions }: any) => {
  const col: DataTableModel[] = [
    {
      title: t('Data.Type'),
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
      title: t('Data.Name'),
      name: 'translations',
      tableItem: {
        filter: { type: 'search' },
        sorter: true,
        render: (text: any[]) =>
          text?.filter((item: any) => item?.language === localStorage.getItem('i18nextLng'))[0].name || '',
      },
    },
    {
      title: t('Data.Order'),
      name: 'order',
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
                <Edit
                  className="icon-cud bg-blue-600 hover:bg-blue-400"
                  onClick={() => modalFormRef?.current?.handleEdit(data)}
                />
              </Tooltip>
            )}
            {permissions?.includes(keyRole.P_CODE_DELETE) && (
              <Tooltip title={t('routes.admin.Layout.Delete')}>
                <Popconfirm
                  placement="left"
                  title={t('components.datatable.areYouSureWant')}
                  onConfirm={() => modalFormRef?.current?.handleDelete(data.id)}
                  okText={t('components.datatable.ok')}
                  cancelText={t('components.datatable.cancel')}
                >
                  <Trash className="icon-cud bg-red-600 hover:bg-red-400 " />
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
export const ColumnDataForm = ({ t, listType }: any) => {
  const col: FormModel[] = [
    {
      title: t('Data.Type'),
      name: 'type',
      formItem: {
        type: 'select',
        col: 4,
        rules: [{ type: 'required' }],
        list: listType || [],
      },
    },
    {
      title: t('Data.Order'),
      name: 'order',
      formItem: {
        col: 4,
        type: 'number',
      },
    },
    {
      title: t('Data.Created At'),
      name: 'createdAt',
      formItem: {
        col: 4,
        type: 'date',
      },
    },
    {
      title: t('Data.Image'),
      name: 'image',
      formItem: {
        type: 'upload',
        mode: 'multiple',
      },
    },
    {
      name: 'translations',
      title: '',
      formItem: {
        type: 'tab',
        tab: {
          label: 'language',
          value: 'language',
        },
        list: [
          { label: 'English', value: 'en' },
          { label: 'Vietnam', value: 'vn' },
        ],
        column: [
          {
            title: t('Name'),
            name: 'name',
            formItem: {
              col: 6,
              rules: [{ type: 'required' }],
              onBlur: (e, form, name) => {
                if (e.target.value && !form.getFieldValue(['translations', name[0], 'slug'])) {
                  form.setFieldValue(['translations', name[0], 'slug'], slug(e.target.value));
                }
              },
            },
          },
          {
            title: t('Slug'),
            name: 'slug',
            formItem: {
              col: 6,
            },
          },
          {
            title: t('Description'),
            name: 'description',
            formItem: {
              type: 'textarea',
            },
          },
          {
            name: 'seoTitle',
            title: 'SEO Title',
            formItem: {
              col: 6,
            },
          },
          {
            name: 'seoDescription',
            title: 'SEO Description',
            formItem: {
              col: 6,
            },
          },

          {
            title: t('Content'),
            name: 'content',
            formItem: {
              type: 'editor',
            },
          },
        ],
      },
    },
  ];
  return col;
};
