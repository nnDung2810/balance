import { PayloadAction } from '@reduxjs/toolkit';
export default class Slice {
  name: string;
  initialState: any;
  reducers: any;
  extraReducers: any;
  defaultState: State = {
    result: {},
    data: {},
    isLoading: false,
    isVisible: false,
    status: 'idle',
    keyList: 'result',
    queryParams: '',
    keepUnusedDataFor: 60,
    time: 0,
  };
  constructor(action: any, initialState: object = {}, extraReducers = (builder: any) => builder) {
    this.name = action.name;
    this.initialState = { ...this.defaultState, ...initialState };
    this.reducers = {};
    this.extraReducers = (builder: any) => {
      builder
        .addCase(action.set.fulfilled, (state: State, action: PayloadAction<object>) => {
          Object.keys(action.payload).forEach((key) => {
            // @ts-ignore
            state[key] = action.payload[key];
          });
        })
        .addCase(action.get.pending, (state: State, action: any) => {
          if (action.meta.arg.keyList) {
            state.keyList = action.meta.arg.keyList;
            delete action.meta.arg.keyList;
          }
          state.time = new Date().getTime() + state.keepUnusedDataFor * 1000;
          state.queryParams = JSON.stringify(action.meta.arg);
          state.isLoading = true;
          state.status = 'get.pending';
        })
        .addCase(action.get.fulfilled, (state: State, action: PayloadAction<object>) => {
          if (action.payload) {
            // @ts-ignore
            state[state.keyList] = action.payload;
            state.status = 'get.fulfilled';
          } else state.status = 'idle';
          state.isLoading = false;
        })

        .addCase(action.getById.pending, (state: State) => {
          state.isLoading = true;
          state.status = 'getById.pending';
        })
        .addCase(action.getById.fulfilled, (state: State, action: PayloadAction<{ data: any; keyState: string }>) => {
          if (action.payload) {
            const { data, keyState } = action.payload;
            if (JSON.stringify(state.data) !== JSON.stringify(data)) state.data = data;
            // @ts-ignore
            state[keyState] = true;
            state.status = 'getById.fulfilled';
          } else state.status = 'idle';
          state.isLoading = false;
        })

        .addCase(action.post.pending, (state: State, action: any) => {
          state.data = action.meta.arg;
          state.isLoading = true;
          state.status = 'post.pending';
        })
        .addCase(action.post.fulfilled, (state: State, action: PayloadAction<object>) => {
          if (action.payload) {
            state.data = {};
            state.isVisible = false;
            state.status = 'post.fulfilled';
          } else state.status = 'idle';
          state.isLoading = false;
        })

        .addCase(action.put.pending, (state: State, action: any) => {
          state.data = action.meta.arg;
          state.isLoading = true;
          state.status = 'put.pending';
        })
        .addCase(action.put.fulfilled, (state: State, action: PayloadAction<object>) => {
          if (action.payload) {
            state.data = {};
            state.isVisible = false;
            state.status = 'put.fulfilled';
          } else state.status = 'idle';
          state.isLoading = false;
        })

        .addCase(action.delete.pending, (state: State) => {
          state.isLoading = true;
          state.status = 'delete.pending';
        })
        .addCase(action.delete.fulfilled, (state: State, action: PayloadAction<object>) => {
          if (action.payload) state.status = 'delete.fulfilled';
          else state.status = 'idle';
          state.isLoading = false;
        });
      extraReducers(builder);
    };
  }
}
export interface State {
  result: any;
  data: any;
  isLoading: boolean;
  isVisible: boolean;
  status: string;
  keyList: string;
  queryParams: string;
  keepUnusedDataFor: number;
  time: number;
}
