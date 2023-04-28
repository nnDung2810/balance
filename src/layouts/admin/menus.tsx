import React from 'react';

import { keyRole } from '@utils';
import './index.less';
import { Chart, Cog, User, Buffer, Cart } from '@svgs';

const Layout = () => [
  {
    icon: <Buffer className="icon-menu" />,
    name: 'Dashboard',
  },
  {
    icon: <User className="icon-menu" />,
    name: 'User/List',

  },
  {
    icon: <Cart className="icon-menu" />,
    name: 'Supplier',
  },
  {
    icon: <Chart className="icon-menu" />,
    name: 'Store',
  },
  {
    icon: <Chart className="icon-menu" />,
    name: 'merchandise-managerment',
    child: [
      {
        name: 'merchandise-managerment/product',
      //  permission: keyRole.P_CODE_LISTED,
      },
      {
        name: 'merchandise-managerment/category',
      //  permission: keyRole.P_DATA_LISTED,
      },
      {
        name: 'merchandise-managerment/tax',
      //  permission: keyRole.P_DATA_LISTED,
      },
    ],
  },
];

export default Layout;
