import React from 'react'
import './spreadsheet.css'

export default function Spreadsheet(props) {
  if (props.rows.length > 0 && props.rows[0][0].length > 1) {
    return (
      <div className="spreadsheet">
        <table>
          <tr>
            {
            props.columns !== undefined
            ? props.columns.map(column => <th>{column}</th>)
            : []
            }
          </tr>
          {
            props.rows.map(row => <tr>{row.map(a => <td>{a}</td>)}</tr>)
          }
        </table>
      </div>
    )
  } else {
    return (
      <div className="spreadsheet">
        <table>
          <tr>
            {
            props.columns !== undefined
            ? props.columns.map(column => <th>{column}</th>)
            : []
            }
          </tr>
          {
            props.rows.map(row => <tr><td>{row}</td></tr>)
          }
        </table>
      </div>
    )
  }
}

