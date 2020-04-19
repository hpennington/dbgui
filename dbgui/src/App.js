import React, { useState } from 'react'
import HamburgerMenu from 'react-hamburger-menu'
import NavTreeContainer from './features/navtree/nav-tree-container'
import './App.css';

function App(props) {
  const [open, setOpen] = useState(true)
  const [title, setTitle] = useState('')

  const leftPaneStyle = {
    width: open === true ? '400px' : 0
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
      </div>
    </div>
  );
}

export default App
