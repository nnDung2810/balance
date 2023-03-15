import React from 'react';
import classNames from 'classnames';
import { DefaultTFuncReturn } from 'i18next';

export const Button = ({ text, icon, className, disabled, ...props }: Type) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={classNames(
        'button',
        {
          icon: !!icon && !text,
        },
        className,
      )}
      {...props}
    >
      {icon && <i className={icon} />}
      {text}
    </button>
  );
};

type Type = {
  icon?: string;
  text?: string | DefaultTFuncReturn;
  className?: string;
  disabled?: boolean;
  onClick?: any;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
};
