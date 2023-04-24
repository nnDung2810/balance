import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Form } from '@components/form';
import { Spin } from '@components/spin';
import { Button } from '@components/button';
import { GlobalFacade } from '@reducers';
import { ColumnProfile } from './column';
import { routerLinks } from '@utils';
import { useNavigate } from 'react-router';

const Page = () => {
  const { t } = useTranslation();
  const isBack = useRef(true);
   const navigate = useNavigate();
  const { user, isLoading, putProfile, profile } = GlobalFacade();
  const getProfile = () => navigate(routerLinks('User/List'));
  const listPosition = useRef([]);
  useEffect(() => {
    profile();
  }, []);
  return (
    <Fragment>
      <div className='grid grid-cols-3 gap-5 w-full'>
        <div className='col-span-1 bg-white p-5 border rounded-3xl '>
        <Spin className="" spinning={isLoading}>
        <Form
          className="text-center items-center"
          columns={[
            {
              name: 'profileImage',
              formItem: {
                col:12,
                type: 'upload',
                mode: 'multiple',
              },
            },
            {
              title: t('Họ và tên'),
              name: 'name',
              formItem: {
                render: (form, values, generateForm, index, reRender) => {
                  return (
                    <div>
                      {values.name}
                    </div>
                  );
                }
              },
            },
            {
              title: t('Vai trò'),
              name: 'userRole',
              formItem: {
                render: (text: any, item: any) => {
                  if (text = item.userRole[0].mtRole.code === "ADMIN") {
                    return "Quản trị viên";
                  } else if (text = item.userRole[0].mtRole.code === "OWNER_SUPPLIER") {
                    return "Đại diện NCC";
                  } else {
                    return "Đại diện cửa hàng";
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
        <div className='col-span-2 bg-white p-5 border rounded-3xl '>
      <Spin className=""  spinning={isLoading}>
        <Form
          className=" "
          columns={ColumnProfile({ t, listPosition: listPosition.current })}
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
        //  handCancel={getProfile}
        />
      </Spin>

        </div>
      </div>
    </Fragment>
  );
};
export default Page;
