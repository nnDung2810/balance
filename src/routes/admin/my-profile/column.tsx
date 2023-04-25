import { FormModel } from '@models';
import { User } from '@svgs';
import { Tabs } from 'antd';
import Column from 'antd/es/table/Column';
import TabPane from 'antd/es/tabs/TabPane';

export const ColumnProfile = ({ t }: any) => {
  const col: FormModel[] = [
    {
      name: 'user',
      title: '',
      formItem: {
        type: 'tab',
        tab: {
          label: 'myProfile',
          value: 'myProfile',
        },
        list: [
          { label: 'Thông tin cá nhân', value: '1' },
          { label: 'Đổi mật khẩu', value: '2' },
        ],
        column:[
            {
              title: t('Họ và tên'),
              name: 'name',
              formItem: {
                col: 6,
                rules: [{ type: 'required' }],
              },
            },
            {
              title: t('Email'),
              name: 'email',
              formItem: {
                col: 6,
                rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
              },
            },
            {
              title: t('Số điện thoại'),
              name: 'phoneNumber',
              formItem: {
                col: 6,
                rules: [{ type: 'required' }, { type: 'phone', min: 10, max: 15 }],
              },
            },
            {
              title: t('Ghi chú'),
              name: 'note',
              formItem: {
                type: 'textarea',
              },
            },
        ]
        //  column: (
        //   <Tabs defaultActiveKey="0">
        //     <TabPane tab="Thông tin cá nhân" key="0">
        //       {[
        //         {
        //           title: t('Họ và tên'),
        //           name: 'name',
        //           formItem: {
        //             col: 6,
        //             rules: [{ type: 'required' }],
        //           },
        //         },
        //         {
        //           title: t('Email'),
        //           name: 'email',
        //           formItem: {
        //             col: 6,
        //             rules: [
        //               { type: 'required' },
        //               { type: 'email' },
        //               { type: 'min', value: 6 },
        //             ],
        //           },
        //         },
        //         {
        //           title: t('Số điện thoại'),
        //           name: 'phoneNumber',
        //           formItem: {
        //             col: 6,
        //             rules: [
        //               { type: 'required' },
        //               { type: 'phone', min: 10, max: 15 },
        //             ],
        //           },
        //         },
        //         {
        //           title: t('Ghi chú'),
        //           name: 'note',
        //           formItem: {
        //             type: 'textarea',
        //           },
        //         },
        //       ].map((formItem, idx) => (
        //         <Column
        //           key={idx}
        //           title={formItem.title}
        //           dataIndex={formItem.name}
        //           // render={(text, record, index) =>
        //           //   generateFormItem(formItem, text, record, index, reRender)
        //           // }
        //         />
        //       ))}
        //     </TabPane>
        //     <TabPane tab="Đổi mật khẩu" key="1">
        //     {[
        //         {
        //           title: t('Họ và tên'),
        //           name: 'name',
        //           formItem: {
        //             col: 6,
        //             rules: [{ type: 'required' }],
        //           },
        //         },
        //         {
        //           title: t('Email'),
        //           name: 'email',
        //           formItem: {
        //             col: 6,
        //             rules: [
        //               { type: 'required' },
        //               { type: 'email' },
        //               { type: 'min', value: 6 },
        //             ],
        //           },
        //         },
        //       ].map((formItem, idx) => (
        //         <Column
        //           key={idx}
        //           title={formItem.title}
        //           dataIndex={formItem.name}
        //           // render={(text, record, index) =>
        //           //   generateFormItem(formItem, text, record, index, reRender)
        //           // }
        //         />
        //       ))}
        //     </TabPane>
        //   </Tabs>
        // ),
        // column: [
          // {
          //   title: t('Họ và tên'),
          //   name: 'name',
          //   formItem: {
          //     col: 6,
          //     rules: [{ type: 'required' }],
          //   },
          // },
          // {
          //   title: t('Email'),
          //   name: 'email',
          //   formItem: {
          //     col: 6,
          //     rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
          //   },
          // },
          // {
          //   title: t('Số điện thoại'),
          //   name: 'phoneNumber',
          //   formItem: {
          //     col: 6,
          //     rules: [{ type: 'required' }, { type: 'phone', min: 10, max: 15 }],
          //   },
          // },
          // {
          //   title: t('Ghi chú'),
          //   name: 'note',
          //   formItem: {
          //     type: 'textarea',
          //   },
          // },
        // ]
      },
    },
    // {
    //     title: t('Họ và tên'),
    //   name: 'name',
    //   formItem: {
    //     type: 'tab',
    //     tab: {
    //       label: 'Thông tin cá nhân',
    //       value: 'language',
    //     },
    //     list: [
    //       { label: 'Thông tin cá nhân', value: 'en' },
    //       { label: 'Đổi mật khẩu', value: 'vn' },
    //     ],
    //     column: [
    //       {
    //         title: t('Email'),
    //         name: 'email',
    //         formItem: {
    //           col: 6,
    //           rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
    //         },
    //       },
    //       {
    //         title: t('Số điện thoại'),
    //         name: 'phoneNumber',
    //         formItem: {
    //           col: 6,
    //           rules: [{ type: 'required' }, { type: 'phone', min: 10, max: 15 }],
    //         },
    //       },
    //       {
    //         title: t('Ghi chú'),
    //         name: 'note',
    //         formItem: {
    //           type: 'textarea',
    //         },
    //       },
    //     ],
    //   },
    // },
    // {
    //   title: t('Email'),
    //   name: 'email',
    //   formItem: {
    //     col: 6,
    //     rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
    //   },
    // },
    // {
    //   title: t('Số điện thoại'),
    //   name: 'phoneNumber',
    //   formItem: {
    //     col: 6,
    //     rules: [{ type: 'required' }, { type: 'phone', min: 10, max: 15 }],
    //   },
    // },
    // {
    //   title: t('Ghi chú'),
    //   name: 'note',
    //   formItem: {
    //     type: 'textarea',
    //   },
    // },
  ];
  return col;
};
export const ColumnProfileAvatar = ({ t }: any) => {
  const col: FormModel[] = [
    {
      name: 'profileImage',
      formItem: {
        type: 'upload',
        mode: 'multiple',
      },
    },
    {
      name: 'name',
      formItem: {
        render: (form, values) => {
          return (
            <div>
              {values.name}
            </div>
          );
        },
      }
    },
    {
      name: 'userRole',
      formItem: {
        render: (form, values, generateForm, index, reRender) => {
          if ((values.userRole[0].mtRole.code) === "ADMIN") {
            return "Quản trị viên";
          } else if ((values.userRole[0].mtRole.code) === "OWNER_SUPPLIER") {
            return "Đại diện NCC";
          } else {
            return "Đại diện cửa hàng"
          }
        }
        //  render: (text: string, item: any) => text && <Avatar src={item.avatar} text={item.name} />,
      },
      //title: t('Avatar'),
    },
  ];
  return col;
};
