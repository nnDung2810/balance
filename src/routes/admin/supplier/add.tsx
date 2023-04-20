import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { UserRoleFacade, UserFacade } from '@reducers';
import { routerLinks } from '@utils';
import { Button, Form } from '@components';
import { ColumnFormSupplier1, ColumnFormSupplier2, ColumnFormSupplier3 } from './column';
import { User } from '../../../reducers/global';

const Page = () => {
  const { t } = useTranslation();
  const { result, get } = UserRoleFacade();
  const userFacade = UserFacade();
  const { data, isLoading, queryParams, status } = userFacade;
  const navigate = useNavigate();
  const isBack = useRef(true);
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();

  useEffect(() => {
    if (!result?.data) get({});

    if (id) userFacade.getById({ id });
    else userFacade.set({ data: {} });

    return () => {
      isReload.current && userFacade.get(param);
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
    if (id) userFacade.put({ ...values, id });
    else userFacade.post(values);
  };

  return (
    <div className={'max-w-7xl mx-auto'}>
      <div className=' pr-5 h-full pb-10'>
        <div className='bg-white rounded-xl p-4 pb-10 relative text-center '>
          <div>
            <p className='text-xl text-left font-bold text-teal-900 py-5'>
              Thông tin nhà cung cấp
            </p>
          </div>
          {!!result?.data && (
            // <div className='flex flex-col justify-center'>
            //   <div className=''>
            //     <form className='w-full'>
            //       <div className='flex items-center justify-center'>
            //         <div className='grow'>
            //           <div className='grid gap-x-5 grid-cols-12'>

            //             <div className='col-span-12 sm:col-span-6 lg:col-span-6'>
            //               <div className='mb-4 flex-col flex '>
            //                 <div className='overflow-visible pr-4 pb-2 text-left relative max-s-full '>
            //                   <label className='' title={"Tên nhà cung cấp"}>Tên nhà cung cấp</label>
            //                 </div>
            //               </div>
            //             </div>

            //           </div>
            //         </div>
            //       </div>
            //     </form>
            //   </div>
            // </div>
            <div>
              <Form
                values={{ ...data }}
                className=""
                columns={ColumnFormSupplier1({ t, listRole: result?.data || [] })}
              />
              <p className='text-base text-left mb-4 text-black'>Địa chỉ nhà cung cấp</p>
              <Form
                values={{ ...data }}
                className="intro-x"
                columns={ColumnFormSupplier2({ t, listRole: result?.data || [] })}
              />
              <p className='text-xl font-bold text-left mb-5 text-black'>Thông tin người đại diện</p>
              <Form
                values={{ ...data }}
                className="intro-x"
                columns={ColumnFormSupplier3({ t, listRole: result?.data || [] })}
                // extendButton={(form) => (
                //   <Button
                //     text={t('components.button.Save and Add new')}
                //     className={'md:min-w-[12rem] w-full justify-center out-line'}
                //     onClick={() => {
                //       form.submit();
                //       isBack.current = false;
                //     }}
                //   />
                // )}
                // handSubmit={handleSubmit}
                disableSubmit={isLoading}
                // handCancel={handleBack}
                extendButton={() => (
                  <div className='w-7xl flex justify-between mt-4'>
                    <button className={'text-teal-900 bg-white border-solid border border-teal-900 rounded-xl p-2 w-auto h-11 px-8'} 
                    onClick={handleBack}>
                      {t('Trở về')}
                    </button>
                    <button className={'text-white bg-teal-900 border-solid border rounded-xl p-2 w-auto h-11 px-8'} 
                    onClick={() => handleSubmit}>
                      {t('Lưu')}
                    </button>
                  </div>
                 )}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Page;
