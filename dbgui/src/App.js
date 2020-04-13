import React, { useState } from 'react'
import { connect } from 'react-redux'
import HamburgerMenu from 'react-hamburger-menu'
import NavTreeContainer from './containers/nav-tree-container'
import Spreadsheet from './components/spreadsheet'
import './App.css';

function App() {
  const [open, setOpen] = useState(true)
  const [title, setTitle] = useState('')

  const leftPaneStyle = {
    width: open === true ? '400px' : 0
  }

  const onSetSelected = (title) => {
    setTitle(title)
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
        <Spreadsheet />
      </div>
    </div>
  );
}

export default connect()(App);
