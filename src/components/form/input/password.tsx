import React, { useState } from 'react';
import classNames from 'classnames';

const Component = ({
  value = '',
  placeholder,
  disabled,
  tabIndex,
  ...prop
}: {
  value?: string;
  placeholder: string;
  disabled: boolean;
  tabIndex: number;
}) => {
  const [toggle, set_toggle] = useState(true);

  return (
    <div className="relative">
      <input
        tabIndex={tabIndex}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        {...prop}
        type={toggle ? 'password' : 'text'}
        className="w-full h-10 rounded-xl text-gray-600 bg-white border border-solid py-2 pr-9 pl-4 ant-input pr-9"
      />
      <i
        onClick={() => set_toggle(!toggle)}
        className={classNames('text-lg las absolute top-1.5 right-3 z-10', {
          'la-eye-slash': toggle,
          'la-eye': !toggle,
        })}
      />
    </div>
  );
};
export default Component;
