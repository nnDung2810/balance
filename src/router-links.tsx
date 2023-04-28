const Util = (name: string, type?: string) => {
  const array: {
    [selector: string]: string;
  } = {
    'Sign-in': '/user-admin/sign-in',
    Login: '/auth/login',
    ResetPassword: '/auth/reset-password',
    MyProfile: '/my-profile',
    Dashboard: '/',

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

    ForgetPassword: '/user-admin/forgot-password',
    VerifyForotPassword: '/user-admin/verify-forgot-password',

    SetPassword: '/user-admin/set-password',
    'store-managerment/create': '/store-managerment/create',
    'merchandise-managerment/product': '/merchandise-managerment/product',
    'merchandise-managerment/category': '/merchandise-managerment/category',
    'merchandise-managerment/tax': '/merchandise-managerment/tax',
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
    SupplierProvince: '/province',
    District: '/district',

  }; // 💬 generate api to here

  switch (type) {
    case 'api':
      return apis[name];
    default:
      return array[name];
  }
};
export default Util;
