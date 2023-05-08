import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { SupplierFacade } from '@store/supplier';
import { Form } from '@core/form';
import { routerLinks } from '@utils';
import { ColumnFormSupplier } from './column';
import { ProvinceFacade } from '@store/address/province';
import { User } from '@store';
import { DistrictFacade } from '@store/address/district';
import { WardFacade } from '@store/address/ward';
import { Switch } from 'antd';
import { format } from 'prettier';

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

    if (id) supplierFacade.getById({ id });
    else supplierFacade.set({ data: {} });

    return () => {
      isReload.current && supplierFacade.get(param);
    };
  }, [id]);

  useEffect(() => {
    switch (status) {
      case 'post.fulfilled':
        navigate(routerLinks('Supplier') + '/' + data?.id);
        break;
      case 'put.fulfilled':
        if (Object.keys(param).length > 0) isReload.current = true;

        if (isBack.current) handleBack();
        else {
          isBack.current = true;
          if (status === 'put.fulfilled') navigate(routerLinks('Supplier/Add'));
        }
        break;
    }
  }, [status]);

  const handleBack = () => navigate(routerLinks('Supplier') + '?' + new URLSearchParams(param).toString());
  const handleSubmit = (values: User) => {
    if (id) supplierFacade.put({ ...values, id });
    else supplierFacade.post(values);
  };

  return (
    <div className={'max-w-7xl mx-auto'}>
      <div className=' pr-5 h-full pb-10'>
        <div className='bg-white rounded-xl p-4 pb-10 relative text-left'>
          <div>
            <p className='text-xl font-bold text-teal-900 py-5'>
              Thông tin nhà cung cấp
            </p>
          </div>
          {!!result?.data && (
            <div>
              <Form
                values={{ ...data }}
                className=" pb-4 pt-3 rounded-lg w-full "
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
                      onChange(value, form, reRender) {
                        form.resetFields(['district'])
                        districtFacade.get(value)
                        reRender(value)
                      },
                    },
                  },
                  {
                    name: 'districtId',
                    title: 'Quận/Huyện',
                    formItem: {
                      type: 'select',
                      rules: [{ type: 'required', message: 'Xin vui lòng chọn quận/huyện' }],
                      col: 3,
                      get: {
                        facade: DistrictFacade,
                        format: (item: any) => ({
                          label: item.name,
                          value: item.code,
                        }),
                      },
                      onChange(value, form, reRender) {
                        form.resetFields(['wardId'])
                        wardFacade.get(value)
                        reRender({format: (item:any) => ({
                          label: item.name,
                          value: item.code,})})
                      },
                    },
                  },
                  {
                    name: 'wardId',
                    title: 'Phường/Xã',
                    formItem: {
                      type: 'select',
                      rules: [{ type: 'required', message: 'Xin vui lòng chọn phường/xã' }],
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
                handSubmit={handleSubmit}
                disableSubmit={isLoading}
                handCancel={handleBack}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Page;
