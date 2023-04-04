import React, { forwardRef, useImperativeHandle, useEffect } from 'react';
import { Form as FormAnt } from 'antd';
import { v4 } from 'uuid';

import { Modal } from '@components';
import Form from '../../form';
import { convertFormValue } from '@utils';
import { FormModel } from '@models';
import { useAppDispatch, useTypedSelector } from '@reducers';

const Hook = forwardRef(
  (
    {
      title,
      handleChange,
      firstRun,
      widthModal = 1200,
      columns,
      textSubmit,
      className = '',
      footerCustom,
      idElement = 'modal-form-' + v4(),
      action,
      ...propForm
    }: Type,
    ref: any,
  ) => {
    useImperativeHandle(ref, () => ({ handleEdit, handleDelete, form }));
    const dispatch = useAppDispatch();
    const { data, status } = useTypedSelector((state: any) => state[action.name]);
    const [form] = FormAnt.useForm();

    useEffect(() => {
      switch (status) {
        case 'put.fulfilled':
        case 'post.fulfilled':
        case 'delete.fulfilled':
          handleChange && handleChange();
          break;
      }
    }, [status]);

    const handleEdit = async (item: { id?: string } = {}) => {
      !!firstRun && firstRun(item);
      if (item.id) {
        dispatch(action.getById(item.id));
      } else {
        dispatch(action.isVisible({ isVisible: true, data: {} }));
      }
    };
    const handleDelete = async (id: string) => {
      dispatch(action.delete(id));
    };

    return (
      <Modal
        action={action}
        idElement={idElement}
        widthModal={widthModal}
        textSubmit={textSubmit}
        className={className}
        footerCustom={footerCustom}
        title={(data: any) => title(data)}
        onOk={async (data: any) => {
          return form
            .validateFields()
            .then(async (values) => {
              values = convertFormValue(columns, values);
              if (data.id) dispatch(action.put({ ...values, id: data.id }));
              else dispatch(action.post({ ...values }));
              return true;
            })
            .catch(() => false);
        }}
      >
        <Form {...propForm} values={{ ...data }} form={form} columns={columns} />
      </Modal>
    );
  },
);
Hook.displayName = 'HookModalForm';
type Type = {
  action: any;
  title: (data: any) => string;
  handleChange?: (values?: any, data?: any) => Promise<any>;
  firstRun?: (item: any) => void;
  widthModal?: number;
  columns: FormModel[];
  textSubmit?: string;
  className?: string;
  footerCustom?: (handleOk: () => Promise<any>, handleCancel: () => void) => JSX.Element[] | JSX.Element;
  idElement?: string;
};
export default Hook;
