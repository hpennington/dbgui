import React from 'react'
import { connect } from 'react-redux'
import NavTreeView from '../components/nav-tree-view'

class NavTreeContainer extends React.Component {
  componentDidMount() {
    fetch('http://localhost:3000/databases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'api_key': process.env.REACT_APP_API_KEY}),
    }).then(console.log)
  }

  render() {
    return (
      <NavTreeView databases={this.props.databases} />
    )
  }
}

const mapStateToProps = state => {
  const databases = state.navTree.databases
  return {
    databases
  }
}

export default connect(mapStateToProps)(NavTreeContainer)
