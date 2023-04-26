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
    User: '/user',
    'User/List': '/user/list',
    'User/Add': '/user/add',
    'User/Edit': '/user/edit',
    Setting: '/setting',
    Data: '/setting/data',
    Code: '/setting/code',
    ForgetPassword: '/user-admin/forgot-password',
    VerifyForotPassword: '/user-admin/verify-forgot-password',
    SetPassword: '/user-admin/set-password',
    Store: "/store-managerment",
    'store-managerment/create': '/store-managerment/create',
    'store-managerment/edit': '/store-managerment/detail'
  }; // 💬 generate link to here

  const apis: {
    [selector: string]: string;
  } = {
    'User-admin': '/user-admin',
    Auth: '/auth',
    CodeType: '/code-type',
    Code: '/code',
    UserRole: '/mt-role',
    User: '/user-admin',
    DataType: '/data-type',
    Data: '/data',
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
