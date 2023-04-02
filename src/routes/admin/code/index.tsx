import React, { useState, Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@globalContext';
import { DataTable, ModalForm, ModalDrag, Button } from '@components';
import { ColumnCodeForm, ColumnCodeTable, ColumnCodeTypeForm } from '@columns';
import { CodeTypeService } from '../../../services/code/type';
import { keyRole } from '@utils';
import { useAppDispatch, useTypedSelector, codeSlide, codeAction, codeTypeAction } from '@reducers';

const Page = () => {
  const { t } = useTranslation();
  const { formatDate, user, timeOut } = useAuth();
  const dispatch = useAppDispatch();
  const { result } = useTypedSelector((state: any) => state[codeTypeAction.name]);
  const listType = (result.data || []).map((item: any) => ({ value: item.code, label: item.name }));
  useEffect(() => {
    if (!result.data) {
      dispatch(codeTypeAction.get({}));
    }
  }, [dispatch]);

  const dataTableRef = useRef<any>();
  const modalFormRef = useRef<any>();
  const modalDragRef = useRef<any>();
  return (
    <Fragment>
      <DataTable
        action={codeAction}
        slice={codeSlide}
        ref={dataTableRef}
        onRow={() => ({
          onDoubleClick: () => null,
        })}
        pageSizeRender={(sizePage: number) => sizePage}
        pageSizeWidth={'50px'}
        paginationDescription={(from: number, to: number, total: number) =>
          'Hiển thị ' + from + '-' + to + ' / Tổng số ' + total + ' danh mục'
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
                icon={'las la-plus'}
                text={t('Code.Type Code')}
                onClick={() => modalDragRef?.current?.handleShow()}
              />
            )}
            {user?.role?.permissions?.includes(keyRole.P_CODE_CREATE) && (
              <Button
                icon={'las la-plus'}
                text={t('routes.admin.Layout.Add')}
                onClick={() => modalFormRef?.current?.handleEdit()}
              />
            )}
          </div>
        }
      />
      <ModalForm
        action={codeAction}
        slice={codeSlide}
        ref={modalFormRef}
        title={(data: any) => (!data?.id ? t('routes.admin.Layout.Add') : t('routes.admin.Layout.Edit'))}
        handleChange={async () => await dataTableRef?.current?.onChange()}
        columns={ColumnCodeForm({
          t,
          formatDate,
          listType,
        })}
        widthModal={600}
        idElement={'user'}
      />
      {/*<ModalDrag*/}
      {/*  ref={modalDragRef}*/}
      {/*  title={() => t('Code.Type Category')}*/}
      {/*  isLoading={isLoading}*/}
      {/*  setIsLoading={setIsLoading}*/}
      {/*  columns={ColumnCodeTypeForm({ t })}*/}
      {/*  Get={getListType}*/}
      {/*  Put={CodeTypeService.put}*/}
      {/*  Post={CodeTypeService.post}*/}
      {/*  Delete={CodeTypeService.delete}*/}
      {/*  GetById={*/}
      {/*    user?.role?.permissions?.includes(keyRole.P_CODE_TYPE_DETAIL) &&*/}
      {/*    ((id: string, parent: any, item: any) => CodeTypeService.getById(item.code))*/}
      {/*  }*/}
      {/*  widthForm={600}*/}
      {/*  isReloadLoadToSave={true}*/}
      {/*  idElement={'role'}*/}
      {/*  showAddNew={user?.role?.permissions?.includes(keyRole.P_CODE_TYPE_CREATE)}*/}
      {/*  conditionEdit={(item: any) => user?.role?.permissions?.includes(keyRole.P_CODE_TYPE_UPDATE) && !item?.isPrimary}*/}
      {/*  conditionDelete={(item: any) =>*/}
      {/*    user?.role?.permissions?.includes(keyRole.P_CODE_TYPE_DELETE) && !item?.isPrimary*/}
      {/*  }*/}
      {/*/>*/}
    </Fragment>
  );
};
export default Page;
