import { createSlice } from '@reduxjs/toolkit'

export const spreadsheetSlice = createSlice({
  name: 'spreadsheet',
  initialState: {
    columns: [],
    rows: [],
    tableLength: 0,
  },
  reducers: {
    setColumns: (state, action) => {
      state.columns = action.payload.columns
    },
    setRows: (state, action) => {
      state.rows = action.payload.rows
    },
    setTableLength: (state, action) => {
      state.tableLength = action.payload.length
    },
  },
})

export const { setColumns, setRows, setTableLength } = spreadsheetSlice.actions

export default spreadsheetSlice.reducer
