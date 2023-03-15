import slug from 'slug';
import { FormModel } from '@models';

const Column = ({ t }: any) => {
  const col: FormModel[] = [
    {
      title: t('Name'),
      name: 'name',
      formItem: {
        rules: [{ type: 'required' }],
        onBlur: (e, form) => {
          if (e.target.value && !form.getFieldValue('code')) {
            form.setFieldValue('code', slug(e.target.value));
          }
        },
      },
    },
    {
      title: t('Code'),
      name: 'code',
      formItem: {
        disabled: (values: any) => !!values?.code,
        rules: [{ type: 'required' }],
      },
    },
  ];
  return col;
};
export default Column;
