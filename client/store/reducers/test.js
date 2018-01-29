import {Map} from 'immutable'
const TEST = "TEST"

const testAction = (payload) => ({
  type: TEST
  ,payload
})

export default function(state = Map({}), action) {
  switch(action.type){
    case TEST:
      return action.payload

    default:
      return state
  }
}