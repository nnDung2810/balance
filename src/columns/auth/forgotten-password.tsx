import { FormModel } from '@models';

const Column = ({ t }: any) => {
  const col: FormModel[] = [
    {
      name: 'email',
      title: 'Email',
      formItem: {
        placeholder: 'Email',
        rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
      },
    },
  ];
  return col;
};
export default Column;
