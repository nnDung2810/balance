import { createSlice } from '@reduxjs/toolkit';

import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity, PaginationQuery } from '@models';

const name = 'Invoicekiotviet';

export const action = new Action<Invoicekiotviet>(name);

export const invoicekiotvietSlice = createSlice(new Slice<Invoicekiotviet>(action));

export const invoicekiotvietFacade = () => {
    const dispatch = useAppDispatch();
    return {
        ...(useTypedSelector((state) => state[action.name]) as State<Invoicekiotviet>),
        set: (values: State<Invoicekiotviet>) => dispatch(action.set(values)),
        get: (params: PaginationQuery<Invoicekiotviet>) => dispatch(action.get(params)),
    };
};

export class Invoicekiotviet extends CommonEntity {
    constructor(
        public id?: string,
        public name?: string,
        public code?: string,
        public isActive?: boolean,
        public isParent?: boolean,
        public createdById?: string,
        public orgId?: string,
        public isKiotViet?: boolean,
        public categoryKiotId?: string,
        public parentId?: string,
    ) {
        super();
    }
}

