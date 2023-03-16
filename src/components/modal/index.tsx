import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
} from 'react';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { v4 } from 'uuid';

import { Button, Spin } from '@components';

const Hook = forwardRef(
  (
    {
      title,
      widthModal = 800,
      onOk,
      onCancel,
      GetById,
      isLoading,
      setIsLoading,
      firstChange = true,
      textSubmit,
      className = '',
      footerCustom,
      children,
      idElement = 'modal-' + v4(),
    }: Type,
    ref: any,
  ) => {
    useImperativeHandle(ref, () => ({ handleShow, handleCancel, data: data.current, setIsVisible }));

    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const isLoadingT = useRef(false);
    const data = useRef({});
    const handleCancel = () => {
      setIsVisible(false);
      isLoadingT.current = false;
      !!onCancel && onCancel(data.current);
    };
    const handleOk = async () => {
      if (!isLoadingT.current) {
        isLoadingT.current = true;
        if (onOk) {
          setIsLoading && setIsLoading(true);
          const res = await onOk(data.current);
          setIsLoading && setIsLoading(false);
          !!res && handleCancel();
          isLoadingT.current = false;
          return res;
        } else {
          handleCancel();
        }
      }
    };

    const handleShow = async (item: { id?: string } = {}) => {
      setIsLoading(true);
      if (GetById) {
        const { data } = await GetById(item.id);
        item = { ...item, ...data };
      }
      data.current = item;
      setIsVisible(true);
      setTimeout(() => setIsLoading(false), 1);
    };

    return (
      <Modal
        maskClosable={false}
        destroyOnClose={true}
        centered={true}
        width={widthModal}
        title={title && <h3 className="font-bold text-lg">{title(data.current)}</h3>}
        open={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        wrapClassName={className}
        footer={
          !!onOk &&
          ((footerCustom && footerCustom(handleOk, handleCancel)) || (
            <div className="flex justify-end gap-2">
              <Button
                text={t('components.form.modal.cancel')}
                className="!bg-red-600 btn-cancel"
                onClick={handleCancel}
              />
              <Button
                icon={isLoading ? 'las la-spinner animate-spin' : ''}
                text={textSubmit || t('components.form.modal.save')}
                disabled={!firstChange}
                onClick={handleOk}
              />
            </div>
          ))
        }
      >
        <Spin spinning={isLoading} idElement={idElement}>
          {children}
        </Spin>
      </Modal>
    );
  },
);
Hook.displayName = 'HookModal';
type Type = PropsWithChildren<{
  title?: (data: any) => string;
  widthModal: number;
  onOk?: (data: any) => Promise<any>;
  onCancel?: (data: any) => void;
  GetById?: (id?: string) => any;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  firstChange?: boolean;
  textSubmit?: string;
  className?: string;
  footerCustom?: (handleOk: () => Promise<any>, handleCancel: () => void) => JSX.Element[] | JSX.Element;
  idElement?: string;
}>;
export default Hook;
