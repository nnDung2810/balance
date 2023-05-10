import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { SupplierFacade } from '@store/supplier';
import { Form } from '@core/form';
import { routerLinks } from '@utils';
import { ProvinceFacade } from '@store/address/province';
import { DistrictFacade } from '@store/address/district';
import { WardFacade } from '@store/address/ward';

const Page = () => {
  const { t } = useTranslation();
  const districtFacade = DistrictFacade()
  const wardFacade = WardFacade()
  const { result, get } = ProvinceFacade();
  const supplierFacade = SupplierFacade();
  const { data, isLoading, queryParams, status } = supplierFacade;
  const navigate = useNavigate();
  const isBack = useRef(true);
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();


  useEffect(() => {
    if (!result?.data) get({});
  }, []);

  useEffect(() => {
    switch (status) {
      case 'post.fulfilled':
        navigate(routerLinks('Supplier') + '/' + data?.id);
        break;
      case 'put.fulfilled':
        if (Object.keys(param).length > 0) isReload.current = true;

        if (isBack.current) handleBack();
        break;
    }
  }, [status]);

  const handleBack = () => navigate(routerLinks('Supplier') + '?' + new URLSearchParams(param).toString());
  const handleSubmit = (values: any) => {
    if (id) supplierFacade.put({ ...values, id });
    else supplierFacade.post(values);
  };

  return (
    <div>
      <div className={'w-full mx-auto bg-white rounded-xl'}>
        <div className='px-5'>
          <p className='text-xl font-bold text-teal-900 py-4'>
            Thông tin nhà cung cấp
          </p>
        </div>
        <div className='bg-white px-5 rounded-2xl w-full'>
            {!!result?.data && (
              <div className='w-full'>
                <Form
                  values={{ ...data }}
                  className="rounded-lg w-full "
                  columns={[
                    {
                      title: 'Tên nhà cung cấp',
                      name: 'name',
                      formItem: {
                        tabIndex: 2,
                        col: 6,
                        rules: [{ type: 'required', message: 'Xin vui lòng nhập tên nhà cung cấp' }],
                      },
                    },
                    {
                      title: 'Số fax',
                      name: 'fax',
                      formItem: {
                        tabIndex: 3,
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
                            <h3 className='mb-2.5 text-base '>Địa chỉ nhà cung cấp </h3>
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
                        rules: [{ type: 'required',message: 'Xin vui lòng chọn tỉnh/thành phố' }],
                        list: result.data.map((item: any) => ({
                          label: item?.name,
                          value: item?.code,
                        })),
                        // onChange(value, form) {
                        //   // districtFacade.get(value)
                        //   form.resetFields(['district'])
                        //   // reRender(value)
                        // },
                      },
                    },
                    {
                      name: 'districtId',
                      title: 'Quận/Huyện',
                      formItem: {
                        type: 'select',
                        rules: [{ type: 'required', message: 'Xin vui lòng chọn quận/huyện' }],
                        col: 3,
                        // get: {
                        //   facade: DistrictFacade,
                        //   params: (fullTextSearch: string, value: any) => ({
                        //     fullTextSearch,
                        //     filter: { id: '02'},
                        //     extend: {},
                        //   }),
                        //   format: (item: any) => ({
                        //     label: item.name,
                        //     value: item.code,
                        //   }),
                        // },
                        onChange(value, form) {
                          form.resetFields(['wardId'])
                          // wardFacade.get(value)
                        },
                        // get: {
                        //   facade: ProvinceFacade,
                        //   params: (fullTextSearch: string) => ({
                        //     fullTextSearch,
                        //     filter: { code: '01' },
                        //     extend: {},
                        //   }),
                        //   format: (item) => ({
                        //     label: item.name,
                        //     value: item.code,
                        //   }),
                        // },
                      },
                    },
                    {
                      name: 'wardId',
                      title: 'Phường/Xã',
                      formItem: {
                        type: 'select',
                        rules: [{ type: 'required', message: 'Xin vui lòng chọn phường/xã' }],
                        col: 3,
                        // get: {
                        //   facade: WardFacade,
                        //   format: (item: any) => ({
                        //     label: item.name,
                        //     value: item.code,
                        //   }),
                        // }
                      },
                    },
                    {
                      name: 'street',
                      title: 'Địa chỉ cụ thể',
                      formItem: {
                        rules: [{ type: 'required', message: 'Xin vui lòng nhập địa chỉ cụ thể' }],
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
                        rules: [{ type: 'required', message: 'Xin vui lòng nhập họ và tên đại diện' }],
                      },
                    },
                    {
                      name: 'phoneNumber',
                      title: 'Số điện thoại đại diện',
                      formItem: {
                        col: 4,
                        rules: [{ type: 'required', message: 'Xin vui lòng nhập số điện thoại đại diện' }],
                      },
                    },
                    {
                      name: 'emailContact',
                      title: 'Email đại diện',
                      formItem: {
                        col: 4,
                        rules: [{ type: 'required', message: 'Xin vui lòng nhập email đại diện' }],
                      },
                    },
                    {
                      name: 'note',
                      title: 'Ghi chú',
                      formItem: {
                        type: 'textarea',
                      },
                    },

                  ]}
                  // handSubmit={handleSubmit}
                  disableSubmit={isLoading}
                  extendButton={() => (
                    <div className='w-full flex mt-8 justify-between'>
                      <button className='sm:w-28 h-11 rounded-xl bg-white hover:text-teal-700 text-teal-900 border-teal-900 hover:border-teal-600 border'
                      onClick={handleBack}>
                        {t('components.form.modal.cancel')}
                      </button>
                      <button className='sm:w-44 h-11 rounded-xl text-white bg-teal-900 hover:bg-teal-600'
                      onClick={handleSubmit}>
                        {t('components.form.modal.save')}
                      </button>
                    </div>
                  )}
                />
              </div>
            )}
        </div>
      </div>
      <div className='h-20'>
      </div>
    </div>
    
  );
};
export default Page;
