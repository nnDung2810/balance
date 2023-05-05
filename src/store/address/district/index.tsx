import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API, routerLinks } from '@utils';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity } from '@models';


const name = 'District';
export const action = {
  ...new Action<District>(name),
  getDistrict: createAsyncThunk(
    name + '/get',
    async (provinceCode: string) => await API.get(`${routerLinks(name, 'api')}/${provinceCode}`)
  )
};

export const districtSlice = createSlice(new Slice<District>(action));

export const DistrictFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as State<District>),
    get: (provinceCode: string) => dispatch(action.getDistrict(provinceCode)),
  };
};
export class District extends CommonEntity {
  constructor(
    public id?: string,
    public code?: string,
    public name?: string,
  ) {
    super();
  }
}
