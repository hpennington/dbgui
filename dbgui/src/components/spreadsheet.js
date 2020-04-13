import React from 'react'
import './spreadsheet.css'

export default function Spreadsheet(props) {
  return (
    <div className="spreadsheet">
      <table>
        <tr>
          {
            props.columns.map(column => <th>{column}</th>)
          }
        </tr>
        {
          props.rows.map(row => <tr><td>{row}</td></tr>)
        }
      </table>
    </div>
  )
}

