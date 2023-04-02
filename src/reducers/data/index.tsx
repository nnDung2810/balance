import { createSlice } from '@reduxjs/toolkit';

import Action from '../action';
import Slice from '../slice';

const action = new Action('Data');
export const dataAction = {
  ...action,
};

const slice = new Slice(dataAction);
export const dataSlice = createSlice({ ...slice });
