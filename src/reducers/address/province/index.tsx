import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import Action from '../../action';
import Slice, { State } from '../../slice';
import { useAppDispatch, useTypedSelector } from '@reducers';
import { CommonEntity, PaginationQuery, Responses } from '@models';


const name = 'Province';
export const action = {
  ...new Action<Province>(name),
};
export const provinceSlice = createSlice(new Slice<Province>(action));
export const ProvinceFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as State<Province>),
    set: (values: State<Province>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<Province>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState: keyof State<Province> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: Province) => dispatch(action.post(values)),
    put: (values: Province) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};
export class Province extends CommonEntity {
  constructor(
    public id?: string,
    public code?: string,
    public name?: string,
  ) {
    super();
  }
}
