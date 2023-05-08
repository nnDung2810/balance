import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import Action from '../../action';
import Slice, { State } from '../../slice';
import { useAppDispatch, useTypedSelector } from '@reducers';
import { CommonEntity, PaginationQuery, Responses } from '@models';
import { User } from '../../global';

export const name = 'District';
export const action = {
  ...new Action<District>(name),
  getById: createAsyncThunk(
      name + '/getById',
      async ({ id, keyState = 'isVisible' }: { id: string; keyState: keyof State<District> }) => {
        const { data } = await API.get<District>(`${routerLinks(name, 'api')}/ward/${id}`);
        return { data, keyState };
      },
    ),
};


// export const districtSlice = createSlice(new Slice<District>(action, { keepUnusedDataFor: 9999 }));
export const districtSlice = createSlice(new Slice<District>(action));
export const DistrictFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as State<District>),
    set: (values: State<District>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<District>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState: keyof State<District> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: District) => dispatch(action.post(values)),
    put: (values: District) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};

export class District extends CommonEntity {
  constructor(
    public  code?: string,
    public  id?: string,
    public  name?: string,
    public  provinceCode?: string,
  ) {
    super();
  }
}
