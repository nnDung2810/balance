import React from 'react';

import { Button } from './Button';

export default {
  title: 'Example/Button',
  component: Button,
};

const Template = (args: any) => <Button {...args} />;

export const Primary: any = Template.bind({});
Primary.args = {
  type: 'primary',
  children: 'Primary',
};

export const Icon: any = Template.bind({});
Icon.args = {
  type: 'icon',
  children: <i className="las la-edit text-xl" />,
};
