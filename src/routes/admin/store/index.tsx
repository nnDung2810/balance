import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Button } from '@components/button';
import { DataTable } from '@components/data-table';

import { routerLinks } from '@utils';
import { DistrictFacade, ProvinceFacade, StoreFacade } from '@reducers';
import { Plus } from '@svgs';
import { ColumnTableStore } from './column';
import { TableRefObject } from '@models';


const Page = () => {
  const { t } = useTranslation();
  // const { formatDate, user } = GlobalFacade();
  const navigate = useNavigate();
  const isReload = useRef(false);
  const storeFace = StoreFacade();
  const { result, isLoading, queryParams, status } = storeFace;
  const param = JSON.parse(queryParams || '{}');
  /////
  const provinceFacade = ProvinceFacade()
  const districtFacade = DistrictFacade();
  const { data } = districtFacade;
  /////
  useEffect(() => {
    console.log(provinceFacade.get({}))
    if(!result?.data) storeFace.get({})

    if(!data) districtFacade.get('01')

    return () => {
      isReload.current && storeFace.get(param);
    };
  }, [result?.data]);

  const dataTableRef = useRef<TableRefObject>(null);
  return (
    <DataTable
      facade={storeFace}
      ref={dataTableRef}
      xScroll = '1440px'
      onRow={(data: any) => ({
        onDoubleClick: () => {
          navigate(routerLinks('store-managerment/edit') + '/' + data.id);
        },
      })}
      pageSizeRender={(sizePage: number) => sizePage}
      pageSizeWidth={'50px'}
      paginationDescription={(from: number, to: number, total: number) =>
        t('routes.admin.Layout.Pagination', { from, to, total })
      }
      columns={ColumnTableStore({
        t,
        navigate,
        dataTableRef,
      })}
      rightHeader={
        <div className={'flex gap-2 !bg-teal-900 !rounded-lg mt-0 max-lg:mt-2.5 max-lg:w-48'}>
          <Button
            className='!bg-teal-900 !rounded-3xl'
            icon={<Plus className="icon-cud !h-5 !w-5 !fill-slate-200 " />}
            text={t('titles.Store/Add')}
            onClick={() => navigate(routerLinks('store-managerment/create'))}
          />
        </div>
      }
    />
  );
};
export default Page;
