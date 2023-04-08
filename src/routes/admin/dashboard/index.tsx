import React, { useEffect, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { echartBar, echartLine, echartPie, echartBarStack, linearGradient } from '@utils';
import { DataTable, Spin } from '@components';
import { Briefcase, CheckCircle, User, UserSolid } from 'src/assets/svgs';

const Page = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  useEffect(() => {
    echartBar({
      id: 'chart-profile',
      label: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dev'],
      tooltip: {
        backgroundColor: '#6B7280',
        textStyle: { color: '#ffffff' },
      },
      grid: {
        left: '20px',
        bottom: '0',
        right: '20px',
      },
      legend: {
        textStyle: { color: '#ffffff' },
      },
      xAxis: {
        show: false,
      },
      series: [
        {
          name: t('dashboard.Total Profile'),
          type: 'bar',
          barWidth: '8px',
          itemStyle: {
            color: 'rgba(255,255,255,0.3)',
            borderRadius: 4,
          },
          data: [164, 285, 115, 281, 295, 124, 125, 262, 177, 160, 267, 253],
        },
        {
          name: t('dashboard.Activated Profile'),
          type: 'bar',
          barWidth: '8px',
          itemStyle: {
            color: '#ffffff',
            borderRadius: 4,
          },
          data: [216, 169, 214, 215, 138, 162, 105, 212, 119, 124, 158, 210],
        },
      ],
    });
    echartLine({
      id: 'chart-line1',
      label: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dev'],
      color: ['#206DDF'],
      series: [
        {
          name: 'Free',
          type: 'line',
          smooth: true,
          showSymbol: false,
          symbolSize: 0,
          lineStyle: {
            width: 3,
            color: '#206DDF',
          },
          areaStyle: {
            color: linearGradient({ hex: '#206DDF' }),
          },
          data: [150, 190, 228, 274, 212, 249, 278, 104, 219, 257, 115, 127],
        },
      ],
    });
    echartLine({
      id: 'chart-purchasing',
      label: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dev'],
      color: ['#206DDF', '#6B7280', '#F59E0B', '#10b981'],
      legend: {
        textStyle: {
          color: '#ffffff',
        },
      },
      grid: {
        top: '40px',
        left: '20px',
        bottom: '30px',
        right: '20px',
      },
      xAxis: {
        axisLabel: { show: true },
        axisLine: {
          show: true,
          lineStyle: { color: '#ffffff' },
        },
        splitLine: { show: false },
        axisTick: {
          show: true,
          lineStyle: { color: '#ffffff' },
        },
      },
      series: [
        {
          name: t('dashboard.Free'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          symbolSize: 0,
          lineStyle: {
            width: 3,
            color: '#206DDF',
          },
          areaStyle: {
            color: linearGradient({ hex: '#206DDF' }),
          },
          data: [150, 190, 228, 274, 212, 249, 278, 104, 219, 257, 115, 127],
        },
        {
          name: t('dashboard.Silver'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          symbolSize: 0,
          lineStyle: {
            width: 3,
            color: '#6B7280',
          },
          areaStyle: {
            color: linearGradient({ hex: '#6B7280' }),
          },
          data: [164, 285, 115, 281, 295, 124, 125, 262, 177, 160, 267, 253],
        },
        {
          name: t('dashboard.Gold'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          symbolSize: 0,
          lineStyle: {
            width: 3,
            color: '#F59E0B',
          },
          areaStyle: {
            color: linearGradient({ hex: '#F59E0B' }),
          },
          data: [184, 281, 114, 190, 199, 101, 239, 216, 231, 132, 102, 244, 257],
        },
        {
          name: t('dashboard.Platinum'),
          type: 'line',
          smooth: true,
          showSymbol: false,
          symbolSize: 0,
          lineStyle: {
            width: 3,
            color: '#10b981',
          },
          areaStyle: {
            color: linearGradient({ hex: '#10b981' }),
          },
          data: [216, 169, 214, 215, 138, 162, 105, 212, 119, 124, 158, 210],
        },
      ],
    });
    echartBar({
      id: 'chart-user',
      label: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dev'],
      series: [
        {
          name: t('dashboard.Total Payment'),
          type: 'bar',
          barWidth: '8px',
          itemStyle: {
            color: '#EF4444',
            borderRadius: 4,
          },
          data: [150, 190, 228, 274, 212, 249, 278, 104, 219, 257, 115, 127],
        },
        {
          name: t('dashboard.Partner Refund'),
          type: 'bar',
          barWidth: '8px',
          itemStyle: {
            color: '#F59E0B',
            borderRadius: 4,
          },
          data: [164, 285, 115, 281, 295, 124, 125, 262, 177, 160, 267, 253],
        },
        {
          name: t('dashboard.Reference User'),
          type: 'bar',
          barWidth: '8px',
          itemStyle: {
            color: '#3B82F6',
            borderRadius: 4,
          },
          data: [184, 281, 114, 190, 199, 101, 239, 216, 231, 132, 102, 244, 257],
        },
        {
          name: t('dashboard.Activated Profile'),
          type: 'bar',
          barWidth: '8px',
          itemStyle: {
            color: '#10b981',
            borderRadius: 4,
          },
          data: [216, 169, 214, 215, 138, 162, 105, 212, 119, 124, 158, 210],
        },
      ],
    });
    echartLine({
      id: 'chart-line2',
      label: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dev'],
      color: ['#EF4444'],
      series: [
        {
          name: 'Free',
          type: 'line',
          smooth: true,
          showSymbol: false,
          symbolSize: 0,
          lineStyle: {
            width: 3,
            color: '#EF4444',
          },
          areaStyle: {
            color: linearGradient({ hex: '#EF4444' }),
          },
          data: [164, 285, 115, 281, 295, 124, 125, 262, 177, 160, 267, 253],
        },
      ],
    });
    echartPie({ id: 'total-active-profile' });
    echartBarStack({ id: 'total-active-profile-year' });
  }, [pathname]);

  return (
    <Fragment>
      <Spin className="grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 gap-5 intro-x" spinning={false}>
        <div className="rounded-xl shadow bg-gray-50 col-span-2 row-span-2 grid">
          <div className="bg-red-400 rounded-xl">
            <div className="p-5 flex justify-between items-center">
              <h2 className="text-lg text-white font-bold">{t('dashboard.Active Profile Report')}</h2>
            </div>
            <div className="h-56 relative -bottom-1" id="chart-profile" />
          </div>
          <div className="flex items-center">
            <div className="p-5 grid grid-cols-2 gap-5 w-full">
              <div className="rounded-xl p-5 bg-white flex items-center">
                <div className="px-2 py-1 rounded-md bg-indigo-50">
                  <User className="icon-dashboard fill-indigo-500" />
                </div>
                <div className="ml-3">
                  <p className="font-bold text-black ">{t('dashboard.Seller Profiles')}</p>
                  <p>3212</p>
                </div>
              </div>
              <div className="rounded-xl p-5 bg-white flex items-center">
                <div className="px-2 py-1 rounded-md bg-red-50">
                  <UserSolid className="icon-dashboard fill-red-500" />
                </div>
                <div className="ml-3">
                  <p className="font-bold text-black ">{t('dashboard.Buyer Profiles')}</p>
                  <p>244</p>
                </div>
              </div>
              <div className="rounded-xl p-5 bg-white flex items-center">
                <div className="px-2 py-1 rounded-md bg-purple-50">
                  <Briefcase className="icon-dashboard fill-purple-500" />
                </div>
                <div className="ml-3">
                  <p className="font-bold text-black ">{t('dashboard.Introductions')}</p>
                  <p>20</p>
                </div>
              </div>
              <div className="rounded-xl p-5 bg-white flex items-center">
                <div className="px-2 py-1 rounded-md bg-green-50">
                  <CheckCircle className="icon-dashboard fill-green-500" />
                </div>
                <div className="ml-3">
                  <p className="font-bold text-black ">{t('dashboard.Success Deal')}</p>
                  <p>12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl shadow bg-gray-50 flex-col justify-between hidden 2xl:flex">
          <div>
            <div className="ml-5 mt-5 px-2 py-1 rounded-md bg-blue-50 inline-block">
              <User className="icon-dashboard fill-blue-500" />
            </div>
            <h2 className="px-5 pt-1 text-2xl font-bold">875</h2>
            <p className="px-5 pb-3">{t('dashboard.New Custommers')}</p>
          </div>
          <div className="h-36" id="chart-line1" />
        </div>
        <div className="rounded-xl shadow bg-blue-400 col-span-2 2xl:col-span-3">
          <div className="p-5 flex justify-between items-center">
            <h2 className="text-lg text-white font-bold">{t('dashboard.User Purchasing Report')}</h2>
          </div>
          <div className="h-48" id="chart-purchasing" />
        </div>

        <div className="rounded-xl shadow bg-green-400 col-span-2 2xl:col-span-3">
          <div className="px-5 py-3 flex justify-between items-center">
            <h2 className="text-lg font-bold">{t('dashboard.User Purchasing Report')}</h2>
          </div>
          <div className="h-48" id="chart-user" />
        </div>
        <div className="rounded-xl shadow bg-gray-50 hidden 2xl:flex flex-col justify-between">
          <div>
            <h2 className="px-5 pt-3 text-2xl font-bold">{t('dashboard.Sales Stats')}</h2>
            <p className="px-5 pb-3">890,344 Sales</p>
          </div>
          <div className="h-36" id="chart-line2" />
        </div>

        <div className="rounded-xl shadow col-span-2 2xl:col-span-3 bg-blue-500">
          <h2 className="p-5 py-4 text-lg font-bold text-white">
            {t('dashboard.Share of total')} 3454 {t('dashboard.active profiles')}
          </h2>
          <div className="h-80" id="total-active-profile" />
        </div>
        <div className="rounded-xl shadow bg-gray-50 col-span-2 2xl:col-span-3">
          <h2 className="px-5 py-3 text-lg font-bold">
            {t('dashboard.Share of total')} 6892 {t('dashboard.active profiles')}
          </h2>
          <div className="h-80" id="total-active-profile-year" />
        </div>

        <div className="rounded-xl shadow bg-gray-50 col-span-2 2xl:col-span-3">
          <div className="p-5 flex justify-between items-center">
            <h2 className="text-lg font-bold">{t('dashboard.Business Profiles Activity')}</h2>
          </div>
          <DataTable
            save={false}
            showPagination={false}
            showSearch={false}
            data={[
              {
                name: 'Công Ty Cổ Phần mật ong Bồ Đề Hoa',
                account: '',
                package: 'Gói bạc',
                date: '16/08/2021',
                status: 'Approval',
              },
              {
                name: 'Công Ty đấu giá hợp danh Thuận An',
                account: '',
                package: 'Gói bạch kim',
                date: '10/08/2021',
                status: 'Approval',
              },
              {
                name: 'Công Ty Cổ Phần Thịnh Phát Group',
                account: '',
                package: 'Gói vàng',
                date: '9/08/2021',
                status: 'Approval',
              },
              {
                name: 'Công Ty Cổ Phần Nhuộm Hà Nội',
                account: 'Marybeth Lorie',
                package: '',
                date: '8/08/2021',
                status: 'Approval',
              },
              {
                name: 'Công Ty Cổ Phần Cơ Điện Lạnh Bkre Bách Khoa',
                account: 'India Pamula',
                package: '',
                date: '2/08/2021',
                status: 'Approval',
              },
            ]}
            columns={[
              { title: t('dashboard.Profile'), name: 'name', tableItem: {} },
              { title: t('dashboard.Package'), name: 'package', tableItem: {} },
              { title: t('dashboard.Start Date'), name: 'date', tableItem: {} },
              { title: t('dashboard.Status'), name: 'status', tableItem: {} },
            ]}
          />
        </div>
        <div className="rounded-xl shadow bg-gray-50 col-span-2 2xl:col-span-3">
          <div className="p-5 flex justify-between items-center">
            <h2 className="text-lg font-bold">{t('dashboard.Franchise Profiles Activity')}</h2>
          </div>
          <DataTable
            save={false}
            showPagination={false}
            showSearch={false}
            data={[
              {
                name: 'Công ty CP Đá ốp lát và Xây dựng Hà Nội',
                account: '',
                package: 'Gói cơ bản',
                date: '20/09/2021',
                status: 'Approval',
              },
              {
                name: 'Ecpsilky',
                account: '',
                package: 'Gói cơ bản',
                date: '13/09/2021',
                status: 'Approval',
              },
              {
                name: 'Tập đoàn Enagic',
                account: '',
                package: 'Gói cơ bản',
                date: '10/09/2021',
                status: 'Approval',
              },
              {
                name: 'PA Enterprise Co., Ltd',
                account: '',
                package: 'Gói cơ bản',
                date: '20/08/2021',
                status: 'Approval',
              },
              {
                name: 'Công Ty Cổ Phần Mật ong Bồ Đề Hoa',
                account: '',
                package: 'Gói bạc',
                date: '17/08/2021',
                status: 'Approval',
              },
            ]}
            columns={[
              { title: t('dashboard.Profile'), name: 'name', tableItem: {} },
              { title: t('dashboard.Package'), name: 'package', tableItem: {} },
              { title: t('dashboard.Start Date'), name: 'date', tableItem: {} },
              { title: t('dashboard.Status'), name: 'status', tableItem: {} },
            ]}
          />
        </div>
        <div className="rounded-xl shadow bg-gray-50 col-span-2 2xl:col-span-3">
          <div className="p-5 flex justify-between items-center">
            <h2 className="text-lg font-bold">{t('dashboard.Investor Profiles Activity')}</h2>
          </div>
          <DataTable
            save={false}
            showPagination={false}
            showSearch={false}
            data={[
              {
                name: 'Khổng Đức Duy',
                account: '',
                package: 'Gói cơ bản',
                date: '16/09/2021',
                status: 'Approval',
              },
              {
                name: 'Vũ Phạm Hải Sơn',
                account: '',
                package: 'Gói cơ bản',
                date: '13/09/2021',
                status: 'Approval',
              },
              {
                name: 'Đặng Thanh Ngà',
                account: '',
                package: 'Gói cơ bản',
                date: '19/08/2021',
                status: 'Approval',
              },
              {
                name: 'Phạm Mạnh Tân',
                account: '',
                package: 'Gói cơ bản',
                date: '12/08/2021',
                status: 'Approval',
              },
              {
                name: 'Kevin Nguyen',
                account: '',
                package: 'Gói cơ bản',
                date: '10/08/2021',
                status: 'Approval',
              },
            ]}
            columns={[
              { title: t('dashboard.Profile'), name: 'name', tableItem: {} },
              { title: t('dashboard.Package'), name: 'package', tableItem: {} },
              { title: t('dashboard.Start Date'), name: 'date', tableItem: {} },
              { title: t('dashboard.Status'), name: 'status', tableItem: {} },
            ]}
          />
        </div>
        <div className="rounded-xl shadow bg-gray-50 col-span-2 2xl:col-span-3">
          <div className="p-5 flex justify-between items-center">
            <h2 className="text-lg font-bold">{t('dashboard.Monthly Profiles Activity')}</h2>
          </div>
          <DataTable
            save={false}
            showPagination={false}
            showSearch={false}
            data={[
              {
                name: 'Công Ty Cổ Phần mật ong Bồ Đề Hoa',
                account: '',
                package: 'Gói bạc',
                date: '16/08/2021',
                status: 'Approval',
              },
              {
                name: 'Công Ty đấu giá hợp danh Thuận An',
                account: '',
                package: 'Gói bạch kim',
                date: '10/08/2021',
                status: 'Approval',
              },
              {
                name: 'Công Ty Cổ Phần Thịnh Phát Group',
                account: '',
                package: 'Gói vàng',
                date: '9/08/2021',
                status: 'Approval',
              },
              {
                name: 'Công Ty Cổ Phần Nhuộm Hà Nội',
                account: 'Marybeth Lorie',
                package: '',
                date: '8/08/2021',
                status: 'Approval',
              },
              {
                name: 'Công Ty Cổ Phần Cơ Điện Lạnh Bkre Bách Khoa',
                account: 'India Pamula',
                package: '',
                date: '2/08/2021',
                status: 'Approval',
              },
            ]}
            columns={[
              { title: t('dashboard.Profile'), name: 'name', tableItem: {} },
              { title: t('dashboard.Package'), name: 'package', tableItem: {} },
              { title: t('dashboard.Start Date'), name: 'date', tableItem: {} },
              { title: t('dashboard.Status'), name: 'status', tableItem: {} },
            ]}
          />
        </div>
      </Spin>
    </Fragment>
  );
};
export default Page;
