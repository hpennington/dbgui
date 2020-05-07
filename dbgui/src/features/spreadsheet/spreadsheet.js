import React from 'react'
import './spreadsheet.css'

export default class Spreadsheet extends React.Component {
  render() {
    return (
      <div className="spreadsheet">
        <table ref="table">
          <tr>
            {
              this.props.columns.map(column => <th>{column}</th>)
            }
          </tr>
          {
            this.props.rows.map(row => <tr>{row.map(cell => <td>{cell}</td>)}</tr>)
          }
        </table>
      </div>
    )
  }
}
