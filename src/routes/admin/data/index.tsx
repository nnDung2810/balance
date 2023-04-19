import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { DataTable, ModalForm, Button } from '@components';
import { ColumnDataForm, ColumnDataTable } from './column';
import { keyRole } from '@utils';
import { GlobalFacade, DataTypeFacade, DataFacade } from '@reducers';
import { Plus } from '@svgs';
import { FormModalRefObject, TableRefObject } from '@models';

const Page = () => {
  const { t } = useTranslation();
  const { formatDate, user } = GlobalFacade();

  const { result, get } = DataTypeFacade();
  useEffect(() => {
    if (!result?.data) get({});
  }, []);
  const listType = (result?.data || []).map((item: any) => ({ value: item.code, label: item.name }));

  const dataFacade = DataFacade();
  const { status } = dataFacade;
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
        facade={dataFacade}
        showSearch={false}
        ref={dataTableRef}
        onRow={() => ({
          onDoubleClick: () => null,
        })}
        pageSizeRender={(sizePage: number) => sizePage}
        pageSizeWidth={'50px'}
        paginationDescription={(from: number, to: number, total: number) =>
          t('routes.admin.Layout.Pagination', { from, to, total })
        }
        columns={ColumnDataTable({
          t,
          formatDate,
          listType,
          modalFormRef,
          permissions: user?.role?.permissions,
        })}
        rightHeader={
          <div className={'flex gap-2'}>
            {user?.role?.permissions?.includes(keyRole.P_DATA_CREATE) && (
              <Button
                icon={<Plus className="icon-cud !h-5 !w-5" />}
                text={t('components.button.New')}
                onClick={() => modalFormRef?.current?.handleEdit!()}
              />
            )}
          </div>
        }
      />
      <ModalForm
        facade={dataFacade}
        ref={modalFormRef}
        title={() => (!dataFacade.data?.id ? t('routes.admin.Layout.Add') : t('routes.admin.Layout.Edit'))}
        columns={ColumnDataForm({
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
