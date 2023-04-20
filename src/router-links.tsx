const Util = (name: string, type?: string) => {
  const array: any = {
    Login: '/auth/login',
    'Sign-in': '/user-admin/sign-in',
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
    Supplier: '/sub-organization',
  }; // 💬 generate api to here

  switch (type) {
    case 'api':
      return apis[name];
    default:
      return array[name];
  }
};
export default Util;
