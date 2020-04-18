import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Spreadsheet from '../components/spreadsheet'

function SpreadsheetContainer(props) {
  if (props.table === null) {
    return (
      <Spreadsheet columns={['Tables']} rows={props.tables} />
    )
  } else {
    return (
      <Spreadsheet columns={props.columns} rows={props.tables} />
    )
  }

}

const mapStateToProps = state => {
  const table = state.table
  var tables = state.databases.find(db => db.name === state.database)
  tables = tables === undefined ? [] : tables.tables
  console.log(tables)
  const database = state.database

  return {
    table,
    tables,
    database,
  }
}

export default connect(mapStateToProps)(SpreadsheetContainer)
