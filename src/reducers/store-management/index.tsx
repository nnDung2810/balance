import { AsyncThunk, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import { Message } from '@components/message';
import Action from '../action';
import Slice, { State } from '../slice';
import { useAppDispatch, useTypedSelector } from '@reducers';
import { CommonEntity, PaginationQuery } from '@models';
import { District } from '../address/district';
import { Province } from '../address/province';
import { Ward } from '../address/ward';

const name = 'sub-organization';

export const action = {
  ...new Action<StoreManagement>(name),
  getById1: createAsyncThunk(name + '/getById', async ( { id, keyState = 'isVisible' }: { id: string; keyState: keyof State<StoreManagement> }) => {
      const data = await API.get<StoreManagement>(`${routerLinks(name, 'api')}/detail/${id}`);
      return { data, keyState };
    }),
  // post: createAsyncThunk(name + '/post', async (values: StoreManagement) => {
  //   // if (values.avatar) values.avatar = values.avatar[0].url;
  //   const { data, message } = await API.post<StoreManagement>(routerLinks(name, 'api'), values);
  //   if (message) await Message.success({ text: message });
  //   return data;
  // }),
  // put: createAsyncThunk(name + '/put', async ({ id, ...values }: StoreManagement) => {
  //   // if (values.avatar) values.avatar = values.avatar[0].url;
  //   const { data, message } = await API.put<StoreManagement>(`${routerLinks(name, 'api')}/${id}`, values);
  //   if (message) await Message.success({ text: message });
  //   return data;
  // }),
};
// export const storeSlice = createSlice(new Slice<StoreManagement>(action));
export const storeSlice = createSlice(
  new Slice<StoreManagement>(action, (builder: any) => {
    builder
      .addCase(action.getById1.pending, (state: State<StoreManagement>) => {
        state.isLoading = true;
        state.status = 'getById.pending';
      })
      .addCase(action.getById1.fulfilled, (state: State<StoreManagement>, action: PayloadAction<{ data: StoreManagement; keyState: keyof State<StoreManagement> }>) => {
        if (action.payload) {
          const { data, keyState } = action.payload;
          if (JSON.stringify(state.data) !== JSON.stringify(data)) state.data = data;
          state[keyState] = true;
          state.status = 'getById.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })
  }),
);

export const StoreFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<StoreManagement>),
    set: (values: State<StoreManagement>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<StoreManagement>) => dispatch(action.get(params)),
    getById1: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<StoreManagement> }) =>
      dispatch(action.getById1({ id, keyState })),
    post: (values: StoreManagement) => dispatch(action.post(values)),
    put: (values: StoreManagement) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};

export class StoreManagement extends CommonEntity {
  constructor(
    public code?: string,
    public id?: string,
    public isActive? : boolean,
    public isMain?: boolean,
    public name?: string,
    public note?: string,
    // public address?: {
    //    districtId?: string,
    //    district?: District
    //    id?: string,
    //    postCode?: string,
    //    provinceId?: string,
    //    province?: Province,
    //    street?: string,
    //    ward?: Ward,
    //    wardId?: string
    // },
    // public userRole?: string,
    // public contract?: string
  ) {
    super();
  }
}

