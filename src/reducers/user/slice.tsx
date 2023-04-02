import { createSlice } from '@reduxjs/toolkit';
import action from './action';
import Slice from '../slice';
export const slice = new Slice(action);
export default createSlice({...slice});
