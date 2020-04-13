import React from 'react'
import { connect } from 'react-redux'
import NavTreeView from '../components/nav-tree-view'
import { setDatabases, setTables, setDatabase, setTable, } from '../actions/databases'

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

  onSetSelected(nodeId) {
    if (nodeId.includes('-') === true) {
      const index0 = parseInt(nodeId.split('-')[0])
      const index1 = parseInt(nodeId.split('-')[1])
      const database = this.props.databases[index0]
      const name = database.name
      const table = database.tables[index1]
      this.props.onSetSelected(table)
      this.props.dispatch(setDatabase(name))
      this.props.dispatch(setTable(table))
    } else {
      const database = this.props.databases[nodeId].name
      this.props.onSetSelected(database)
      this.props.dispatch(setDatabase(database))
      this.props.dispatch(setTable(null))
    }
  }

  render() {
    return (
      <NavTreeView
        onSetSelected={this.onSetSelected.bind(this)}
        databases={this.props.databases}
      />
    )
  }
}

const mapStateToProps = state => {
  const databases = state.databases
    .sort((a, b) => a.name > b.name ? 1 : -1)

  return {
    databases
  }
}

export default connect(mapStateToProps)(NavTreeContainer)
