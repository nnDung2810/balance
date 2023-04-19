import { createSlice } from '@reduxjs/toolkit';

import Action from '../action';
import Slice, { State } from '../slice';
import { useAppDispatch, useTypedSelector } from '@reducers';
import { CommonEntity, PaginationQuery } from '@models';
import { CodeType } from './type';
import { User } from '../global';

const name = 'Code';
const action = new Action<Code>(name);
export const codeSlice = createSlice(new Slice<Code>(action));
export const CodeFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as State<Code>),
    set: (values: State<Code>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<Code>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState: keyof State<Code> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: Code) => dispatch(action.post(values)),
    put: (values: Code) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};
export class Code extends CommonEntity {
  constructor(
    public code?: string,
    public type?: string,
    public name?: string,
    public description?: string,
    public item?: CodeType,
    public users?: User[],
  ) {
    super();
  }
}
