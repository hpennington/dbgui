import { createSlice } from '@reduxjs/toolkit'

export const navTreeSlice = createSlice({
  name: 'navTree',
  initialState: {
    databases: [],
    selectedDatabase: null,
    tables: new Object(),
  },
  reducers: {
    setSelectedDatabase: (state, action) => {
      state.selectedDatabase = action.payload.selected
    },
    setDatabases: (state, action) => {
      const { databases } = action.payload
      state.databases = databases

      for (const database of databases) {
        state.tables[database] = []
      }
    },
    setTable: (state, action) => {
      const { name, table } = action.payload
      state.tables[name] = table
    },
  },
})

export const { setDatabases, setSelectedDatabase, setTable } = navTreeSlice.actions

export default navTreeSlice.reducer
