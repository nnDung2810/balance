import React, { useState, Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@globalContext';
import { DataTable, ModalForm, ModalDrag, Button } from '@components';
import { ColumnCodeForm, ColumnCodeTable, ColumnCodeTypeForm } from '@columns';
import { CodeService } from '@services';
import { CodeTypeService } from '../../../services/code/type';
import { keyRole } from '@utils';

const Page = () => {
  const { t } = useTranslation();
  const { formatDate, user, timeOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [listType, set_listType] = useState([]);

  useEffect(() => {
    const init = async () => {
      await dataTableRef?.current?.onChange();
      await getListType();
    };
    if (timeOut.current) {
      clearTimeout(timeOut.current);
    }
    timeOut.current = setTimeout(() => {
      init().then();
    }, 10);
  }, []);
  const getListType = async () => {
    const { data } = await CodeTypeService.get();
    const list = data.map((item: any) => ({
      value: item?.code,
      label: item?.name,
    }));
    set_listType(list);
    return { data };
  };

  const dataTableRef = useRef<any>();
  const modalFormRef = useRef<any>();
  const modalDragRef = useRef<any>();
  return (
    <Fragment>
      <DataTable
        ref={dataTableRef}
        onRow={() => ({
          onDoubleClick: () => null,
        })}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        pageSizeRender={(sizePage: number) => sizePage}
        pageSizeWidth={'50px'}
        paginationDescription={(from: number, to: number, total: number) =>
          'Hiển thị ' + from + '-' + to + ' / Tổng số ' + total + ' danh mục'
        }
        Get={CodeService.get}
        columns={ColumnCodeTable({
          t,
          formatDate,
          listType,
          handleEdit: modalFormRef?.current?.handleEdit,
          handleDelete: modalFormRef?.current?.handleDelete,
          permissions: user?.role?.permissions,
        })}
        rightHeader={
          <div className={'flex gap-2'}>
            {user?.role?.permissions?.includes(keyRole.P_CODE_TYPE_LISTED) && (
              <Button icon={'las la-plus'} text={t('Type Code')} onClick={() => modalDragRef?.current?.handleShow()} />
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
        ref={modalFormRef}
        title={(data: any) => (!data?.id ? t('routes.admin.Layout.Add') : t('routes.admin.Layout.Edit'))}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        handleChange={async () => await dataTableRef?.current?.onChange()}
        columns={ColumnCodeForm({
          t,
          formatDate,
          listType,
        })}
        GetById={user?.role?.permissions?.includes(keyRole.P_CODE_DETAIL) && CodeService.getById}
        Post={CodeService.post}
        Put={CodeService.put}
        Delete={CodeService.delete}
        widthModal={600}
        idElement={'user'}
      />
      <ModalDrag
        ref={modalDragRef}
        title={() => t('Type Category')}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        columns={ColumnCodeTypeForm({ t })}
        Get={getListType}
        Put={CodeTypeService.put}
        Post={CodeTypeService.post}
        Delete={CodeTypeService.delete}
        GetById={
          user?.role?.permissions?.includes(keyRole.P_CODE_TYPE_DETAIL) &&
          ((id: string, parent: any, item: any) => CodeTypeService.getById(item.code))
        }
        widthForm={600}
        isReloadLoadToSave={true}
        idElement={'role'}
        showAddNew={user?.role?.permissions?.includes(keyRole.P_CODE_TYPE_CREATE)}
        conditionEdit={(item: any) => user?.role?.permissions?.includes(keyRole.P_CODE_TYPE_UPDATE) && !item?.isPrimary}
        conditionDelete={(item: any) =>
          user?.role?.permissions?.includes(keyRole.P_CODE_TYPE_DELETE) && !item?.isPrimary
        }
      />
    </Fragment>
  );
};
export default Page;
