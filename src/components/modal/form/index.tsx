import React, { useState, forwardRef, useImperativeHandle, useRef, Dispatch, SetStateAction } from 'react';
import { Form as FormAnt } from 'antd';
import { v4 } from 'uuid';

import { Modal, Form } from '@components';
import { convertFormValue } from '@utils';
import { FormModel } from '@models';

const Hook = forwardRef(
  (
    {
      title,
      isLoading,
      setIsLoading,
      handleChange,
      Post,
      Put,
      Delete,
      GetById,
      firstRun,
      widthModal = 1200,
      columns,
      textSubmit,
      className = '',
      footerCustom,
      idElement = 'modal-form-' + v4(),
      ...propForm
    }: Type,
    ref: any,
  ) => {
    useImperativeHandle(ref, () => ({ handleEdit, handleDelete, form }));

    const [form] = FormAnt.useForm();
    const [firstChange, set_firstChange] = useState(false);
    const [data, set_data] = useState({});

    const handleEdit = async (item: { id?: string } = {}) => {
      set_firstChange(false);
      !!firstRun && (await firstRun(item));

      if (item && item.id && GetById) {
        setIsLoading(true);
        const { data } = await GetById(item.id, item);
        item = { ...item, ...data };
        setIsLoading(false);
      }
      set_data(item);
      await modal?.current?.handleShow(item);
    };
    const handleDelete = async (id: string) => {
      Delete && (await Delete(id));
      handleChange && (await handleChange());
    };
    const modal: any = useRef();

    return (
      <Modal
        idElement={idElement}
        ref={modal}
        widthModal={widthModal}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        firstChange={firstChange}
        textSubmit={textSubmit}
        className={className}
        footerCustom={footerCustom}
        title={(data: any) => title(data)}
        onOk={async (data: any) => {
          return form
            .validateFields()
            .then(async (values) => {
              values = convertFormValue(columns, values);
              if (!!Post || !!Put) {
                try {
                  setIsLoading(true);
                  const res = await (data.id === undefined ? Post && Post(values) : Put && Put(values, data.id));
                  if (res !== false) {
                    values = res?.data;
                  } else {
                    setIsLoading(false);
                    return false;
                  }
                } catch (e) {
                  setIsLoading(false);
                  return false;
                }
              }
              handleChange && (await handleChange(values, data));
              return true;
            })
            .catch(() => false);
        }}
      >
        <Form {...propForm} onFirstChange={() => set_firstChange(true)} values={data} form={form} columns={columns} />
      </Modal>
    );
  },
);
Hook.displayName = 'HookModalForm';
type Type = {
  title: (data: any) => string;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  handleChange?: (values?: any, data?: any) => Promise<any>;
  Post?: (id?: string) => any;
  Put?: (values: any, id: string) => Promise<any>;
  Delete?: (id: string) => void;
  GetById?: (id: string, item: any) => any;
  firstRun?: (item: any) => void;
  widthModal?: number;
  columns: FormModel[];
  textSubmit?: string;
  className?: string;
  footerCustom?: (handleOk: () => Promise<any>, handleCancel: () => void) => JSX.Element[] | JSX.Element;
  idElement?: string;
};
export default Hook;
