import React, { forwardRef, useImperativeHandle } from 'react';
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
      widthModal = 1200,
      columns,
      textSubmit,
      className = '',
      footerCustom,
      idElement = 'modal-form-' + v4(),
      action,
      keyState = 'isVisible',
      keyPost = 'post',
      keyPut = 'put',
      ...propForm
    }: Type,
    ref: any,
  ) => {
    useImperativeHandle(ref, () => ({ handleEdit, handleDelete, form }));
    const dispatch = useAppDispatch();
    const { data } = useTypedSelector((state: any) => state[action.name]);
    const [form] = FormAnt.useForm();

    const handleEdit = async (item: { id?: string } = {}, isGet = true) => {
      if (item.id && isGet) {
        dispatch(action.getById({ id: item.id, keyState }));
      } else {
        dispatch(action.set({ [keyState]: true, data: item }));
      }
    };
    const handleDelete = async (id: string) => {
      dispatch(action.delete(id));
    };

    return (
      <Modal
        action={action}
        keyState={keyState}
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
              if (data.id) dispatch(action[keyPut]({ ...values, id: data.id }));
              else dispatch(action[keyPost]({ ...values }));
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
  keyState?: string;
  keyPost?: string;
  keyPut?: string;
  title: (data: any) => string;
  widthModal?: number;
  columns: FormModel[];
  textSubmit?: string;
  className?: string;
  footerCustom?: (handleOk: () => Promise<any>, handleCancel: () => void) => JSX.Element[] | JSX.Element;
  idElement?: string;
};
export default Hook;
