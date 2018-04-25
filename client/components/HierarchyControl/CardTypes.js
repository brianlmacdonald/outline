import {
  PROJECT_NAV,
  ACT_NAV,
  SEQUENCE_NAV,
  SCENE_NAV,
  BEAT_NAV
} from '../../store';

export const PROJECT_TYPE = 'PROJECT_TYPE';
export const ACT_TYPE = 'ACT_TYPE';
export const SEQUENCE_TYPE = 'SEQUENCE_TYPE';
export const SCENE_TYPE = 'SCENE_TYPE';
export const BEAT_TYPE = 'BEAT-TYPE';

export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_ACTS = 'GET_ACTS';
export const GET_SEQUENCES = 'GET_SEQUENCES';
export const GET_SCENES = 'GET SCENES';
export const GET_BEATS = 'GET BEATS';

export const TYPE_TO_NAV = {
  PROJECT_TYPE: PROJECT_NAV,
  ACT_TYPE: ACT_NAV,
  SEQUENCE_TYPE: SEQUENCE_NAV,
  SCENE_TYPE: SCENE_NAV,
  BEAT_TYPE: BEAT_NAV,
};

export const CLASS_NAME_OBJ = {
  PROJECT_TYPE: 'project',
  ACT_TYPE: 'act',
  SEQUENCE_TYPE: 'sequence',
  SCENE_TYPE: 'scene',
  BEAT_TYPE: 'beat'
};
