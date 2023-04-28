import { DataTableModel, FormModel } from "@models";

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
      name: 'code',
      tableItem: {
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
      title: t(`user.Description`),
      name: 'description',
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
        col: 6,
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
      name: 'role',
      formItem: {
        tabIndex: 1,
        col: 6,
        rules: [{ type: 'required' }],
      }
    },
    {
      title: t(`user.Description`),
      name: 'description',
      formItem: {
        tabIndex: 1,
        type: 'textarea',
      }
    },
  ]
}
