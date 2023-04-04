import { keyRole } from '@utils';
import SVGChart from "../../assets/svgs/chart-area-solid.svg"
import SVGUserCircle from "../../assets/svgs/user-circle.svg"
import SVGCog from"../../assets/svgs/cog-solid.svg"
import SVGCode from "../../assets/svgs/code-branch-solid.svg"
import SVGServer from "../../assets/svgs/server-solid.svg"


const Layout = () => [
  {
    icon: SVGChart,
    name: 'Dashboard',
  },
  {
    icon: SVGUserCircle,
    name: 'User',
    permission: keyRole.P_USER_LISTED,
  },
  {
    icon: SVGCog,
    name: 'Setting',
    child: [
      {
        icon: SVGCode,
        name: 'Code',
        permission: keyRole.P_CODE_LISTED,
      },
      {
        icon: SVGServer,
        name: 'Data',
        permission: keyRole.P_DATA_LISTED,
      },
    ],
  },
];

export default Layout;
