import { FormModel } from '@models';
import slug from 'slug';

const Column = ({ t, listType }: any) => {
  const col: FormModel[] = [
    {
      title: t('Code.Name'),
      name: 'name',
      formItem: {
        col: 4,
        rules: [{ type: 'required' }],
        onBlur: (e, form) => {
          if (e.target.value && !form.getFieldValue('code')) {
            form.setFieldValue('code', slug(e.target.value).toUpperCase());
          }
        },
      },
    },
    {
      title: t('Code.Type'),
      name: 'type',
      formItem: {
        type: 'select',
        col: 4,
        rules: [{ type: 'required' }],
        list: listType || [],
      },
    },
    {
      title: t('titles.Code'),
      name: 'code',
      formItem: {
        col: 4,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('user.Description'),
      name: 'description',
      formItem: {
        type: 'textarea',
      },
    },
  ];
  return col;
};
export default Column;
