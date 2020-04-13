import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function NavTreeView(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
    props.onSetSelected(nodeIds)
  };

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      selected={selected}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
    {
      props.databases.map((db, db_key) =>
        <TreeItem key={db_key} nodeId={db_key.toString()} label={db.name}>
          {
            db.tables.map((table, tb_key) =>
              <TreeItem
                key={tb_key}
                nodeId={db_key.toString() + '-' + tb_key.toString()}
                label={table}>
              </TreeItem>
            )
          }
        </TreeItem>
      )
    }
    </TreeView>
  );
}
