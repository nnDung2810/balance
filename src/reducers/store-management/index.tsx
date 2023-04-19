import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import { Message } from '@components';
import Action from '../action';
import Slice, { State } from '../slice';
import { useAppDispatch, useTypedSelector } from '@reducers';
// import { User } from '../global';
import { CommonEntity, PaginationQuery } from '@models';

const name = 'sub-organization';
export const action = {
  ...new Action<StoreManagement>(name),
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
export const userSlice = createSlice(new Slice<StoreManagement>(action));

export const UserFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<StoreManagement>),
    set: (values: State<StoreManagement>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<StoreManagement>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<StoreManagement> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: StoreManagement) => dispatch(action.post(values)),
    put: (values: StoreManagement) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};

export class StoreManagement extends CommonEntity {
  constructor(
    public code?: string,
    public id?: string,
    public name?: string,
  ) {
    super();
  }
}

