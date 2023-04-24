import React, { MouseEventHandler } from 'react';
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
      {icon}
      {text}
    </button>
  );
};

type Type = {
  icon?: React.ReactNode;
  text?: string | DefaultTFuncReturn;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
};
