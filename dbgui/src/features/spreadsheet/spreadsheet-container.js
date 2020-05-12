import React, { useState, useEffect } from 'react'
import { Pagination } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setColumns, setRows, setTableLength } from './spreadsheetSlice'
import Spreadsheet from './spreadsheet'

function SpreadsheetContainer(props) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (props.table !== null && props.database !== null) {
      fetch('http://localhost:3000/table-meta?database='
        + props.database
        + '&table=' + props.table,
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'api_key': process.env.REACT_APP_API_KEY}),
      }).then(res => res.json())
        .then(res => {
          props.dispatch(setTableLength({length: res.length}))
        }).catch(err => window.alert(err))
    }
  })

  function fetchData(offset, database, table) {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3000/table?database='
      + database
      + '&table=' + table
      + '&offset=' + offset,
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
          resolve(newRows)
        }

      })
        .catch(err => reject(err))
    })
  }

  function onScrollUp() {
    const localOffset = offset - 100
    if (localOffset >= 0) {
      const database = props.database
      const table = props.table

      fetchData(localOffset, database, table)
        .then((res) => {
          setOffset(localOffset)
          props.dispatch(
            setRows({rows: res})
          )
        })
        .catch(err => window.alert(err))
    }

  }

  function onScrollDown() {
    const localOffset = offset + 100
    const database = props.database
    const table = props.table

    fetchData(localOffset, database, table)
      .then((res) => {
        setOffset(localOffset)
        props.dispatch(
          setRows({rows: res})
        )
      })
      .catch(err => window.alert(err))

  }

  function onScrollStart() {
    const localOffset = 0
    const database = props.database
    const table = props.table

    fetchData(localOffset, database, table)
      .then((res) => {
        setOffset(localOffset)
        props.dispatch(
          setRows({rows: res})
        )
      })
      .catch(err => window.alert(err))

  }

  function onScrollEnd() {
    const localOffset = Math.floor(props.tableLength / 100) * 100
    console.log(localOffset)
    const database = props.database
    const table = props.table

    fetchData(localOffset, database, table)
      .then((res) => {
        setOffset(localOffset)
        props.dispatch(
          setRows({rows: res})
        )
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
            <Pagination.First onClick={onScrollStart} />
            <Pagination.Prev onClick={onScrollUp} />
            <Pagination.Next onClick={onScrollDown} />
            <Pagination.Last onClick={onScrollEnd} />
          </Pagination>
        </div>
      </div>)
}

const mapStateToProps = state => {
  const columns = state.spreadsheet.columns
  const rows = state.spreadsheet.rows
  const tableLength = state.spreadsheet.tableLength
  const database = state.navTree.selectedDatabase
  const table = state.navTree.selectedTable

  return {
    columns,
    rows,
    database,
    table,
    tableLength,
  }
}

export default connect(mapStateToProps)(SpreadsheetContainer)
