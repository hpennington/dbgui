import React, { useState } from 'react'
import { Pagination } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setColumns, setRows } from './spreadsheetSlice'
import Spreadsheet from './spreadsheet'

function SpreadsheetContainer(props) {
  const [offset, setOffset] = useState(0)

  function onScrollUp() {
    const localOffset = offset - 100
    if (localOffset >= 0) {
      const database = props.database
      const table = props.table

      fetch('http://localhost:3000/table?database='
        + database
        + '&table=' + table
        + '&offset=' + localOffset,
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'api_key': process.env.REACT_APP_API_KEY}),
      }).then(res => res.json())
        .then(res => {
          if (res.columns !== undefined && res.rows !== undefined) {
            props.dispatch(setColumns({columns: res.columns}))
            const newRows = res.rows.map(row => Object.values(row))
            props.dispatch(
              setRows({rows: newRows})
            )
          }

          setOffset(localOffset)
        })
        .catch(err => window.alert(err))
    }

  }

  function onScrollDown() {
    const localOffset = offset + 100
    const database = props.database
    const table = props.table

    fetch('http://localhost:3000/table?database='
      + database
      + '&table=' + table
      + '&offset=' + localOffset,
      {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'api_key': process.env.REACT_APP_API_KEY}),
    }).then(res => res.json())
      .then(res => {
        if (res.columns !== undefined && res.rows !== undefined) {
          props.dispatch(setColumns({columns: res.columns}))
          const newRows = res.rows.map(row => Object.values(row))
          props.dispatch(
            setRows({rows: newRows})
          )
        }

        setOffset(localOffset)
      })
      .catch(err => window.alert(err))
  }

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Spreadsheet
        width={props.width}
        offset={offset}
        scrollUp={onScrollUp}
        scrollDown={onScrollDown}
        columns={props.columns} rows={props.rows} />
        <div style={{
            margin: 'auto'
          }}>
          <Pagination>
            <Pagination.Prev onClick={onScrollUp} />
            <Pagination.Next onClick={onScrollDown} />
          </Pagination>
        </div>
      </div>)
}

const mapStateToProps = state => {
  const columns = state.spreadsheet.columns
  const rows = state.spreadsheet.rows
  const database = state.navTree.selectedDatabase
  const table = state.navTree.selectedTable

  return {
    columns,
    rows,
    database,
    table,
  }
}

export default connect(mapStateToProps)(SpreadsheetContainer)
