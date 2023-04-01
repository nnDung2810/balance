import React, { Fragment, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@globalContext';
import { Button, DataTable, ModalDrag, ModalForm } from '@components';
import { ColumnFormUser, ColumnFormUserRole, ColumnTableUser } from '@columns';
import { UserRoleService } from '@services';
import { UserService } from '../../../services/user';
import action from '../../../redux/reducers/users/action';

import { keyRole } from '@utils';

const Page = () => {
  const { t } = useTranslation();
  const { formatDate, user } = useAuth();

  const [listPermission, set_listPermission] = useState([]);
  const [listRole, set_listRole] = useState([]);

  const getListRole = async () => {
    const { data } = await UserRoleService.get();
    set_listRole(data);
    if (!listPermission.length) {
      const { data: permission } = await UserRoleService.getPermission();
      set_listPermission(permission);
    }

    return { data };
  };
  const dataTableRef = useRef<any>();
  const modalFormRef = useRef<any>();
  // const modalDragRoleRef = useRef<any>();
  return (
    <Fragment>
      <DataTable
        action={action}
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
            {/*{user?.role?.permissions?.includes(keyRole.P_USER_ROLE_LISTED) && (*/}
            {/*  <Button*/}
            {/*    icon={'las la-users-cog'}*/}
            {/*    text={t('components.button.Role')}*/}
            {/*    onClick={() => modalDragRoleRef?.current?.handleShow()}*/}
            {/*  />*/}
            {/*)}*/}

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
        action={action}
        firstRun={async () => {
          if (!listRole.length) {
            await getListRole();
          }
        }}
        ref={modalFormRef}
        title={(data: any) => (!data?.id ? t('routes.admin.Layout.Add') : t('routes.admin.Layout.Edit'))}
        handleChange={async () => await dataTableRef?.current?.onChange()}
        columns={ColumnFormUser({
          t,
          formatDate,
          listRole,
        })}
        widthModal={600}
        idElement={'user'}
      />
      {/*<ModalDrag*/}
      {/*  ref={modalDragRoleRef}*/}
      {/*  title={() => t('components.button.Role')}*/}
      {/*  isLoading={isLoading}*/}
      {/*  setIsLoading={setIsLoading}*/}
      {/*  columns={ColumnFormUserRole({ t, listPermission })}*/}
      {/*  Get={getListRole}*/}
      {/*  Put={UserRoleService.put}*/}
      {/*  Post={UserRoleService.post}*/}
      {/*  Delete={UserRoleService.delete}*/}
      {/*  GetById={user?.role?.permissions?.includes(keyRole.P_USER_ROLE_DETAIL) && UserRoleService.getById}*/}
      {/*  widthForm={600}*/}
      {/*  isReloadLoadToSave={true}*/}
      {/*  idElement={'role'}*/}
      {/*  showAddNew={user?.role?.permissions?.includes(keyRole.P_USER_ROLE_CREATE)}*/}
      {/*  conditionEdit={() => user?.role?.permissions?.includes(keyRole.P_USER_ROLE_UPDATE)}*/}
      {/*  conditionDelete={() => user?.role?.permissions?.includes(keyRole.P_USER_ROLE_DELETE)}*/}
      {/*/>*/}
    </Fragment>
  );
};
export default Page;
