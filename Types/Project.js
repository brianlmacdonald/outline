// @flow
'use strict';
type Title = string;
type Body = string;
type Acts = Iterable<Object>
type ID = string | number;
type Type = string;
type Keys = string;
export type ProjectNode = {
  title: Title,
  body: Body,
  acts: Acts,
  id: ID,
  type: Type,
}
export type ProjectArray = Array<ProjectNode>;
export type ProjectError = Object;
export type ProjectPath = string;
export type ProjectPathArray = Array<ProjectPath>;
