import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Form } from '@components/form';
import { Spin } from '@components/spin';
import { Button } from '@components/button';
import { GlobalFacade } from '@reducers';
// import { ColumnProfile } from './column';
import { t } from 'i18next';
import { routerLinks } from '@utils';
import { useNavigate } from 'react-router';
import classNames from 'classnames';
import { UserSolid } from '@svgs';
import { ColumnProfile } from './column';

const Page = () => {
  const { t } = useTranslation();
  const { user, isLoading, putProfile, profile } = GlobalFacade();
  const listPosition = useRef([]);
  const navigate = useNavigate();
  useEffect(() => {
    profile();
  }, []);
  return (
    <Fragment>
      <div className='grid grid-cols-3 gap-5 w-full'>
        <div className='col-span-1 bg-white p-5 border rounded-xl'>
        <Spin className="" spinning={isLoading}>
        <Form
          className="text-center items-centers text-2xl text-black font-semibold"
          columns={[
            {
              name: 'profileImage',
              formItem: {
                type: 'upload',
                mode: 'multiple',
                onlyImage: true,
              },
            },
            {
              title: t('Họ và tên'),
              name: 'name',
              formItem: {
                render: (form, values) => {
                  return (
                    <div className=''>
                      {values.name}
                    </div>
                  )
                }
              },
            },
            {
              title: t('Vai trò'),
              name: 'userRole',
              formItem: {
                render: (text: any, item: any) => {
                  if (text = item.userRole[0].mtRole.code === "ADMIN") {
                    return (
                      <div className='flex w-full flex-row justify-center pt-2'>
                        <div><UserSolid className='w-7 h-7 mr-2 fill-slate-500'/></div>
                         <div className='text-xl text-gray-500'>Quản trị viên</div>
                      </div>
                    )
                  } else if (text = item.userRole[0].mtRole.code === "OWNER_SUPPLIER") {
                    return (
                      <div className='flex w-full flex-row justify-center'>
                        <div><UserSolid className='w-7 h-7 mr-2'/></div>
                         <div>Đại diện NCC</div>
                      </div>
                    )
                  } else {
                    return (
                      <div className='flex w-full flex-row justify-center'>
                          <div><UserSolid className='w-7 h-7 mr-2'/></div>
                         <div>Đại diện cửa hàng</div>
                      </div>
                    )
                  }
                }
              },
            },
          ]}
        //  handSubmit={putProfile}
          disableSubmit={isLoading}
          values={{ ...user }}
        />
      </Spin>

        </div>
        <div className='col-span-2 bg-white p-5 border rounded-xl mr-4'>
      <Spin className=""  spinning={isLoading}>
        <Form
          className=" "
          columns={ColumnProfile({t})}
          handSubmit={putProfile}
          disableSubmit={isLoading}
          extendButton={(form) => (
            <Button
              text={t('Huỷ Thao Tác')}
              className={'md:min-w-[8rem] justify-center out-line'}
              onClick={() => {
              //  form.submit();c
                navigate(routerLinks('User/List'))
              }}
            />
          )}
          values={{ ...user }}
        />
      </Spin>
        </div>
      </div>
    </Fragment>
  );
};
export default Page;
