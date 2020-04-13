import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Spreadsheet from '../components/spreadsheet'

function SpreadsheetContainer(props) {
  const [columns, setColumns] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (mounted === false) {
      fetch('http://localhost:3000/table?table='
        + props.table + '&database='
        + props.database,
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'api_key': process.env.REACT_APP_API_KEY}),
      }).then(res => res.json())
        .then(res => setColumns(res.columns))
        .catch(err => window.alert(err))

      setMounted(true)
    }
  })

  if (props.table === null) {
    return (
      <Spreadsheet columns={['Tables']} rows={props.tables} />
    )
} else {
    return (
      <Spreadsheet columns={columns} rows={[]} />
    )
  }

}

const mapStateToProps = state => {
  const table = state.table
  var tables = state.databases.find(db => db.name === state.database)
  tables = tables === undefined ? [] : tables.tables
  const database = state.database

  return {
    table,
    tables,
    database,
  }
}

export default connect(mapStateToProps)(SpreadsheetContainer)
