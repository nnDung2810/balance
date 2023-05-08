import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API, routerLinks } from '@utils';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity } from '@models';

const name = 'Ward';
export const action = {
  ...new Action<Ward>(name),
  getWard: createAsyncThunk(
    name + '/get',
    async (districCode: string) => await API.get(`${routerLinks(name, 'api')}/${districCode}`),
  )
};

export const wardSlice = createSlice(new Slice<Ward>(action));

export const WardFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as State<Ward>),
    get: (districCode: string) => dispatch(action.getWard(districCode)),
  };
};
export class Ward extends CommonEntity {
  constructor(
    public id?: string,
    public code?: string,
    public name?: string,
  ) {
    super();
  }
}
