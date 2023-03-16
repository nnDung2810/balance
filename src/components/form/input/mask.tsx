import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { FormInstance } from 'antd';

const Component = ({
  mask,
  value,
  addonBefore,
  addonAfter,
  form,
  disabled,
  onFirstChange,
  maxLength,
  placeholder,
  onBlur,
  onChange,
  ...prop
}: Type) => {
  const input = useRef<any>();

  useEffect(() => {
    setTimeout(() => {
      if (mask && input.current) {
        // @ts-ignore
        import('inputmask').then(({ default: Inputmask }) => Inputmask(mask).mask(input.current));
      }
    });
  }, []);
  return (
    <div className={classNames('ant-input flex items-center', { 'border rounded-xl': !!addonBefore || !!addonAfter })}>
      {!!addonBefore && <div>{addonBefore(form, onFirstChange)}</div>}
      <input
        ref={input}
        className={classNames('w-full h-10 text-gray-600 bg-white px-4 ant-input', {
          'border rounded-xl': !addonBefore && !addonAfter,
          'rounded-l-xl border-r': !addonBefore && !!addonAfter,
          'rounded-r-xl border-l': !!addonBefore && !addonAfter,
          'border-r border-l': !!addonBefore && !!addonAfter,
          'bg-gray-100 text-gray-400': disabled,
        })}
        readOnly={disabled}
        value={value || ''}
        maxLength={maxLength}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
        {...prop}
      />
      {!!addonAfter && <div>{addonAfter(form, onFirstChange)}</div>}
    </div>
  );
};
type Type = {
  mask?: string;
  value?: string;
  addonBefore?: (form: FormInstance, onFirstChange: () => void) => JSX.Element;
  addonAfter?: (form: FormInstance, onFirstChange: () => void) => JSX.Element;
  form: FormInstance;
  disabled: boolean;
  onFirstChange: () => void;
  maxLength?: number;
  placeholder: string;
  onBlur: (e: any) => any;
  onChange: (e: any) => any;
};
export default Component;
