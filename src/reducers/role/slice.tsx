import { createSlice } from '@reduxjs/toolkit';
import action from './action';
import Slice from '../slice';

export const slice = new Slice(action, {keepUnusedDataFor: 9999});
export default createSlice({...slice});
