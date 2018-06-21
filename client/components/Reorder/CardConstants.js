'use strict';
import {
  PROJECT_TYPE,
  ACT_TYPE,
  SEQUENCE_TYPE,
  SCENE_TYPE,
  BEAT_TYPE
} from 'APP/client/store/reducers/project';

const ACCEPTS_NOTHING = 'ACCEPTS_NOTHING';

export default {
  PROJECT_TYPE: [ACT_TYPE, SEQUENCE_TYPE, SCENE_TYPE, BEAT_TYPE],
  ACT_TYPE: [ACT_TYPE, SEQUENCE_TYPE],
  SEQUENCE_TYPE: [SEQUENCE_TYPE, SCENE_TYPE],
  SCENE_TYPE: [SCENE_TYPE, BEAT_TYPE],
  BEAT_TYPE: [BEAT_TYPE, ACCEPTS_NOTHING]
};
