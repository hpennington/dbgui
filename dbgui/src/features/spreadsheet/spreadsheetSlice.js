import { createSlice } from '@reduxjs/toolkit'

export const spreadsheetSlice = createSlice({
  name: 'spreadsheet',
  initialState: {
    columns: [],
    rows: [],
  },
  reducers: {
    setColumns: (state, action) => {
      state.columns = action.payload.columns
    },
    setRows: (state, action) => {
      state.rows = action.payload.rows
    },
  },
})

export const { setColumns, setRows } = spreadsheetSlice.actions

export default spreadsheetSlice.reducer
