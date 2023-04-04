import { keyRole } from '@utils';
import './index.less';
import { Chart, Cog, User } from 'src/assets/svgs';


const Layout = () => [
  {
    icon: <Chart className='icon-menu'/>,
    name: 'Dashboard',
  },
  {
    icon: <User  className='icon-menu'/>,
    name: 'User',
    permission: keyRole.P_USER_LISTED,
  },
  {
    icon: <Cog className='icon-menu'/>,
    name: 'Setting',
    child: [
      {
        icon: <Chart className='icon-menu'/>,
        name: 'Code',
        permission: keyRole.P_CODE_LISTED,
      },
      {
        icon:<Chart className='icon-menu'/>,
        name: 'Data',
        permission: keyRole.P_DATA_LISTED,
      },
    ],
  },
];

export default Layout;
