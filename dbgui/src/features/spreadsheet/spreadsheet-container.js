import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Spreadsheet from './spreadsheet'

function SpreadsheetContainer(props) {
  return (
    <Spreadsheet columns={props.columns} rows={props.rows} />
  )
}

const mapStateToProps = state => {
  const columns = state.spreadsheet.columns
  const rows = state.spreadsheet.rows

  console.log(columns)

  return {
    columns,
    rows,
  }
}

export default connect(mapStateToProps)(SpreadsheetContainer)
