import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, DataTable, ModalForm } from '@components';
import { ColumnFormUser, ColumnTableUser } from '@columns';
import { keyRole } from '@utils';
import { useAppDispatch, useTypedSelector, userAction, userRoleAction, globalAction } from '@reducers';
import { Plus } from 'src/assets/svgs';

const Page = () => {
  const { t } = useTranslation();
  const { formatDate, user } = useTypedSelector((state: any) => state[globalAction.name]);
  const dispatch = useAppDispatch();
  const { result } = useTypedSelector((state: any) => state[userRoleAction.name]);

  const { status } = useTypedSelector((state: any) => state[userAction.name]);
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
  return (
    <Fragment>
      <DataTable
        action={userAction}
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
                icon={<Plus className="icon-cud !h-5 !w-5" />}
                text={t('components.button.New')}
                onClick={() => modalFormRef?.current?.handleEdit()}
              />
            )}
          </div>
        }
      />
      <ModalForm
        action={userAction}
        firstRun={async () => {
          if (!result.data) {
            dispatch(userRoleAction.get({}));
          }
        }}
        ref={modalFormRef}
        title={(data: any) => (!data?.id ? t('routes.admin.Layout.Add') : t('routes.admin.Layout.Edit'))}
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
