import React from 'react';
import {userEvent, within} from '@storybook/testing-library';
// import { expect } from '@storybook/jest';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {Button} from './';

export default {
  title: 'Component/Button',
  component: Button,
  argTypes: {
    disabled: {
      name: 'Disabled',
      description: 'Switches between enabled and disabled button',
      control: {
        type: 'boolean',
      },
    },
    text: {
      name: 'Text',
      description: '',
      control: {
        type: 'text',
      },
    },
    className: {
      name: 'HTML Class',
      description: '',
      control: {
        type: 'text',
      },
    },
    id: {
      name: 'ID Element',
      description: '',
      control: {
        type: 'text',
      },
    },
    icon: {
      name: 'Icon Class',
      description: '',
      control: {
        type: 'text',
      },
    },
    type: {
      name: 'Type HTML',
      description: '',
      control: {
        type: 'text',
      },
    },
    onClick: {
      control: {
        type: null,
      },
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Klm6pxIZSaJFiOMX5FpTul9F',
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: any) => <Button {...args} />;

export const Primary: ComponentStory<typeof Button> = Template.bind({});
Primary.args = {
  text: 'Primary',
};
Primary.play = async ({ canvasElement }: any) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByText('Primary'));
  // expect;
};
/*Primary.parameters = {
  backgrounds: {
    default: 'dark',
  },
};*/

export const Disabled: ComponentStory<typeof Button> = Template.bind({});
Disabled.args = {
  text: 'Disabled',
  disabled: true,
};

export const Icon: ComponentStory<typeof Button> = Template.bind({});
Icon.args = {
  icon: 'las la-edit',
};

export const IconSpin: ComponentStory<typeof Button> = Template.bind({});
IconSpin.args = {
  icon: 'las la-spinner animate-spin',
  text: 'Icon Spin',
};

export const IconText: ComponentStory<typeof Button> = Template.bind({});
IconText.args = {
  text: 'Icon Text',
  icon: 'las la-plus',
};
