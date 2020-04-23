import React, { useState } from 'react'
import { connect } from 'react-redux'
import HamburgerMenu from 'react-hamburger-menu'
import NavTreeContainer from './features/navtree/nav-tree-container'
import SpreadsheetContainer from './features/spreadsheet/spreadsheet-container'
import { Form, Button } from 'react-bootstrap'
import { setColumns, setRows } from './features/spreadsheet/spreadsheetSlice'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App(props) {
  const [open, setOpen] = useState(true)

  const leftPaneStyle = {
    width: open === true ? '400px' : 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    const query = document.getElementById('formBasicSQL').value
    const database = props.selectedDatabase

    fetch('http://localhost:3000/query?query=' + query + '&database=' + database, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'api_key': process.env.REACT_APP_API_KEY}),
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        const columns = Object.keys(res[0])
        const rows = res.map(r => Object.values(r))

        console.log(rows)
        props.dispatch(setColumns({columns: columns}))
        props.dispatch(setRows({rows: rows}))
      })
      .catch(err => window.alert(err))


  }

  return (
    <div className="App">
      <div id="split-pane-left" style={leftPaneStyle}>
        { open === true ?
        <div id="tree-view-container">
          <h3>Databases</h3>
          <NavTreeContainer />
        </div>
        : ''
        }
      </div>
      <div id="split-pane-right">
        <div>
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
          <Form id="sql-form" onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicSQL">
              <Form.Control placeholder="Enter SQL" />
            </Form.Group>
          </Form>
        </div>
        <SpreadsheetContainer />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  const selectedDatabase = state.navTree.selectedDatabase

  return {
    selectedDatabase
  }
}

export default connect(mapStateToProps)(App)
