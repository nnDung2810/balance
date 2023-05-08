import React, { Fragment, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Switch } from 'antd';

import { routerLinks } from '@utils';
import { Form } from '@core/form';
import { DistrictFacade, StoreFacade, WardFacade, ProvinceFacade } from '@store';
import { StoreManagement } from '@store/store-management';

const Page = () => {
  const provinceFacade = ProvinceFacade()
  const { result } = provinceFacade

  const wardFacade = WardFacade()
  const districtFacade = DistrictFacade()

  const storeFacade = StoreFacade()
  const { data, isLoading, queryParams, status } = storeFacade;

  const navigate = useNavigate();
  const isBack = useRef(true);
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();

  useEffect(() => {
    if (!result?.data) provinceFacade.get({})

    if (id) storeFacade.getById({ id });

    return () => {
      isReload.current && storeFacade.get(param);
    };
  }, [id, data]);

  useEffect(() => {
    switch (status) {
      case 'post.fulfilled':
        navigate(routerLinks('User') + '/' + data?.id);
        break;
      case 'put.fulfilled':
        if (Object.keys(param).length > 0) isReload.current = true;

        if (isBack.current) handleBack();
        else {
          isBack.current = true;
          if (status === 'put.fulfilled') navigate(routerLinks('User/Add'));
        }
        break;
    }
  }, [status]);

  const handleBack = () => navigate(routerLinks('Store') + '?' + new URLSearchParams(param).toString());
  const handleSubmit = (values: StoreManagement) => {
    storeFacade.put(values);
  };

  return (
    <div className={'w-full'}>
      <Fragment>
        <div className=''>
          <div className='text-2xl text-teal-900 p-3.5 pt-4 font-bold bg-white w-max rounded-t-2xl'>
            Thông tin cửa hàng
          </div>
          <div className='bg-white rounded-2xl rounded-t-none'>
            {!!result?.data && (
              <Form
                values={{ ...data }}
                className="intro-x p-6 pb-4 pt-3 rounded-lg w-full "
                columns={[
                  {
                    title: 'Mã cửa hàng',
                    name: 'code',
                    formItem: {
                      tabIndex: 1,
                      col: 4,
                      disabled: () => true
                    },
                  },
                  {
                    title: 'Tên cửa hàng',
                    name: 'name',
                    formItem: {
                      tabIndex: 2,
                      col: 4,
                      rules: [{ type: 'required' }],
                    },
                  },
                  {
                    title: 'Số fax',
                    name: 'fax',
                    formItem: {
                      tabIndex: 3,
                      col: 4,
                    },
                  },
                  {
                    title: '',
                    name: 'address',
                    formItem: {
                      rules: [{ type: 'required' }],
                      render() {
                        return (
                          <h3 className='mb-2.5 text-base text-black font-medium'>Địa chỉ cửa hàng</h3>
                        )
                      },
                    }
                  },
                  {
                    title: 'Tỉnh/Thành phố',
                    name: 'provinceId',
                    formItem: {
                      tabIndex: 3,
                      col: 3,
                      type: 'select',
                      rules: [{ type: 'required' }],
                      list: result.data.map((item: any) => ({
                        label: item?.name,
                        value: item?.code,
                      })),
                      onChange(value, form) {
                        form.resetFields(['district'])
                        districtFacade.get(`${value}`)
                      },
                    },
                  },
                  {
                    name: 'districtId',
                    title: 'Quận/Huyện',
                    formItem: {
                      type: 'select',
                      rules: [{ type: 'required' }],
                      col: 3,
                      get: {
                        facade: DistrictFacade,
                        format: (item: any) => ({
                          label: item.name,
                          value: item.code,
                        }),
                      },
                      onChange(value, form) {
                        form.resetFields(['wardId'])
                        wardFacade.get(`${value}`)
                      },
                    },
                  },
                  {
                    name: 'wardId',
                    title: 'Phường/Xã',
                    formItem: {
                      type: 'select',
                      rules: [{ type: 'required' }],
                      col: 3,
                      get: {
                        facade: WardFacade,
                        format: (item: any) => ({
                          label: item.name,
                          value: item.code,
                        }),
                      }
                    },
                  },
                  {
                    name: 'street',
                    title: 'Địa chỉ cụ thể',
                    formItem: {
                      rules: [{ type: 'required' }],
                      col: 3,
                    },
                  },
                  {
                    title: '',
                    name: '',
                    formItem: {
                      render() {
                        return (
                          <div className='text-xl text-teal-900 font-bold mb-2.5'>Thông tin người đại diện</div>
                        )
                      }
                    }
                  },
                  {
                    name: 'nameContact',
                    title: 'Họ tên đại diện',
                    formItem: {
                      col: 4,
                      rules: [{ type: 'required' }],
                    },
                  },
                  {
                    name: 'phoneNumber',
                    title: 'Số điện thoại đại diện',
                    formItem: {
                      col: 4,
                      rules: [{ type: 'required' }],
                    },
                  },
                  {
                    name: 'emailContact',
                    title: 'Email đại diện',
                    formItem: {
                      col: 4,
                      rules: [{ type: 'required' }],
                    },
                  },
                  {
                    name: 'note',
                    title: 'Ghi chú',
                    formItem: {
                      type: 'textarea',
                    },
                  },
                  {
                    title: '',
                    name: '',
                    formItem: {
                      render() {
                        return (
                          <div className='flex items-center mb-2.5'>
                            <div className='text-xl text-teal-900 font-bold mr-6'>Kết nối KiotViet</div>
                            <Switch className='bg-gray-500' />
                          </div>
                        )
                      }
                    }
                  },

                ]}
                handSubmit={handleSubmit}
                disableSubmit={isLoading}
                handCancel={handleBack}
              />
            )}
          </div>
        </div>
      </Fragment>
    </div>
  );
};
export default Page;
