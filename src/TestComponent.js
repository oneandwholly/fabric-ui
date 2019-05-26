import React, { Component } from 'react';
import axios from 'axios';

export default class extends Component {
    async componentDidMount() {
        const res = await axios.get('/api/ping')
        console.log({ res })
    }
    
    render() {
        return <div>TestComponent</div>
    }
}