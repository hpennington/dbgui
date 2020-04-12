import React from 'react'
import { connect } from 'react-redux'
import NavTreeView from '../components/nav-tree-view'
import { setDatabases, setTables } from '../actions/databases'

class NavTreeContainer extends React.Component {
  componentDidMount() {
    fetch('http://localhost:3000/databases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'api_key': process.env.REACT_APP_API_KEY}),
    }).then(res => res.json())
      .then(res => {
        this.props.dispatch(setDatabases(res))
        this.fetchTables(res)
      })
      .catch(err => window.alert(err))
  }

  fetchTable(database) {
    fetch('http://localhost:3000/tables?database=' + database, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'api_key': process.env.REACT_APP_API_KEY}),
    }).then(res => res.json())
      .then(res => {
        this.props.dispatch(setTables(database, res))
      })
      .catch(err => window.alert(err))
  }

  fetchTables(databases) {
    for (const database of databases) {
      this.fetchTable(database)
    }
}

  render() {
    return (
      <NavTreeView databases={this.props.databases} />
    )
  }
}

const mapStateToProps = state => {
  const databases = state.databases
  return {
    databases
  }
}

export default connect(mapStateToProps)(NavTreeContainer)
