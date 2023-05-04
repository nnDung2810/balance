import { DataTableModel, FormModel } from "@models";
import { Select } from "antd";

const { Option } = Select

export const ColumnFormUser = ({ t }: any) => {
  const col: DataTableModel[] = [
    {
      title: t(`user.Usercode`),
      name: 'code',
      tableItem: {
      }
    },
    {
      title: t(`user.Fullname`),
      name: 'name',
      tableItem: {
      }
    },
    {
      title: t('Email'),
      name: 'email',
      tableItem: {
      },
    },
    {
      title: t(`user.Phone Number`),
      name: 'phoneNumber',
      tableItem: {
      },
    },
    {
      title: t(`user.Role`),
      name: 'userRole',
      tableItem: {
        render: (text: any, item: any) => {
          if (text = item.userRole[0].mtRole.code === "ADMIN") {
            return "Quản trị viên"
          }
          else if (text = item.userRole[0].mtRole.code === "OWNER_SUPPLIER") {
            return "Đại diện NCC "
          }
          else {
            return "Đại diện cửa hàng"
          }
        }
      },
    },

  ];
  return col;
};
export const ColumnFormAdd = ({ t }: any) => {
  const col: FormModel[] = [
    {
      title: t(`user.Fullname`),
      name: 'name',
      formItem: {
        tabIndex: 1,
        col: 6,
        rules: [{ type: 'required' }],
      }
    },
    {
      title: t('Email'),
      name: 'email',
      formItem: {
        tabIndex: 2,
        col: 6,
        rules: [{ type: 'required' }],
      }
    },
    {
      title: t(`user.Phone Number`),
      name: 'phoneNumber',
      formItem: {
        tabIndex: 1,
        col: 6,
        rules: [{ type: 'required' }],
      }
    },
    {
      title: t(`user.Note`),
      name: 'note',
      formItem: {
        tabIndex: 1,
        type: 'textarea'
      }
    },
  ]
  return col;
}
export const ColumnFormEdit = ({ t }: any) => {
  const col: FormModel[] = [
    {
      title: t(`user.Usercode`),
      name: 'code',
      formItem: {
        tabIndex: 1,
        disabled: () => true,
        col: 6,
        rules: [{ type: 'required' }],
      }
    },
    {
      title: t(`user.Fullname`),
      name: 'name',
      formItem: {
        tabIndex: 2,
        col: 6,
        rules: [{ type: 'required' }],
      }
    },
    {
      title: t('Email'),
      name: 'email',
      formItem: {
        disabled: () => true,
        tabIndex: 1,
        col: 6,
        rules: [{ type: 'required' }],
      }
    },
    {
      title: t(`user.Phone Number`),
      name: 'phoneNumber',
      formItem: {
        tabIndex: 2,
        col: 6,
        rules: [{ type: 'required' }],
      }
    },
    {
      title: t(`user.Role`),
      name: 'roleCode',
      formItem: {
        tabIndex: 1,
        type: 'select',
        rules: [{ type: 'required' }],
        render: (form, values, generateForm, index, reRender) => {
          const rolecode = values.roleCode;
          return (
            <div>
              <div>
                <h2>{t(`user.Role`)}</h2>
              </div>
              <Select value={rolecode} className="py-2" style={{ width: "100%" }} disabled={true}>
                <Option value={"ADMIN"}>Quản trị viên</Option>
                <Option value={"OWNER_SUPPLIER"}>Nhà cung cấp</Option>
                <Option value={"OWNER_STORE"}>Chủ cửa hàng</Option>
              </Select>
            </div>
          );
        }
      }
    },
    {
      title: t(`user.Note`),
      name: 'note',
      formItem: {
        tabIndex: 1,
        type: 'textarea',
      }
    },
  ]
  return col;
}
