import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import Action from '../../action';
import Slice, { State } from '../../slice';
import { useAppDispatch, useTypedSelector } from '@reducers';
import { CommonEntity, PaginationQuery, Responses } from '@models';
import { User } from '../../global';

export const name = 'Province';
export const action = {
  ...new Action<Province>(name),
  getById: createAsyncThunk(
      name + '/getById',
      async ({ id, keyState = 'isVisible' }: { id: string; keyState: keyof State<Province> }) => {
        const { data } = await API.get<Province>(`${routerLinks(name, 'api')}/${id}`);
        return { data, keyState };
      },
    ),
};

// export const provinceSlice = createSlice(new Slice<Province>(action, { keepUnusedDataFor: 9999 }));
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
    public  code?: string,
    public  id?: string,
    public  name?: string,
  ) {
    super();
  }
}



