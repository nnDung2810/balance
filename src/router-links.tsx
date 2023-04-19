const Util = (name: string, type?: string) => {
  const array: any = {
    Login: '/auth/login',
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
    Store:"/store",
  }; // 💬 generate link to here

  const apis: any = {
    Auth: '/auth',
    CodeType: '/code-type',
    Code: '/code',
    UserRole: '/user-role',
    User: '/user',
    DataType: '/data-type',
    Data: '/data',
    // Store:'/user'
  }; // 💬 generate api to here

  switch (type) {
    case 'api':
      return apis[name];
    default:
      return array[name];
  }
};
export default Util;
