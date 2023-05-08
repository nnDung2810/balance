import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity, PaginationQuery, Responses } from '@models';

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
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState: keyof State<UserRole> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: UserRole) => dispatch(action.post(values)),
    put: (values: UserRole) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
    getPermission: () => dispatch(action.getPermission()),
  };
};
export class UserRole extends CommonEntity {
  constructor(
    public id?: string,
    public code?: string,
    public name?: string,
    public description?: string,
  ) {
    super();
  }
}
