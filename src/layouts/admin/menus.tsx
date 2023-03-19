import {keyRole} from '@utils';

const Layout = () => [
  {
    icon: 'las la-chart-area',
    name: 'Dashboard',
  },
  {
    icon: 'las la-user-circle',
    name: 'User',
    permission: keyRole.P_USER_LISTED,
  },
  {
    icon: 'las la-cog',
    name: 'Setting',
    child: [
      {
        icon: 'las la-code-branch',
        name: 'Code',
        permission: keyRole.P_CODE_LISTED,
      },
      {
        icon: 'las la-server',
        name: 'Data',
        permission: keyRole.P_DATA_LISTED,
      },
    ],
  },
];

export default Layout;
