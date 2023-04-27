import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import Action from '../../action';
import Slice, { State } from '../../slice';
import { useAppDispatch, useTypedSelector } from '@reducers';
import { CommonEntity, PaginationQuery, Responses } from '@models';
import { User } from '../../global';

const name = 'SupplierProvince';
export const action = {
  ...new Action<SupplierRole>(name),
  getPermission: createAsyncThunk(name + '/permission', async () =>
    API.get<Responses<string[]>>(`${routerLinks(name, 'api')}/permission`),
  ),
};
console.log("action",action);

export const supplierRoleSlice = createSlice(new Slice<SupplierRole>(action, { keepUnusedDataFor: 9999 }));
export const SupplierRoleFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as State<SupplierRole>),
    set: (values: State<SupplierRole>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<SupplierRole>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState: keyof State<SupplierRole> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: SupplierRole) => dispatch(action.post(values)),
    put: (values: SupplierRole) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
    getPermission: () => dispatch(action.getPermission()),
  };
};
export class SupplierRole extends CommonEntity {
  constructor(
    public name?: string,
    public isSystemAdmin?: boolean,
    public permissions?: string[],
    public users?: User[],
  ) {
    super();
  }
}
