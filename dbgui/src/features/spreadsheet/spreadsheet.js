import React from 'react'
import './spreadsheet.css'

export default class Spreadsheet extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      previousY: 0.0,
      previousRows: 0,
      mounted: false,
    }
  }

  componentDidUpdate() {
    if (this.refs.table.children.length >= 50 && this.props.rows.length !== this.state.previousRows) {
      this.setState({previousRows: this.props.rows.length})
    }
  }

  setupIntersectionObserver() {
      const intersectionObserver = new IntersectionObserver(function(entries) {
        for (const entry of entries) {
          if (entry.boundingClientRect.y !== this.state.previousY) {
            if (entry.boundingClientRect.y > 0) {
              if (entry.intersectionRect.y <= 0) {
                this.props.scrollDown()
                this.setupIntersectionObserver()
              }
            }
          }
        }
      }.bind(this))

      intersectionObserver.observe(this.refs.table.children[this.props.offset + 50])
  }

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
