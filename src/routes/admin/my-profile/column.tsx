import { FormModel } from "@models"
import { UserSolid } from "@svgs"

export const ColumnProfile = ({ t }: any) => {
  const col: FormModel[] = [
    {
      name: 'profileImage',
      formItem: {
        type: 'upload',
        mode: 'multiple',
        onlyImage: true,
      },
    },
    {
      title: t('Họ và tên'),
      name: 'name',
      formItem: {
        render: (form, values) => {
          return (
            <div className=''>
              {values.name}
            </div>
          )
        }
      },
    },
    {
      title: t('Vai trò'),
      name: 'userRole',
      formItem: {
        render: (text: any, item: any) => {
          if (text = item.userRole[0].mtRole.code === "ADMIN") {
            return (
              <div className='flex w-full flex-row justify-center pt-2'>
                <div><UserSolid className='w-7 h-7 mr-2 fill-slate-500' /></div>
                <div className='text-xl text-gray-500'>Quản trị viên</div>
              </div>
            )
          } else if (text = item.userRole[0].mtRole.code === "OWNER_SUPPLIER") {
            return (
              <div className='flex w-full flex-row justify-center'>
                <div><UserSolid className='w-7 h-7 mr-2' /></div>
                <div>Đại diện NCC</div>
              </div>
            )
          } else {
            return (
              <div className='flex w-full flex-row justify-center'>
                <div><UserSolid className='w-7 h-7 mr-2' /></div>
                <div>Đại diện cửa hàng</div>
              </div>
            )
          }
        }
      },
    },
  ]
  return col;
}
export const ColumnProfileUser = ({ t }: any) => {
  const col: FormModel[] = [
    {
      title: ('Họ và tên'),
      name: 'name',
      formItem: {
        col: 12,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: ('Email'),
      name: 'email',
      formItem: {
        tabIndex: 1,
        col: 6,
        rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
      },
    },
    {
      title: ('Số điện thoại'),
      name: 'phoneNumber',
      formItem: {
        tabIndex: 1,
        col: 6,
        rules: [{ type: 'required' }, { type: 'phone', min: 10, max: 15 }],
      },
    },
    {
      title: ('Ghi chú'),
      name: 'note',
      formItem: {
        type: 'textarea',
      },
    },
  ]
  return col;
}
export const ColumnProfilePassword = ({ t }: any) => {
  const col: FormModel[] = [
    {
      title: ('Mật khẩu hiện tại'),
      name: 'password',
      formItem: {
        col: 12,
        type: 'password',
        rules: [{ type: 'required' }, { type: 'min', value: 6 }],
        placeholder: 'Nhập mật khẩu'
      },
    },
    {
      title: ('Mật khẩu mới'),
      name: 'passwordNew',
      formItem: {
        col: 12,
        type: 'password',
        rules: [{ type: 'required' }, { type: 'min', value: 6 }],
        placeholder: 'Nhập mật khẩu mới'
      },
    },
    {
      title: ('Xác nhận mật khẩu'),
      name: 'passwordComfirm',
      formItem: {
        col: 12,
        type: 'password',
        rules: [{ type: 'required' }, { type: 'min', value: 6 }],
        placeholder: 'Xác nhận mật khẩu'
      },
    },
  ]
  return col;
}
