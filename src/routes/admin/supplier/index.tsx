import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Button, DataTable } from '@components';
import { keyRole, routerLinks } from '@utils';
import { UserFacade, GlobalFacade, SupplierFacade } from '@reducers';
import { Plus } from '@svgs';
import { ColumnTableSupplier } from './column';
import { TableRefObject } from '@models';

const Page = () => {
  const { t } = useTranslation();
  const { formatDate, user } = GlobalFacade();
  const navigate = useNavigate();

  const supplierFacade = SupplierFacade();
  useEffect(() => {
    switch (supplierFacade.status) {
      case 'delete.fulfilled':
        dataTableRef?.current?.onChange!();
        break;
    }
  }, [supplierFacade.status]);

  const dataTableRef = useRef<TableRefObject>(null);
  return (
    <div className=' pr-5 h-full pb-10'>
      <div className='bg-white rounded-xl p-4 pb-10 relative text-center '>
        <DataTable
          facade={supplierFacade}
          ref={dataTableRef}
          xScroll = '1440px'
          onRow={() => ({ onDoubleClick: () => null })}
          pageSizeRender={(sizePage: number) => sizePage}
          pageSizeWidth={'50px'}
          paginationDescription={(from: number, to: number, total: number) =>
            t('routes.admin.Layout.Pagination', { from, to, total })
          }
          columns={ColumnTableSupplier({
            t,
            formatDate,
            navigate,
            dataTableRef,
          })}
          rightHeader={
            <div className={'flex gap-2'}>
              {user && (
                <Button
                  icon={<Plus className="icon-cud !h-5 !w-5" />}
                  text={t('titles.Supplier/Add')}
                  onClick={() => navigate(routerLinks('Supplier/Add'))}
                />
              )}
            </div>
          }
        />
      </div>
    </div>
  );
};
export default Page;
