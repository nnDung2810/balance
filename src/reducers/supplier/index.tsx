import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import { Message } from '@components';
import Action from '../action';
import Slice, { State } from '../slice';
import { useAppDispatch, useTypedSelector } from '@reducers';
import { CommonEntity, PaginationQuery } from '@models';

const name = 'Supplier';
export const action = {
  ...new Action<Supplier>(name),
  getById: createAsyncThunk(
      name + '/getById',
      async ({ id, keyState = 'isVisible' }: { id: string; keyState: keyof State<Supplier> }) => {
        const { data } = await API.get<Supplier>(`${routerLinks(name, 'api')}/detail/${id}`);
        return { data, keyState };
      },
    ),
  // post: createAsyncThunk(name + '/post', async (values: Supplier) => {
  //   // if (values.avatar) values.avatar = values.avatar[0].url;
  //   const { data, message } = await API.post<Supplier>(routerLinks(name, 'api'), values);
  //   if (message) await Message.success({ text: message });
  //   return data;
    
  // }),
  // put: createAsyncThunk(name + '/put', async ({ id, ...values }: Supplier) => {
  //   // if (values.avatar) values.avatar = values.avatar[0].url;
  //   const { data, message } = await API.put<Supplier>(`${routerLinks(name, 'api')}/detail/${id}`, values);
  //   if (message) await Message.success({ text: message });
  //   return data;
  // }),
};
export const supplierSlice = createSlice(new Slice<Supplier>(action));
// createSlice(
//   new Slice<Supplier>(action, (builder: any) => {
//     builder
//       .addCase(action.getById.pending, (state: State<Supplier>) => {
//         state.isLoading = true;
//         state.status = 'getById.pending';
//       })
//       .addCase(action.getById.fulfilled, (state: State<Supplier>, action: PayloadAction<State<Supplier>>) => {
//         state.data = action.payload.data;
//         state.isLoading = false;
//         state.isVisibleReject = false;
//         state.isVisibleDetail = false;
//         state.status = 'getById.fulfilled';
//       })
//   }),
// );

export const SupplierFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<Supplier>),
    set: (values: State<Supplier>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<Supplier>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<Supplier> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: Supplier) => dispatch(action.post(values)),
    put: (values: Supplier) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};


export class Supplier extends CommonEntity {
  constructor(
    public code?: string,
    public fax?: string,
    public id?: string,
    public informationConnect?: boolean,
    public isActive?: boolean,
    public name?: string,
    public note?: string,
    public storeId?: number,
    public supplierType?: string,
    public type?: string,
    // public address?: {
    //   id?: number;
    //   street?: string;
    // },
    // public userRole?: {},
  ) {
    super();
  }
}


