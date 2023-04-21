const Util = (name: string, type?: string) => {
  const array: any = {
    'Sign-in': '/user-admin/sign-in',
    ResetPassword: '/auth/reset-password',
    MyProfile: '/my-profile',
    Dashboard: '/',
    User: '/user',
    'User/List': '/user/list',
    'User/Add': '/user/add',
    Setting: '/setting',
    Data: '/setting/data',
    Code: '/setting/code',
    ForgetPassword: '/auth/forgot-password',
    Store: "/store-managerment",
    'store-managerment/create': '/store-managerment/create'
  }; // 💬 generate link to here

  const apis: any = {
    Auth: '/auth',
    'User-admin': '/user-admin',
    CodeType: '/code-type',
    Code: '/code',
    UserRole: '/mt-role',
    User: '/user-admin',
    DataType: '/data-type',
    Data: '/data',
    'sub-organization': '/sub-organization'
  }; // 💬 generate api to here

  switch (type) {
    case 'api':
      return apis[name];
    default:
      return array[name];
  }
};
export default Util;
