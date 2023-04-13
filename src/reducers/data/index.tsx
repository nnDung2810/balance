import { createSlice } from '@reduxjs/toolkit';

import Action from '../action';
import Slice from '../slice';
import { useAppDispatch, useTypedSelector } from '@reducers';

const action = new Action('Data');
export const dataSlice = createSlice(new Slice(action));
export const DataFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state: any) => state[action.name]),
    set: (values: any) => dispatch(action.set(values)),
    get: (params = {}) => dispatch(action.get(params)),
    getById: (value: { id: string; keyState?: string }) => dispatch(action.getById(value)),
    post: (values: any) => dispatch(action.post(values)),
    put: (values: any) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};
