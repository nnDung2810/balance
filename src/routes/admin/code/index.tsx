import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { DataTable, ModalForm, Button } from '@components';
import { keyRole } from '@utils';
import { GlobalFacade, CodeFacade, CodeTypeFacade } from '@reducers';
import { Plus } from '@svgs';
import { ColumnCodeForm, ColumnCodeTable } from './column';
import { FormModalRefObject, TableRefObject } from '@models';
const Page = () => {
  const { t } = useTranslation();
  const { formatDate, user } = GlobalFacade();
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
        columns={ColumnCodeTable({
          t,
          formatDate,
          listType,
          modalFormRef,
          permissions: user?.role?.permissions,
        })}
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
        columns={ColumnCodeForm({
          t,
          formatDate,
          listType,
        })}
        widthModal={600}
        idElement={'user'}
      />
    </Fragment>
  );
};
export default Page;
