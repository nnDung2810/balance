import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Plus } from '@svgs';
import { Button } from '@core/button';
import { DataTable } from '@core/data-table';
import { routerLinks } from '@utils';
import { StoreFacade } from '@store';

const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isReload = useRef(false);
  const storeFace = StoreFacade();
  const { result, queryParams } = storeFace;
  const param = JSON.parse(queryParams || '{}');

  useEffect(() => {
    if (!result?.data) storeFace.get({})

    return () => {
      isReload.current && storeFace.get(param);
    };
  }, [result?.data]);

  return (
    <DataTable
      facade={storeFace}
      defaultRequest={{ page: 1, perPage: 10, type: 'STORE' }}
      xScroll='1440px'
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
      columns={[
        {
          title: 'Mã cửa hàng',
          name: 'code',
          tableItem: {
            width: 150,
          },
        },
        {
          title: 'Tên cửa hàng',
          name: 'name',
          tableItem: {
          },
        },
        {
          title: 'Địa chỉ',
          name: 'address',
          tableItem: {
            render: (value: any, item: any) => item.address?.street + ', ' + item.address?.ward.name + ', ' + item.address?.district.name + ', ' + item.address?.province.name,
          },
        },
        {
          title: 'Loại cửa hàng',
          name: 'isMain',
          tableItem: {
            render: (text: string) => text ? 'Cửa hàng chính' : 'Cửa hàng chi nhánh'
          },
        },
        {
          title: 'Người đại diện',
          name: 'userRole',
          tableItem: {
            render: (value: any, item: any) => item.userRole[0]?.userAdmin.name,
          },
        },
        {
          title: 'Số điện thoại',
          name: 'userRole',
          tableItem: {
            render: (value: any, item: any) => item.userRole[0]?.userAdmin.phoneNumber,
          },
        },
      ]}
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
