import React, { forwardRef, Ref, useImperativeHandle } from 'react';
import { Form as FormAnt } from 'antd';
import { v4 } from 'uuid';

import { Modal, Form } from '@components';
import { convertFormValue } from '@utils';
import { FormModel, FormModalRefObject } from '@models';

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
      facade,
      keyState = 'isVisible',
      keyPost = 'post',
      keyPut = 'put',
      ...propForm
    }: Type,
    ref: Ref<FormModalRefObject>,
  ) => {
    useImperativeHandle(ref, () => ({ handleEdit, handleDelete, form }));
    const { data } = facade;
    const [form] = FormAnt.useForm();

    const handleEdit = async (item: { id?: string } = {}, isGet = true) => {
      if (item.id && isGet) facade.getById({ id: item.id, keyState });
      else facade.set({ [keyState]: true, data: item });
    };
    const handleDelete = async (id: string) => facade.delete(id);

    return (
      <Modal
        facade={facade}
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
              if (data.id) facade[keyPut]({ ...values, id: data.id });
              else facade[keyPost]({ ...values });
              return true;
            })
            .catch(() => false);
        }}
      >
        <Form {...propForm} values={{ ...data }} formAnt={form} columns={columns} />
      </Modal>
    );
  },
);
Hook.displayName = 'HookModalForm';
type Type = {
  facade?: any;
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
