import React, { Component } from 'react';
import axios from 'axios';
import io from 'socket.io-client'
const socket = io();

socket.on('connect', (socket) => {
    console.log('connected')
  });

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
        socket.on('pod-status-event', (event) => {
            console.log({event})
        })
    }
    
    render() {
        return (
            <div>
                {Object.keys(this.state.podStatus).map(podName => {
                    return <div>{podName}</div>
                })}
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