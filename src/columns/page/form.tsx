import slug from 'slug';
import { listStyle } from '@utils';
import { FormModel } from '@models';

const Column = ({ t }: any) => {
  const col: FormModel[] = [
    {
      title: t('Name'),
      name: 'name',
      formItem: {
        col: 6,
        rules: [{ type: 'required' }],
      },
    },
    {
      title: 'Style',
      name: 'style',
      formItem: {
        col: 6,
        type: 'select',
        list: listStyle,
      },
    },
    {
      name: 'translations',
      title: '',
      formItem: {
        type: 'tab',
        tab: {
          label: 'language',
          value: 'language',
        },
        list: [
          { label: 'English', value: 'en' },
          { label: 'Vietnam', value: 'vn' },
        ],
        column: [
          {
            name: 'title',
            title: 'Title',
            formItem: {
              col: 6,
              rules: [{ type: 'required' }],
              onBlur: (e, form, name) => {
                if (e.target.value && !form.getFieldValue(['translations', name[0], 'slug'])) {
                  form.setFieldValue(['translations', name[0], 'slug'], slug(e.target.value));
                }
              },
            },
          },
          {
            name: 'slug',
            title: 'Slug',
            formItem: {
              col: 6,
              rules: [{ type: 'required' }],
            },
          },
          {
            name: 'seoDescription',
            title: 'SEO Description',
            formItem: {},
          },
          {
            title: t('Content'),
            name: 'content',
            formItem: {
              type: 'layout',
            },
          },
        ],
      },
    },
  ];
  return col;
};
export default Column;
