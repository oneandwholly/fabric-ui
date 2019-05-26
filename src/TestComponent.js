import React, { Component } from 'react';
import axios from 'axios';

export default class extends Component {
    async componentDidMount() {
        // const res = await axios.get('/api/ping')
        // console.log({ res })
    }
    
    render() {
        return (
            <div>
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