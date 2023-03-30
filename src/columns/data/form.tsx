import { FormModel } from '@models';
import slug from 'slug';

const Column = ({ t, listType }: any) => {
  const col: FormModel[] = [
    {
      title: t('Data.Type'),
      name: 'type',
      formItem: {
        type: 'select',
        col: 4,
        rules: [{ type: 'required' }],
        list: listType || [],
      },
    },
    {
      title: t('Data.Order'),
      name: 'order',
      formItem: {
        col: 4,
        type: 'number',
      },
    },
    {
      title: t('Data.Created At'),
      name: 'createdAt',
      formItem: {
        col: 4,
        type: 'date',
      },
    },
    {
      title: t('Data.Image'),
      name: 'image',
      formItem: {
        type: 'upload',
        mode: 'multiple',
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
            title: t('Name'),
            name: 'name',
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
            title: t('Slug'),
            name: 'slug',
            formItem: {
              col: 6,
            },
          },
          {
            title: t('Description'),
            name: 'description',
            formItem: {
              type: 'textarea',
            },
          },
          {
            name: 'seoTitle',
            title: 'SEO Title',
            formItem: {
              col: 6,
            },
          },
          {
            name: 'seoDescription',
            title: 'SEO Description',
            formItem: {
              col: 6,
            },
          },

          {
            title: t('Content'),
            name: 'content',
            formItem: {
              type: 'editor',
            },
          },
        ],
      },
    },
  ];
  return col;
};
export default Column;
