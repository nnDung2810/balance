import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { UserRoleFacade, UserFacade, User, StoreFacade, ProvinceFacade, DistrictFacade, WardFacade, StoreManagement } from '@store';
import { routerLinks } from '@utils';
import { Form } from '@core/form';

import { Select, Switch } from 'antd';

const Page = () => {
  const storeFacade = StoreFacade()
  const { data, isLoading, queryParams, status } = storeFacade;

  const navigate = useNavigate();

  const isBack = useRef(true);
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();


  useEffect(() => {
    if (id) storeFacade.getById({ id });

    return () => {
      isReload.current && storeFacade.get(param);
    };
  }, [id, data]);


  useEffect(() => {

  }, [status]);

  const handleBack = () => navigate(routerLinks('Store') + '?' + new URLSearchParams(param).toString());
  const handleSubmit = (values: StoreManagement) => {
    storeFacade.put(values);
  };

  return (
    <div className={'w-full'}>
      <Fragment>
        <div className='bg-white'>
          <div className='text-xl text-green-900 px-6 pt-4 font-mono font-bold'>
            Thông tin người dùng
          </div>
            <Form
              values={{ ...data }}
              className="intro-x p-6 pb-4 pt-3 rounded-lg w-full "
              columns={[
                {
                  title: 'store.Code',
                  name: 'code',
                  formItem: {
                    tabIndex: 1,
                    col: 4,
                    disabled: () => true
                  },
                },
                {
                  title: 'store.Name',
                  name: 'name',
                  formItem: {
                    tabIndex: 2,
                    col: 4,
                    rules: [{ type: 'required' }],
                  },
                },
                {
                  title: 'store.Fax',
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
                  title: 'store.Province',
                  name: 'provinceId',
                  formItem: {
                    tabIndex: 3,
                    col: 3,
                    type: 'select',
                    rules: [{ type: 'required' }],
                    get: {
                      facade: ProvinceFacade,
                      format: (item: any) => ({
                        label: item.name,
                        value: item.id + '|' + item.code,
                      })
                    },
                    onChange(value, form) {
                      form.resetFields(['district', 'wardId'])
                    },
                  },
                },
                {
                  title: 'store.District',
                  name: 'districtId',
                  formItem: {
                    type: 'select',
                    rules: [{ type: 'required' }],
                    col: 3,
                    get: {
                      facade: DistrictFacade,
                      format: (item: any) => ({
                        label: item.name,
                        value: item.id + '|' + item.code,
                      }),
                      params: (fullTextSearch, value) => ({
                        fullTextSearch,
                        code: value().provinceId.slice(value().provinceId.indexOf('|') + 1),
                      }),
                    },
                    onChange(value, form) {
                      form.resetFields(['wardId'])
                    },
                  },
                },
                {
                  title: 'store.Ward',
                  name: 'wardId',
                  formItem: {
                    type: 'select',
                    rules: [{ type: 'required' }],
                    col: 3,
                    get: {
                      facade: WardFacade,
                      format: (item: any) => ({
                        label: item.name,
                        value: item.id,
                      }),
                      params: (fullTextSearch, value) => ({
                        fullTextSearch,
                        code: value().districtId.slice(value().districtId.indexOf('|') + 1),
                      })
                    }
                  },
                },
                {
                  title: 'store.Street',
                  name: 'street',
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
                  title: 'store.ContactName',
                  name: 'name',
                  formItem: {
                    col: 4,
                    rules: [{ type: 'required' }],
                  },
                },
                {
                  title: 'store.Contact Phone Number',
                  name: 'phoneNumber',
                  formItem: {
                    col: 4,
                    rules: [{ type: 'required' }],
                  },
                },
                {
                  title: 'store.Contact Email',
                  name: 'email',
                  formItem: {
                    col: 4,
                    rules: [{ type: 'required' }],
                  },
                },
                {
                  title: 'store.Note',
                  name: 'note',
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
        </div>
      </Fragment>
    </div>
  );
};
export default Page;
