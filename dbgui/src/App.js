import React, { useState } from 'react'
import { connect } from 'react-redux'
import HamburgerMenu from 'react-hamburger-menu'
import NavTreeContainer from './containers/nav-tree-container'
import SpreadsheetContainer from './containers/spreadsheet-container'
import { setTables } from './actions/databases'
import './App.css';

function App(props) {
  const [open, setOpen] = useState(true)
  const [title, setTitle] = useState('')
  const [columns, setColumns] = useState([])

  const leftPaneStyle = {
    width: open === true ? '400px' : 0
  }

  const onSetSelected = (title) => {
    setTitle(title)
    if (props.database !== null && props.table !== null) {
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
        .then(res => {
          console.log(res)
          setColumns(res.columns)
          props.dispatch(setTables(props.database, res.rows))
        })
        .then(console.log)
        .catch(err => window.alert(err))
    }
  }

  return (
    <div className="App">
      <div id="split-pane-left" style={leftPaneStyle}>
        { open === true ?
        <div id="tree-view-container">
          <h3>Databases</h3>
          <NavTreeContainer onSetSelected={onSetSelected} />
        </div>
        : ''
        }
      </div>
      <div id="split-pane-right">
        <div id="hamburger-menu-container">
          <HamburgerMenu
            width={18}
            height={15}
            strokeWidth={3}
            color="gray"
            menuClicked={e => setOpen(!open)}
            isOpen={false}
          />
        </div>
        <h3 id="label">{title}</h3>
        <SpreadsheetContainer columns={columns} />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  const table = state.table
  const database = state.database

  return {
    table,
    database,
  }
}

export default connect(mapStateToProps)(App);
