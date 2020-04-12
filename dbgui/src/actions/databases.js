import { makeActionCreator } from './utils'

export const SET_DATABASES = 'SET_DATABASES'

export const setDatabases = makeActionCreator(SET_DATABASES, 'names')

export const SET_TABLES = 'SET_DATABLES'
export const setTables = makeActionCreator(SET_TABLES, 'database', 'tables')
