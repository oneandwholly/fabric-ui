import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

function SimpleTable(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Pod Name</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
              Object.keys(props.podStatus).map(podName => {
                const lastEvent = props.podStatus[podName][props.podStatus[podName].length-1]
                const status = lastEvent.object.status
                const phase = status.phase
                const state = status.containerStatuses ? Object.keys(status.containerStatuses[0].state)[0] : null
                return <TableRow key={podName}>
                    <TableCell component="th" scope="row">
                        {podName}
                    </TableCell>
                    <TableCell align="right">{state ? state.toUpperCase() : phase.toUpperCase()}</TableCell>
                    </TableRow>
            })
          }
          
        </TableBody>
      </Table>
    </Paper>
  );
}

export default SimpleTable;