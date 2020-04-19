import React from 'react'
import './spreadsheet.css'

export default function Spreadsheet(props) {
  console.log('here')
  return (
    <div className="spreadsheet">
      <table>
        <tr>
          {
            props.columns.map(column => <th>{column}</th>)
          }
        </tr>
        {
          props.rows.map(row => <tr>{row.map(cell => <td>{cell}</td>)}</tr>)
        }
      </table>
    </div>
  )
}

