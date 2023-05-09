const Util = (name: string, type?: string) => {
  const array: {
    [selector: string]: string;
  } = {
    Login: '/auth/login',
    ForgetPassword: '/auth/forgot-password',
    VerifyForotPassword: '/auth/verify-forgot-password',
    SetPassword: '/auth/set-password',
    MyProfile: '/my-profile',
    Dashboard: '/dashboard',

    Supplier: '/supplier',
    'Supplier/Add': '/supplier/add',
    'Supplier/Edit': '/supplier/edit',

    Store: "/store-managerment",
    'Store/Add': '/store/add',
    'Store/Edit': '/store/edit',

    User: '/user',
    'User/List': '/user/list',
    'User/Add': '/user/add',
    'User/Edit': '/user/edit',

    'store-managerment/create': '/store-managerment/create',
    'store-managerment/edit': '/store-managerment/detail'
  }; // 💬 generate link to here

  const apis: {
    [selector: string]: string;
  } = {
    'User-admin': '/user-admin',
    Auth: '/auth',
    UserRole: '/mt-role',
    User: '/user-admin',
    'sub-organization': '/sub-organization',
    Supplier: '/sub-organization',
    Province: '/province',
    District: '/district',
    Ward: '/ward',
  }; // 💬 generate api to here

  switch (type) {
    case 'api':
      return apis[name];
    default:
      return array[name];
  }
};
export default Util;
