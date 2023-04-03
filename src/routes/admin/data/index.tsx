import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { DataTable, ModalForm, Button } from '@components';
import { ColumnDataForm, ColumnDataTable } from '@columns';
import { keyRole } from '@utils';
import { dataSlice, dataAction, dataTypeAction, useAppDispatch, useTypedSelector, globalAction } from '@reducers';

const Page = () => {
  const { t } = useTranslation();
  const { formatDate, user } = useTypedSelector((state: any) => state[globalAction.name]);
  const dispatch = useAppDispatch();
  const { result } = useTypedSelector((state: any) => state[dataTypeAction.name]);

  useEffect(() => {
    if (!result.data) {
      dispatch(dataTypeAction.get({}));
    }
  }, [dispatch]);
  const listType = (result.data || []).map((item: any) => ({ value: item.code, label: item.name }));

  const dataTableRef = useRef<any>();
  const modalFormRef = useRef<any>();

  return (
    <Fragment>
      <DataTable
        action={dataAction}
        showSearch={false}
        ref={dataTableRef}
        onRow={() => ({
          onDoubleClick: () => null,
        })}
        pageSizeRender={(sizePage: number) => sizePage}
        pageSizeWidth={'50px'}
        paginationDescription={(from: number, to: number, total: number) =>
          'Hiển thị ' + from + '-' + to + ' / Tổng số ' + total + ' danh mục'
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
                icon={'las la-plus'}
                text={t('components.button.New')}
                onClick={() => modalFormRef?.current?.handleEdit()}
              />
            )}
          </div>
        }
      />
      <ModalForm
        action={dataAction}
        slice={dataSlice}
        ref={modalFormRef}
        title={(data: any) => (!data?.id ? t('routes.admin.Layout.Add') : t('routes.admin.Layout.Edit'))}
        handleChange={async () => await dataTableRef?.current?.onChange()}
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
