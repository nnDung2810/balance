import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import Action from '../../action';
import Slice, { State } from '../../slice';
import { useAppDispatch, useTypedSelector } from '@reducers';
import { CommonEntity, PaginationQuery, Responses } from '@models';


const name = 'Ward';
export const action = {
  ...new Action<Ward>(name),
  getWard: createAsyncThunk(
    name + '/get',
    // async ({params, provinceCode }: {params?: PaginationQuery<District>, provinceCode: string}) => await API.get(`${routerLinks(name, 'api')}/${provinceCode}, ${params}`),
     async (districCode: string) => await API.get(`${routerLinks(name, 'api')}/${districCode}`),
  )
};
export const wardSlice = createSlice(new Slice<Ward>(action));
export const WardFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as State<Ward>),
    set: (values: State<Ward>) => dispatch(action.set(values)),
    get: (districCode: string) => dispatch(action.getWard( districCode)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState: keyof State<Ward> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: Ward) => dispatch(action.post(values)),
    put: (values: Ward) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};
export class Ward extends CommonEntity {
  constructor(
    public id?: string,
    public code?: string,
    public name?: string,
    public districtCode?: string,
  ) {
    super();
  }
}
