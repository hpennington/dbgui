import { combineReducers } from 'redux'
import { databases } from '../reducers/databases'
import { SET_DATABASE, SET_TABLE } from '../actions/databases'

const database = (state = null, action) => {
  switch (action.type) {
    case SET_DATABASE:
      return action.name
    default:
      return state
  }
}

const table = (state = null, action) => {
  switch (action.type) {
    case SET_TABLE:
      return action.name
    default:
      return state
  }
}

const rootReducer = combineReducers({
  databases,
  database,
  table,
})

export default rootReducer

