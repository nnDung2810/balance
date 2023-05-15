import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity, PaginationQuery } from '@models';
import { Product } from '@store/product';

const name = 'InventoryProduct';

export const action = new Action<IventoryProduct>(name);

export const inventoryProductSlice = createSlice(new Slice<IventoryProduct>(action));

export const InventoryProductFacade = () => {
    const dispatch = useAppDispatch();
    return {
        ...(useTypedSelector((state) => state[action.name]) as State<IventoryProduct>),
        set: (values: State<IventoryProduct>) => dispatch(action.set(values)),
        get: (params: PaginationQuery<IventoryProduct>) => dispatch(action.get(params)),
    };
};

export class IventoryProduct extends CommonEntity {
    constructor(
        public inventory: IventoryProduct1[]
    ) {
        super();
    }
}
export class IventoryProduct1 extends CommonEntity {
    constructor(
        public category?: string,
        public inventoryPrice?: string,
        public numberInBal?: string,
        public numberInKiot?: string,
        public productCode?: string,
        public productId?: string,
        public productName?: string,
        public storeBarcode?: string,
        public supplierBarcode?: string,
        public supplierName?: string,
        public units?: {
          value?: string;
          name?: string;
          isDefault?: boolean
        },
        public id?: string,
        public iventory?: Product,
    ) {
        super();
    }
}


