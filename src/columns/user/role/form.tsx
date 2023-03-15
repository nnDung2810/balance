import { FormModel } from '@models';

const Column = ({ t, listPermission }: any) => {
  const col: FormModel[] = [
    {
      title: t('Name'),
      name: 'name',
      formItem: {
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Is System Admin'),
      name: 'isSystemAdmin',
      formItem: {
        type: 'switch',
      },
    },
    {
      title: t('Permissions'),
      name: 'permissions',
      formItem: {
        type: 'select',
        mode: 'multiple',
        list: listPermission.map((item: any) => ({ value: item, label: item })),
      },
    },
  ];
  return col;
};
export default Column;
