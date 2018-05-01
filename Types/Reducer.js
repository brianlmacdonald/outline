// @flow

export type Dispatch = Function;
export type Action =  Object;
export type State = Object;
export type Reducer = (state: State, action: Action) => void;
