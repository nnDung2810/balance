import React, { useState, Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@globalContext';
import { DataTable, ModalForm, ModalDrag, Button } from '@components';
import { ColumnDataForm, ColumnDataTable, ColumnDataTypeForm, ColumnPageForm } from '@columns';
import { DataService, DataTypeService, PageService } from '@services';
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
    const { data } = await DataTypeService.get();
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
  const modalDragPageRef = useRef<any>();

  return (
    <Fragment>
      <DataTable
        showSearch={false}
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
        Get={DataService.get}
        columns={ColumnDataTable({
          t,
          formatDate,
          listType,
          handleEdit: modalFormRef?.current?.handleEdit,
          handleDelete: modalFormRef?.current?.handleDelete,
          permissions: user?.role?.permissions,
        })}
        rightHeader={
          <div className={'flex gap-2'}>
            {user?.role?.permissions?.includes(keyRole.P_PAGE_LISTED) && (
              <Button
                icon={'las la-pager'}
                text={t('Data.Page')}
                onClick={() => modalDragPageRef?.current?.handleShow()}
              />
            )}
            {user?.role?.permissions?.includes(keyRole.P_DATA_TYPE_LISTED) && (
              <Button
                icon={'las la-briefcase'}
                text={t('Data.Type Data')}
                onClick={() => modalDragRef?.current?.handleShow()}
              />
            )}
            {user?.role?.permissions?.includes(keyRole.P_DATA_CREATE) && (
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
        ref={modalFormRef}
        title={(data: any) => (!data?.id ? t('routes.admin.Layout.Add') : t('routes.admin.Layout.Edit'))}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        handleChange={async () => await dataTableRef?.current?.onChange()}
        columns={ColumnDataForm({
          t,
          formatDate,
          listType,
        })}
        GetById={DataService.getById}
        Post={DataService.post}
        Put={DataService.put}
        Delete={DataService.delete}
        widthModal={600}
        idElement={'user'}
      />
      <ModalDrag
        ref={modalDragRef}
        title={() => t('Type Category')}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        columns={ColumnDataTypeForm({ t })}
        Get={getListType}
        Put={DataTypeService.put}
        Post={DataTypeService.post}
        Delete={DataTypeService.delete}
        GetById={(id: string, item: any) => DataTypeService.getById(item.code)}
        widthForm={600}
        isReloadLoadToSave={true}
        idElement={'role'}
        showAddNew={user?.role?.permissions?.includes(keyRole.P_DATA_TYPE_CREATE)}
        conditionEdit={(item: any) => user?.role?.permissions?.includes(keyRole.P_DATA_TYPE_UPDATE) && !item?.isPrimary}
        conditionDelete={(item: any) =>
          user?.role?.permissions?.includes(keyRole.P_DATA_TYPE_DELETE) && !item?.isPrimary
        }
      />
      <ModalDrag
        ref={modalDragPageRef}
        title={() => t('Data.Page')}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        columns={ColumnPageForm({ t })}
        Get={PageService.get}
        Post={PageService.post}
        Put={PageService.put}
        Delete={PageService.delete}
        GetById={PageService.getById}
        widthForm={600}
        isReloadLoadToSave={false}
        idElement={'page'}
        showAddNew={user?.role?.permissions?.includes(keyRole.P_PAGE_CREATE)}
        conditionEdit={(item: any) => user?.role?.permissions?.includes(keyRole.P_PAGE_UPDATE) && !item?.isPrimary}
        conditionDelete={(item: any) => user?.role?.permissions?.includes(keyRole.P_PAGE_DELETE) && !item?.isPrimary}
        saveAll={() => PageService.putAll(modalDragPageRef.current.data)}
        showName={(data: any) => (
          <div className={'flex items-center gap-2'}>
            {(data.style ? '[' + data.style + '] ' : '') + data.name + (data.slug ? ' (' + data.slug + ')' : '')}
            {data.isHomePage && <i className={'las la-check-circle text-green-500'} />}
          </div>
        )}
        isAllowDrag={() => true}
        maxDepth={2}
      />
    </Fragment>
  );
};
export default Page;
