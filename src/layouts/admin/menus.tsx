import React from 'react';

import { keyRole } from '@utils';
import './index.less';
import { Cart, Chart, Cog, Store, User } from '@svgs';

const Layout = () => [
  {
    icon: <Chart className="icon-menu" />,
    name: 'Dashboard',
  },
  {
    icon: <User className="icon-menu" />,
    name: 'User',
    child: [
      {
        name: 'User/List',
        permission: keyRole.P_USER_LISTED,
      },
      {
        name: 'User/Add',
        permission: keyRole.P_DATA_LISTED,
      },
    ],
  },
  {
    icon: <Cart className="icon-menu" />,
    name: 'Supplier',
  },
  {
    icon: <Store className="icon-menu" />,
    name: 'Store',
  },
  {
    icon: <Cog className="icon-menu" />,
    name: 'Setting',
    child: [
      {
        name: 'Code',
        permission: keyRole.P_CODE_LISTED,
      },
      {
        name: 'Data',
        permission: keyRole.P_DATA_LISTED,
      },
    ],
  },
];

export default Layout;
