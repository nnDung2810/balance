import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import Action from '../../action';
import Slice, { State } from '../../slice';
import { useAppDispatch, useTypedSelector } from '@reducers';
import { CommonEntity, PaginationQuery, Responses } from '@models';
import { User } from '../../global';

const name = 'UserRole';
export const action = {
  ...new Action<UserRole>(name),
  getPermission: createAsyncThunk(name + '/permission', async () =>
    API.get<Responses<string[]>>(`${routerLinks(name, 'api')}/permission`),
  ),
};
export const userRoleSlice = createSlice(new Slice<UserRole>(action, { keepUnusedDataFor: 9999 }));
export const UserRoleFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as State<UserRole>),
    set: (values: State<UserRole>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<UserRole>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<UserRole> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: UserRole) => dispatch(action.post(values)),
    put: (values: UserRole) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
    getPermission: () => dispatch(action.getPermission()),
  };
};
export class UserRole extends CommonEntity {
  constructor(
    public name?: string,
    public isSystemAdmin?: boolean,
    public permissions?: string[],
    public users?: User[],
  ) {
    super();
  }
}
