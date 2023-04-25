// import { FormModel } from '@models';
// import { User } from '@svgs';

// export const ColumnProfile = ({ t, listPosition }: any) => {
//   const col: FormModel[] = [
//     {
//       title: t('Họ và tên'),
//       name: 'name',
//       formItem: {
//         rules: [{ type: 'required' }],
//       },
//     },
//     {
//       title: t('Email'),
//       name: 'email',
//       formItem: {
//         col: 6,
//         rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
//       },
//     },
//     {
//       title: t('Số điện thoại'),
//       name: 'phoneNumber',
//       formItem: {
//         col: 6,
//         rules: [{ type: 'required' }, { type: 'phone', min: 10, max: 15 }],
//       },
//     },
//     {
//       title: t('Ghi chú'),
//       name: 'note',
//       formItem: {
//         type: 'textarea',
//       },
//     },
//   ];
//   return col;
// };
// export const ColumnProfileAvatar = ({t}:any)=>{
//   const col: FormModel[]=[
//      {
//       name: 'profileImage',
//       formItem: {
//         type: 'upload',
//         mode: 'multiple',
//       },
//       //title: t('Avatar'),
//     },
//      {
//       name: 'name',
//       formItem: {
//         render: (text: string, item: any) => text=item.name,
//       },
//       //title: t('Avatar'),
//     },
//      {
//       name: 'userRole',
//       formItem: {
//        render: (text: string, item: any) =>{
//             if((text=item.userRole[0].mtRole.code) === "ADMIN"){
//               return   "Quản trị viên" ;
//             } else if((text=item.userRole[0].mtRole.code) === "OWNER_SUPPLIER"){
//               return   "Đại diện NCC";
//             } else {
//               return   "Đại diện cửa hàng"
//             }
//           }
//         //  render: (text: string, item: any) => text && <Avatar src={item.avatar} text={item.name} />,
//       },
//       //title: t('Avatar'),
//     },
//   ];
//   return col;
// };
