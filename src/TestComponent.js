import React, { Component } from 'react';
import axios from 'axios';
import socket from './socket'
import Table from './Table'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const ButtonWrapper = (props) => {
    const classes = useStyles();

    return <Button className={classes.button} {...props}></Button>
}

export default class extends Component {
    state = {
        podStatus: {}
    };

    async componentDidMount() {
        const res = await axios.get('/api/status/pods/current')
        console.log({ res })
        this.setState({
            podStatus: res.data.data.podStatus
        })

        socket.on('message', ({ type, payload }) => {
            if (type === 'pod-status-event') {
                console.log({ payload })
            }

            const event = payload;
            const eventType = event.type
            const podName = event.object.metadata.name

            if (eventType === 'ADDED') {
                this.setState({
                    podStatus: { ...this.state.podStatus, [podName]: [event]}
                })
              } else {
                this.setState({
                    podStatus: { ...this.state.podStatus, [podName]: [...this.state.podStatus[podName], event]}
                })
              }
          
              if (eventType === 'DELETED') {
                const podStatusCopy = { ...this.state.podStatus }
                delete podStatusCopy[podName]

                this.setState({
                    podStatus: podStatusCopy
                })
              }
        })
    }
    
    render() {
        return (
            <div>
                <Table podStatus={this.state.podStatus}/>
                <ButtonWrapper 
                    onClick={async () => {
                        try {
                            const res = await axios.post('/api/deployment/fib-calculator')
                            console.log({ res })
                        } catch(err) {
                            console.log({ err })
                        }
                    }}
                    variant="contained"
                >
                    Deploy
                </ButtonWrapper>
                <ButtonWrapper 
                    onClick={async () => {
                        try {
                            const res = await axios.delete('/api/deployment/fib-calculator')
                            console.log({ res })
                        } catch(err) {
                            console.log({ err })
                        }
                    }}
                    variant="contained" color="secondary"
                >
                    Destroy
                </ButtonWrapper>
            </div>
        );
    }
}