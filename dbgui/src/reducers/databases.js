import { SET_DATABASES, SET_TABLES } from '../actions/databases'

export const databases = (state = [], action) => {
  switch (action.type) {
    case SET_DATABASES:
      return action.names.map(name => ({name: name, tables: []}))
    case SET_TABLES:
      const database = action.database
      console.log(action.tables)
      const selectedDatabase = state.find(db => db.name === database)
      selectedDatabase.tables = action.tables
      return [
        ...state.filter(db => db.name !== database),
        selectedDatabase
      ]
    default:
      return state
  }
}

export default databases
