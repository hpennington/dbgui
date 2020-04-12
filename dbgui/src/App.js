import React, { useState } from 'react';
import HamburgerMenu from 'react-hamburger-menu'
import NavTreeContainer from './containers/nav-tree-container'
import './App.css';

function App() {
  const [open, setOpen] = useState(true)

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
          <h3>Selected DB/Table</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
