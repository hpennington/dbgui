import React from 'react'
import { connect } from 'react-redux'
import { setDatabases, setTable } from './navTreeSlice'
import { setColumns, setRows } from '../spreadsheet/spreadsheetSlice'
import NavTreeView from './nav-tree-view'

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
        this.props.dispatch(setDatabases({databases: res}))
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
        this.props.dispatch(setTable({name: database, table: res}))
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
      const table = this.props.tables[database][index1]

      fetch('http://localhost:3000/table?database='
        + database
        + '&table=' + table,
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'api_key': process.env.REACT_APP_API_KEY}),
      }).then(res => res.json())
        .then(res => {
          if (res.columns !== undefined && res.rows !== undefined) {
            this.props.dispatch(setColumns({columns: res.columns}))
            this.props.dispatch(
              setRows({rows: res.rows.map(row => Object.values(row))})
            )
          } else {
            this.props.dispatch(setColumns({columns: []}))
            this.props.dispatch(setRows({rows: []}))
          }
        })
        .catch(err => window.alert(err))

    } else {
      const database = this.props.databases[nodeId]
      this.props.dispatch(setColumns({columns: ['Tables']}))
      this.props.dispatch(
        setRows({rows: this.props.tables[database].map(table => [table])})
      )

    }
  }

   render() {
     return (
       <NavTreeView
         onSetSelected={this.onSetSelected.bind(this)}
         databases={this.props.databases}
         tables={this.props.tables}
       />
     )
   }
}

const mapStateToProps = state => {
  const databases = state.navTree.databases
  const tables = state.navTree.tables

  return {
    databases,
    tables,
  }
}

export default connect(mapStateToProps)(NavTreeContainer)
