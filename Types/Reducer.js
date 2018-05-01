// @flow
import type { ProjectNode } from './Project';
export type Dispatch = Function;
export type Action =  Object;
export type Keys = string
export type Values = {
  isFetching: boolean,
  userProjects: Iterable<ProjectNode>
}
export type State = {
  +setIn: Function,
  +set: Function,
  +getIn: Function,
  +get: Function,
  +deleteIn: Function,
  +clear: Function,
  +withMutations: Function,
};
export type Reducer = (state: State, action: Action) => Object;
