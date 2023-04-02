import { createSlice } from '@reduxjs/toolkit';
import Action from '../../action';
import Slice from '../../slice';

const action = new Action('DataType');
export const dataTypeAction = {
  ...action,
};
const slice = new Slice(dataTypeAction, { keepUnusedDataFor: 9999 });
export const dataTypeSlice = createSlice({ ...slice });
