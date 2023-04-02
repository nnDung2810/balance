import React, { Fragment, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@globalContext';
import { Button, DataTable, ModalForm } from '@components';
import { ColumnFormUser, ColumnTableUser } from '@columns';
import { keyRole } from '@utils';
import { useAppDispatch, useTypedSelector, userAction, userSlice, userRoleAction } from '@reducers';

const Page = () => {
  const { t } = useTranslation();
  const { formatDate, user } = useAuth();
  const dispatch = useAppDispatch();
  const { result } = useTypedSelector((state: any) => state[userRoleAction.name]);

  const dataTableRef = useRef<any>();
  const modalFormRef = useRef<any>();
  return (
    <Fragment>
      <DataTable
        slice={userSlice}
        action={userAction}
        ref={dataTableRef}
        onRow={() => ({
          onDoubleClick: () => null,
        })}
        pageSizeRender={(sizePage: number) => sizePage}
        pageSizeWidth={'50px'}
        paginationDescription={(from: number, to: number, total: number) =>
          'Hiển thị ' + from + '-' + to + ' / Tổng số ' + total + ' danh mục'
        }
        columns={ColumnTableUser({
          t,
          formatDate,
          modalFormRef,
          permissions: user?.role?.permissions,
        })}
        rightHeader={
          <div className={'flex gap-2'}>
            {user?.role?.permissions?.includes(keyRole.P_USER_CREATE) && (
              <Button
                icon={'las la-plus'}
                text={t('components.button.New')}
                onClick={() => modalFormRef?.current?.handleEdit()}
              />
            )}
          </div>
        }
      />
      <ModalForm
        slice={userSlice}
        action={userAction}
        firstRun={async () => {
          if (!result.data) {
            dispatch(userRoleAction.get({}));
          }
        }}
        ref={modalFormRef}
        title={(data: any) => (!data?.id ? t('routes.admin.Layout.Add') : t('routes.admin.Layout.Edit'))}
        handleChange={async () => await dataTableRef?.current?.onChange()}
        columns={ColumnFormUser({
          t,
          formatDate,
          listRole: result.data || [],
        })}
        widthModal={600}
        idElement={'user'}
      />
    </Fragment>
  );
};
export default Page;
