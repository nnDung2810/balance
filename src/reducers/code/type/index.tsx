import { createSlice } from '@reduxjs/toolkit';
import Action from '../../action';
import Slice from '../../slice';

const action = new Action('CodeType');
export const codeTypeAction = {
  ...action,
};
const slice = new Slice(codeTypeAction, { keepUnusedDataFor: 9999 });
export const codeTypeSlide = createSlice({ ...slice });
