import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { DataTable, ModalForm, Button } from '@components';
import { ColumnCodeForm, ColumnCodeTable } from '@columns';
import { keyRole } from '@utils';
import { useAppDispatch, useTypedSelector, codeAction, codeTypeAction, globalAction } from '@reducers';
import { Plus } from '@svgs';
const Page = () => {
  const { t } = useTranslation();
  const { formatDate, user } = useTypedSelector((state: any) => state[globalAction.name]);
  const dispatch = useAppDispatch();
  const { result } = useTypedSelector((state: any) => state[codeTypeAction.name]);
  const listType = (result.data || []).map((item: any) => ({ value: item.code, label: item.name }));
  useEffect(() => {
    if (!result.data) {
      dispatch(codeTypeAction.get({}));
    }
  }, [dispatch]);

  const { status } = useTypedSelector((state: any) => state[codeAction.name]);
  useEffect(() => {
    switch (status) {
      case 'put.fulfilled':
      case 'post.fulfilled':
      case 'delete.fulfilled':
        dataTableRef.current.onChange();
        break;
    }
  }, [status]);

  const dataTableRef = useRef<any>();
  const modalFormRef = useRef<any>();
  const modalDragRef = useRef<any>();
  return (
    <Fragment>
      <DataTable
        action={codeAction}
        ref={dataTableRef}
        onRow={() => ({
          onDoubleClick: () => null,
        })}
        pageSizeRender={(sizePage: number) => sizePage}
        pageSizeWidth={'50px'}
        paginationDescription={(from: number, to: number, total: number) =>
          t('routes.admin.Layout.Show') +
          ' ' +
          from +
          '-' +
          to +
          ' / ' +
          t('routes.admin.Layout.Total') +
          ' ' +
          total +
          ' ' +
          t('routes.admin.Layout.categories')
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
            {user?.role?.permissions?.includes(keyRole.P_CODE_TYPE_LISTED) && (
              <Button
                icon={<Plus className="icon-cud !h-5 !w-5" />}
                text={t('Code.Type Code')}
                onClick={() => modalDragRef?.current?.handleShow()}
              />
            )}
            {user?.role?.permissions?.includes(keyRole.P_CODE_CREATE) && (
              <Button
                icon={<Plus className="icon-cud !h-5 !w-5" />}
                text={t('routes.admin.Layout.Add')}
                onClick={() => modalFormRef?.current?.handleEdit()}
              />
            )}
          </div>
        }
      />
      <ModalForm
        action={codeAction}
        ref={modalFormRef}
        title={(data: any) => (!data?.id ? t('routes.admin.Layout.Add') : t('routes.admin.Layout.Edit'))}
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
