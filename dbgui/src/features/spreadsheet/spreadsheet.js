import React from 'react'
import './spreadsheet.css'

export default class Spreadsheet extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      paneWidth: 0,
    }
  }

  componentDidMount() {
    this.layout()

    window.onresize = this.resize.bind(this)
    this.resize()
  }

  componentDidUpdate() {
    this.layout()
  }

  onScroll(e) {
    this.layout()
  }

  resize() {
    const leftPaneWidth = document.getElementById('split-pane-left').getBoundingClientRect().width
    this.setState({paneWidth: leftPaneWidth})
  }

  layout() {
    if (this.refs.table.children.length > 0) {
      const row = this.refs.table.children[0]
      var i = 0;

      for (const cell of row.children) {
        const x = cell.getBoundingClientRect().left

        console.log(this.refs.header.children[i])
        this.refs.header.children[i].style.left = `${x - this.state.paneWidth}px`
        this.refs.header.children[i].style.position = 'absolute'


        i += 1
      }
    }
  }

  render() {
    const leftPaneWidth = this.state.paneWidth
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
              left: `${leftPaneWidth + 10}px`,
              overflow: "hidden",
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
