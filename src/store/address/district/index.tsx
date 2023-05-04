import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
// import {Action} from '../../action';
// import { State } from '@store';
// import { useAppDispatch, useTypedSelector } from '@store';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity, PaginationQuery, Responses } from '@models';


const name = 'District';
export const action = {
  ...new Action<District>(name),
  getDistrict: createAsyncThunk(
    name + '/get',
    // async ({params, provinceCode }: {params?: PaginationQuery<District>, provinceCode: string}) => await API.get(`${routerLinks(name, 'api')}/${provinceCode}, ${params}`),
     async (provinceCode: string) => await API.get(`${routerLinks(name, 'api')}/${provinceCode}`)
      // const { data } = await API.get(`${routerLinks(name, 'api')}/${provinceCode}`)
      // console.log(data)
      // return data
    
  )
};
export const districtSlice = createSlice(new Slice<District>(action, (buider: any) => {
  buider
  .addCase(
    action.get.pending,
    (
      state: State<District>,
      action: PayloadAction<undefined, string, { arg: District; requestId: string; requestStatus: 'pending' }>,
    ) => {
      state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
      state.queryParams = JSON.stringify(action.meta.arg);
      state.isLoading = true;
      state.status = 'get.pending';
    },
  )
  .addCase(action.get.fulfilled, (state: State<District>, action: PayloadAction<Responses<District[]>>) => {
    if (action.payload.data) {
      console.log(action.payload)
      state.result = action.payload;
      state.status = 'get.fulfilled';
    } else state.status = 'idle';
    state.isLoading = false;
  })
}));

export const DistrictFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as State<District>),
    set: (values: State<District>) => dispatch(action.set(values)),
    get: (provinceCode: string) => dispatch(action.getDistrict( provinceCode)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState: keyof State<District> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: District) => dispatch(action.post(values)),
    put: (values: District) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};
export class District extends CommonEntity {
  constructor(
    public id?: string,
    public code?: string,
    public name?: string,
    public provinceCode?: string,
  ) {
    super();
  }
}
