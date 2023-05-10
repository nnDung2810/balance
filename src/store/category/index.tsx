import { createSlice } from '@reduxjs/toolkit';

import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity, PaginationQuery } from '@models';

const name = 'Category';

export const action = new Action<Category>(name);

export const categorySlice = createSlice(new Slice<Category>(action));

export const CategoryFacade = () => {
    const dispatch = useAppDispatch();
    return {
        ...(useTypedSelector((state) => state[action.name]) as State<Category>),
        set: (values: State<Category>) => dispatch(action.set(values)),
        get: (params: PaginationQuery<Category>) => dispatch(action.get(params)),
        getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<Category> }) =>
            dispatch(action.getById({ id, keyState })),
        post: (values: Category) => dispatch(action.post(values)),
        put: (values: Category) => dispatch(action.put(values)),
        delete: (id: string) => dispatch(action.delete(id)),
    };
};

export class Category extends CommonEntity {
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

