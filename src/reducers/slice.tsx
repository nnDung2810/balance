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
    keyIsLoading: 'isLoading',
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
        .addCase(
          action.isVisible.fulfilled,
          (state: State, action: PayloadAction<boolean | { isVisible: boolean; data: object }>) => {
            if (typeof action.payload === 'boolean') {
              state.isVisible = action.payload;
            } else {
              if (JSON.stringify(state.data) !== JSON.stringify(action.payload.data)) state.data = action.payload.data;
              state.isVisible = action.payload.isVisible;
            }
          },
        )
        .addCase(action.get.pending, (state: State, action: any) => {
          if (action.meta.arg.keyList) {
            state.keyList = action.meta.arg.keyList;
            delete action.meta.arg.keyList;
          }
          if (action.meta.arg.keyIsLoading) {
            state.keyIsLoading = action.meta.arg.keyIsLoading;
            delete action.meta.arg.keyIsLoading;
          }
          state.time = new Date().getTime() + state.keepUnusedDataFor * 1000;
          state.queryParams = JSON.stringify(action.meta.arg);
          // @ts-ignore
          state[state.keyIsLoading] = true;
          state.status = 'get.pending';
        })
        .addCase(action.get.fulfilled, (state: State, action: PayloadAction<any[]>) => {
          // @ts-ignore
          state[state.keyList] = action.payload;
          // @ts-ignore
          state[state.keyIsLoading] = false;
          state.keyList = 'result';
          state.keyIsLoading = 'isLoading';
          state.status = 'get.fulfilled';
        })
        .addCase(action.get.rejected, (state: State) => {
          // @ts-ignore
          state[state.keyIsLoading] = false;
          state.keyList = 'result';
          state.keyIsLoading = 'isLoading';
          state.status = 'get.rejected';
        })

        .addCase(action.getById.pending, (state: State) => {
          state.isLoading = true;
          state.status = 'getById.pending';
        })
        .addCase(action.getById.fulfilled, (state: State, action: PayloadAction<{ data: any; keyState: string }>) => {
          const { data, keyState } = action.payload;
          if (JSON.stringify(state.data) !== JSON.stringify(data)) state.data = data;
          state.isLoading = false;
          // @ts-ignore
          state[keyState as keyof State] = true;
          state.status = 'getById.fulfilled';
        })
        .addCase(action.getById.rejected, (state: State) => {
          state.isLoading = false;
          state.status = 'getById.rejected';
        })

        .addCase(action.post.pending, (state: State) => {
          state.isLoading = true;
          state.status = 'post.pending';
        })
        .addCase(action.post.fulfilled, (state: State, action: PayloadAction<any>) => {
          state.data = action.payload.data;
          state.isLoading = false;
          state.isVisible = false;
          state.status = 'post.fulfilled';
        })
        .addCase(action.post.rejected, (state: State) => {
          state.isLoading = false;
          state.status = 'post.rejected';
        })

        .addCase(action.put.pending, (state: State) => {
          state.isLoading = true;
          state.status = 'put.pending';
        })
        .addCase(action.put.fulfilled, (state: State, action: PayloadAction<any>) => {
          state.data = action.payload.data;
          state.isLoading = false;
          state.isVisible = false;
          state.status = 'put.fulfilled';
        })
        .addCase(action.put.rejected, (state: State) => {
          state.isLoading = false;
          state.status = 'put.rejected';
        })

        .addCase(action.delete.pending, (state: State) => {
          state.isLoading = true;
          state.status = 'delete.pending';
        })
        .addCase(action.delete.fulfilled, (state: State, action: PayloadAction<any>) => {
          state.data = action.payload;
          state.isLoading = false;
          state.status = 'delete.fulfilled';
        })
        .addCase(action.delete.rejected, (state: State) => {
          state.isLoading = false;
          state.status = 'delete.rejected';
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
  keyIsLoading: string;
  queryParams: string;
  keepUnusedDataFor: number;
  time: number;
}
