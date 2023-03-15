import React, { useState, forwardRef, useImperativeHandle, useRef, Dispatch, SetStateAction } from 'react';
import { Modal, FormDrag } from '@components';
import { v4 } from 'uuid';
import { FormModel } from '@models';

const Hook = forwardRef(
  (
    {
      onReload,
      title,
      isLoading,
      setIsLoading,
      Get,
      saveAll,
      id,
      widthModal = 800,
      isReloadLoadToSave = false,
      idElement = 'modal-drag-' + v4(),
      columns,
      GetById,
      Post,
      Put,
      Delete,
      widthForm = 800,
      showAddNew,
      conditionEdit,
      conditionDelete,
      isAllowDrag,
      maxDepth,
      showName,
      ...prop
    }: Type,
    ref: any,
  ) => {
    useImperativeHandle(ref, () => ({ handleShow, handleSave, data }));

    const [data, set_data] = useState([]);

    const handleShow = async () => {
      setIsLoading(true);
      onReload && (await onReload());
      const { data } = await Get(id);
      setIsLoading(false);
      set_data(data);
      await modal?.current?.handleShow();
    };

    const handleSave = async (items: any) => {
      if (isReloadLoadToSave) {
        setIsLoading(true);
        const { data } = await Get(id);
        set_data(data);
        setIsLoading(false);
      } else {
        set_data(items);
      }
    };

    const modal: any = useRef();

    return (
      <Modal
        ref={modal}
        widthModal={widthModal}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        idElement={idElement}
        title={title}
        onOk={saveAll}
      >
        <FormDrag
          columns={columns}
          GetById={GetById}
          Post={Post}
          Put={Put}
          Delete={Delete}
          widthForm={widthForm}
          showAddNew={showAddNew}
          conditionEdit={conditionEdit}
          conditionDelete={conditionDelete}
          items={data?.length ? data : []}
          onSave={handleSave}
          isAllowDrag={isAllowDrag}
          maxDepth={maxDepth}
          showName={showName}
          {...prop}
        />
      </Modal>
    );
  },
);
Hook.displayName = 'HookModalDrag';
type Type = {
  onReload?: () => Promise<any>;
  title: () => string;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  Get: any;
  saveAll?: (data: any) => Promise<any>;
  id?: string;
  widthModal?: number;
  isReloadLoadToSave: boolean;
  idElement: string;
  columns: FormModel[];
  GetById: (id: string, item: any) => any;
  Post: (id?: string) => any;
  Put: (values: any, id: string) => Promise<any>;
  Delete: (id: string, item: any) => void;
  widthForm: number;
  showAddNew: boolean;
  conditionEdit?: (item: any) => boolean;
  conditionDelete?: (item: any) => boolean;
  isAllowDrag?: (item: any) => boolean;
  maxDepth?: number;
  showName?: (item: any, handleEdit?: void) => JSX.Element;
};
export default Hook;
