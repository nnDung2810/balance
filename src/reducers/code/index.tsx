import { createSlice } from '@reduxjs/toolkit';

import Action from '../action';
import Slice from '../slice';

const action = new Action('Code');
export const codeAction = {
  ...action,
};

const slice = new Slice(codeAction);
export const codeSlide = createSlice({ ...slice });
