import React, { forwardRef, useImperativeHandle, PropsWithChildren } from 'react';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { v4 } from 'uuid';

import { Button, Spin } from '@components';
import { useAppDispatch } from '../../redux/hooks/useActions';
import slice from '../../redux/reducers/users/slice';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';

const Hook = forwardRef(
  (
    {
      action,
      title,
      widthModal = 800,
      onOk,
      firstChange = true,
      textSubmit,
      className = '',
      footerCustom,
      children,
      idElement = 'modal-' + v4(),
    }: Type,
    ref: any,
  ) => {
    useImperativeHandle(ref, () => ({ handleCancel, data }));
    const dispatch = useAppDispatch();
    const { data, isLoading, isVisible } = useTypedSelector((state: any) => state[action.name]);

    const { t } = useTranslation();
    const handleCancel = () => {
      dispatch(slice.actions.setIsVisible(false));
    };
    const handleOk = async () => {
      if (onOk) {
        onOk(data);
      } else {
        handleCancel();
      }
    };

    return (
      <Modal
        maskClosable={false}
        destroyOnClose={true}
        centered={true}
        width={widthModal}
        title={title && <h3 className="font-bold text-lg">{title(data)}</h3>}
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
  action: any;
  title?: (data: any) => string;
  widthModal: number;
  onOk?: (data: any) => any;
  onCancel?: (data: any) => void;
  GetById?: (id?: string) => any;
  firstChange?: boolean;
  textSubmit?: string;
  className?: string;
  footerCustom?: (handleOk: () => Promise<any>, handleCancel: () => void) => JSX.Element[] | JSX.Element;
  idElement?: string;
}>;
export default Hook;
