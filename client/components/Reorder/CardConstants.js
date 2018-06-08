'use strict';
import {
  ACT_TYPE,
  SEQUENCE_TYPE,
  SCENE_TYPE,
  BEAT_TYPE
} from 'APP/client/store/reducers/project';

export default {
  ACT_TYPE: [ACT_TYPE, SEQUENCE_TYPE],
  SEQUENCE_TYPE: [SEQUENCE_TYPE, SCENE_TYPE],
  SCENE_TYPE: [SCENE_TYPE, BEAT_TYPE],
  BEAT_TYPE: BEAT_TYPE
};
