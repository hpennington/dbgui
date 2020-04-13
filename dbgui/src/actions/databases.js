import { makeActionCreator } from './utils'

export const SET_DATABASES = 'SET_DATABASES'

export const setDatabases = makeActionCreator(SET_DATABASES, 'names')

export const SET_DATABASE = 'SET_DATABASE'

export const setDatabase = makeActionCreator(SET_DATABASE, 'name')

export const SET_TABLES = 'SET_TABLES'
export const setTables = makeActionCreator(SET_TABLES, 'database', 'tables')

export const SET_TABLE = 'SET_TABLE'
export const setTable = makeActionCreator(SET_TABLE, 'name')
