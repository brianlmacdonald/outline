import {Map} from 'immutable'
const TEST = "TEST"

const testAction = (payload) => ({
  type: TEST
  ,payload
})

const state = Map({})

export default function(state, action) {
  switch(action.type){
    case TEST:
      return action.payload

    default:
      return state
  }
}