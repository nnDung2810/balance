import React from 'react';

import { keyRole } from '@utils';
import './index.less';
import { Cog, Buffer, Cart, Store, User, Chart } from '@svgs';

const Layout = () => [
  {
    icon: <Buffer className="icon-menu" />,
    name: 'Dashboard',
  },
  {
    icon: <Cart className="icon-menu" />,
    name: 'Supplier',
  },
  // {
    //   icon: <User className="icon-menu" />,
    //   name: 'User',
    //   child: [
      //     {
        //       name: 'User/List',
        //       permission: keyRole.P_USER_LISTED,
        //     },
        //     {
          //       name: 'User/Add',
          //       permission: keyRole.P_DATA_LISTED,
          //     },
          //   ],
          // },
  {
    icon: <User className="icon-menu" />,
    name: 'User/List',
  },
  {
    icon: <Store className="icon-menu" />,
    name: 'Store',
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
