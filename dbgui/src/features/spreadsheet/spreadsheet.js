import React from 'react'
import './spreadsheet.css'

export default class Spreadsheet extends React.Component {
  componentDidMount() {
    this.layout()
  }

  componentDidUpdate() {
    this.layout()
  }

  onScroll(e) {
    this.layout()
  }

  layout() {
    if (this.refs.table.children.length > 0) {
      const row = this.refs.table.children[0]
      var i = 0;

      for (const cell of row.children) {
        const x = cell.getBoundingClientRect().left

        this.refs.header.children[i].style.left = `${x - window.innerWidth + this.props.width}px`
        this.refs.header.children[i].style.position = 'absolute'


        i += 1
      }
    }
  }

  render() {
    return (
      <div className="spreadsheet"
        onScroll={this.onScroll.bind(this)}
      >
        <div ref="header"
            style={{
              display: "flex",
              alignItems: "center",
              position: "fixed",
              height: "44.5px",
              background: "white",
              right: "25px",
              left: `${window.innerWidth - this.props.width + 10}px`,
              overflow: "hidden",
              zIndex: -1,
              width: `calc(100% - ${window.innerWidth - this.props.width + 20}px)`,
              border: "solid 1px gray",
            }}
        >
          {
            this.props.columns.map(column =>
              <div style={{whiteSpace: "nowrap"}}><strong>{column}</strong></div>
            )
          }
        </div>
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
