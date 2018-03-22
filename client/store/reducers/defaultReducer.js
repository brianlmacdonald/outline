import {Map} from 'immutable';
const SOME_THING = 'SOME_THING';

const someThingAction = (payload) => ({
  type: SOME_THING
  ,payload
});

export default function(state = Map({}), action) {
  switch(action.type){
    case SOME_THING:
      return state.mergeDeep(action.payload);

    default:
      return state;
  }
}