// import { FormModel } from '@models';
// import { Eye, User } from '@svgs';
// import { Col, Input, Row, Tabs, Collapse } from 'antd';
// import { Rule } from 'antd/es/form';
// import FormItem from 'antd/es/form/FormItem';
// import TextArea from 'antd/es/input/TextArea';
// import Column from 'antd/es/table/Column';
// import TabPane from 'antd/es/tabs/TabPane';
// import classNames from 'classnames';
// import React from 'react';
// import {Form}  from '@components/form';


// export const ColumnProfile = ({ t }: any) => {
//   return (
//     <>
//       <Tabs defaultActiveKey="1" size="large">
//         <TabPane tab="Thông tin cá nhân" key="1">
//           <Form
//           columns={[
//             {
//               title: ('Họ và tên'),
//               name: 'name',
//               formItem: {
//                 col: 6,
//                 rules: [{ type: 'required' }],
//               },
//             },
//             {
//               title: ('Email'),
//               name: 'email',
//               formItem: {
//                 tabIndex: 1,
//                 col: 6,
//                 rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
//               },
//             },
//             {
//               title: ('Số điện thoại'),
//               name: 'phoneNumber',
//               formItem: {
//                 tabIndex: 1,
//                 col: 6,
//                 rules: [{ type: 'required' }, { type: 'phone', min: 10, max: 15 }],
//               },
//             },
//             {
//               title: ('Ghi chú'),
//               name: 'note',
//               formItem: {
//                 type: 'textarea',
//               },
//             },
//           ]}
//           />
//         </TabPane>
//         <TabPane tab="Đổi mật khẩu" key="2">
//          <Form
//          columns={[
//           {
//             title: ('Mật khẩu hiện tại'),
//             name: 'password',
//             formItem: {
//               col: 6,
//               type: 'password',
//               rules: [{ type: 'required' }, { type: 'password' }],
//               placeholder: 'Nhập mật khẩu'
//             },
//           },
//           {
//             title: ('Mật khẩu mới'),
//             name: 'newpassword',
//             formItem: {
//               col: 6,
//               type: 'password',
//               rules: [{ type: 'required' }, { type: 'password' }, { type: 'min', value: 6 }],
//               placeholder: 'Nhập mật khẩu mới'
//             },
//           },
//           {
//             title: ('Xác nhận mật khẩu'),
//             name: 'retypedpassword',
//             formItem: {
//               col: 6,
//               type: 'password',
//               rules: [{ type: 'required' }, { type: 'password' }, { type: 'min', value: 6 }],
//               placeholder: 'Xác nhận mật khẩu'
//             },
//           },
//          ]}
//          />
//          </TabPane>
//       </Tabs>
//     </>
//   );
// }

