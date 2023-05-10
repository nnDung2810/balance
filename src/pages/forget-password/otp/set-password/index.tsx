import React, { Fragment, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Spin } from '@core/spin';
import { Form } from '@core/form'
import { routerLinks } from '@utils';
import { GlobalFacade } from '@store';

const Page = () => {
  // const isReload = useRef(false);
  // const { t } = useTranslation();

  const navigate = useNavigate();
  const globalFacade = GlobalFacade();
  const { isLoading, status, data, setPassword } = globalFacade;

  useEffect(() => {
    if (status === 'setPassword.fulfilled') {
      navigate(routerLinks('Sign-in'));
    }
  }, [status]);

  console.log(data)
  return (
    <Fragment>
      <div className="text-center mb-8 mx-auto">
        <h1 className="intro-x text-3xl mb-10 font-bold text-green-900 leading-8 md:text-5xl lg:leading-10">
          {'Đặt Lại Mật Khẩu'}
        </h1>
        <h5 className="intro-x font-normal text-green-900">Mật khẩu yêu cầu có 8 ký tự trở lên, có ít nhất 1 chữ hoa, 1 chữ thường,<br></br> 1 chữ số và 1 kí tự đặc biệt.</h5>
      </div>
      <div className='mx-auto w-3/4'>
        <Spin spinning={isLoading} >
          <Form
            values={{ ...data }}
            className="intro-x form-login space-y-8"
            columns={[
                {
                    name: 'password',
                    title: 'Mật khẩu',
                    formItem: {
                        placeholder: 'Mật khẩu',
                        type: 'password',
                        rules: [{ type: 'required' },],
                    },
                },
                {
                    name: 'passwordComfirm',
                    title: 'Xác nhận mật khẩu',
                    formItem: {
                        placeholder: 'Xác nhận mật khẩu',
                        type: 'password',
                        rules: [
                            {
                                type: 'custom',
                                validator: ({ getFieldValue }) => ({
                                    validator(rule, value: string) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Hai mật khẩu không giống nhau!'));
                                    },
                                }),
                            },
                            { type: 'required' },
                        ],
                    },
                },
                {
                    title: '',
                    name: 'uuid',
                    formItem: {
                        type: 'hidden',
                    },
                },
                {
                    title: '',
                    name: 'email',
                    formItem: {
                        type: 'hidden',
                    },
                },
            ]}
            textSubmit={'Đổi Mật Khẩu'}
            handSubmit={(values) => setPassword({ ...values })}
            disableSubmit={isLoading}
          />
        </Spin>
      </div>
    </Fragment>
  );
};

export default Page;
