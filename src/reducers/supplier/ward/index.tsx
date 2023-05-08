import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import Action from '../../action';
import Slice, { State } from '../../slice';
import { useAppDispatch, useTypedSelector } from '@reducers';
import { CommonEntity, PaginationQuery, Responses } from '@models';
import { User } from '../../global';

export const name = 'Ward';
export const action = {
  ...new Action<Ward>(name),
  getById: createAsyncThunk(
      name + '/getById',
      async ({ wardId, keyState = 'isVisible' }: { wardId: string; keyState: keyof State<Ward> }) => {
        const  data  = await API.get<Ward>(`${routerLinks(name, 'api')}/${wardId}`);
        return { data, keyState };
      },
    ),
};

// export const wardSlice = createSlice(new Slice<Ward>(action, { keepUnusedDataFor: 9999 }));
export const wardSlice = createSlice(new Slice<Ward>(action));
export const WardFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as State<Ward>),
    set: (values: State<Ward>) => dispatch(action.set(values)),
    // get: (params: PaginationQuery<Ward>) => dispatch(action.get(params)),
    getById: ({ wardId, keyState = 'isVisible' }: { wardId: string; keyState?: keyof State<Ward> }) =>
      dispatch(action.getById({ wardId, keyState })),
    post: (values: Ward) => dispatch(action.post(values)),
    put: (values: Ward) => dispatch(action.put(values)),
    delete: (wardId: string) => dispatch(action.delete(wardId)),
  };
};
export class Ward extends CommonEntity {
  constructor(
    public  code?: string,
    public  id?: string,
    public  name?: string,
    public  districtCode?: string,
  ) {
    super();
  }
}
