import { FormModel } from "@models";

export const ColumnFormSetPassword = () => {
    const col: FormModel[] = [
        {
            name: 'password',
            title: 'Mật khẩu',
            formItem: {
                placeholder: 'Mật khẩu',
                type: 'password',
                rules: [{ type: 'required' }, { type: 'min', value: 8 }],
            },
        },
        {
            name: 'passwordComfirm',
            title: 'Xác nhận mật khẩu',
            formItem: {
                placeholder: 'Xác nhận mật khẩu',
                type: 'password',
                rules: [
                    {
                        type: 'custom',
                        validator: ({ getFieldValue }) => ({
                            validator(rule, value: string) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Hai mật khẩu không giống nhau!'));
                            },
                        }),
                    },
                    { type: 'required' }, { type: 'min', value: 8 }
                ],
            },
        },
        {
            name: 'uuid',
            formItem: {
                type: 'hidden',
            },
        },
        {
            name: 'email',
            formItem: {
                type: 'hidden',
            },
        },
    ];
    return col;
};