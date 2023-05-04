import { FormModel } from "@models";

export const ColumnOTP = () => {
    const col: FormModel[] = [
        {
            name: 'otp',
            title: 'Mã OTP',
            formItem: {
                placeholder: 'Mã OTP',
                rules: [{ type: 'required' }, { type: 'min', value: 6 }, { type: 'max', value: 6 }],
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