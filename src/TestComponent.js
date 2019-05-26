import React, { Component } from 'react';
import axios from 'axios';

export default class extends Component {
    state = {
        podStatus: {}
    };

    async componentDidMount() {
        const res = await axios.get('/api/status/pods/current')
        console.log({ res })
        this.setState({
            podStatus: res.data.podStatus
        })
    }
    
    render() {
        return (
            <div>
                <div>current pods status:</div>
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