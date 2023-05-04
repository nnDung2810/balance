import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Form } from '@components/form';
import { Spin } from '@components/spin';
import { Button } from '@components/button';
import { GlobalFacade } from '@reducers';
import { routerLinks } from '@utils';
import { useNavigate } from 'react-router';
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { ColumnProfile, ColumnProfilePassword, ColumnProfileUser } from '@routes/admin/my-profile/column';

const Page = () => {
  const { t } = useTranslation();
  const { user, isLoading, putProfile, setPassword, profile } = GlobalFacade();
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
              columns={ColumnProfile({ t })}
              disableSubmit={isLoading}
              values={{ ...user }}
            />
          </Spin>
        </div>

        <div className='col-span-2 bg-white p-5 border rounded-xl mr-4 fill-black'>
          <Spin className="" spinning={isLoading}>
            <React.Fragment>
              <Tabs defaultActiveKey="1" size="large">
                <TabPane tab="Thông tin cá nhân" key="1">
                  <Form
                    columns={ColumnProfileUser({ t })}
                    disableSubmit={isLoading}
                    handSubmit={putProfile}
                    extendButton={(form) => (
                      <Button
                        text={t('Huỷ Thao Tác')}
                        className={'md:min-w-[8rem] justify-center out-line'}
                        onClick={() => {
                          navigate(routerLinks('User/List'))
                        }}
                      />
                    )}
                    values={{ ...user }}
                  />
                </TabPane>
                <TabPane tab="Đổi mật khẩu" key="2">
                  <Form
                    columns={ColumnProfilePassword({ t })}
                    disableSubmit={isLoading}
                    extendButton={(form) => (
                      <Button
                        text={t('Huỷ Thao Tác')}
                        className={'md:min-w-[8rem] justify-center out-line'}
                        onClick={() => {
                          navigate(routerLinks('User/List'))
                        }}
                      />
                    )}
                    extendButtonChangePassword={setPassword}
                    values={{ ...user }}
                  />
                </TabPane>
              </Tabs>
            </React.Fragment>
          </Spin>
        </div>
      </div>
    </Fragment>
  );
};
export default Page;
