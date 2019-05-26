import React, { Component } from 'react';
import axios from 'axios';
import socket from './socket'
import Table from './Table'

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
                {Object.keys(this.state.podStatus).map(podName => {
                    const lastEvent = this.state.podStatus[podName][this.state.podStatus[podName].length-1]
                    const status = lastEvent.object.status
                    const phase = status.phase
                    const state = status.containerStatuses ? Object.keys(status.containerStatuses[0].state)[0] : null
                    return <div>{podName}: {state ? state : phase}</div>
                })}
                <Table podStatus={this.state.podStatus}/>
                <button 
                    onClick={async () => {
                        try {
                            const res = await axios.post('/api/deployment/fib-calculator')
                            console.log({ res })
                        } catch(err) {
                            console.log({ err })
                        }
                    }}
                >
                    deploy
                </button>
                <button 
                    onClick={async () => {
                        try {
                            const res = await axios.delete('/api/deployment/fib-calculator')
                            console.log({ res })
                        } catch(err) {
                            console.log({ err })
                        }
                    }}
                >
                    delete
                </button>
            </div>
        );
    }
}