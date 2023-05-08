import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Form } from '@core/form';
import { routerLinks } from '@utils';
import { DistrictFacade, ProvinceFacade, StoreFacade, WardFacade } from '@store';
import { Switch } from 'antd';

const Page = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const isReload = useRef(false);

  const provinceFacade = ProvinceFacade()
  const { result } = provinceFacade

  const districtFacade = DistrictFacade()
  const wardFacade = WardFacade()

  const storeFace = StoreFacade();
  const { isLoading, queryParams } = storeFace;
  const param = JSON.parse(queryParams || '{}');

  useEffect(() => {
    if (!result?.data) provinceFacade.get({})
    // districtFacade.get('12')
  }, []);

  const handleBack = () => navigate(routerLinks('Store') + '?' + new URLSearchParams(param).toString());
  const handleSubmit = (values: any) => {
    storeFace.post(values);
  };

  return (
    <div className={'w-full mx-auto bg-white rounded-xl'}>
      <div className='text-xl text-teal-900 px-5 pt-3.5 font-bold bg-white w-max rounded-t-2xl'>
        Thông tin cửa hàng
      </div>
      <div className='p-5 bg-white'>
        {!!result?.data &&
          <Form
            values={{ ...result }}
            className="intro-x "
            columns={[
              {
                title: 'Tên cửa hàng',
                name: 'name',
                formItem: {
                  tabIndex: 1,
                  col: 6,
                  rules: [{ type: 'required' }],
                },
              },
              {
                title: 'Số fax',
                name: 'fax',
                formItem: {
                  tabIndex: 2,
                  col: 6,
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
        }
      </div>
    </div>
  );
};
export default Page;
