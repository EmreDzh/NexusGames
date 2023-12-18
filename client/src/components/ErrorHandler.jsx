import { Component } from 'react';

export default class ErrorHandler extends Component {
    constructor() {
        super()

        this.state = {
            hasError: false,
        }
    }
    
    static getDerivedStateFromError(err) {
        console.log('GetDerivedStateFromError');
        return {
            hasError: true,
        }
    }


    render() {
        if (this.state.hasError) {
            return(
                <h1>Site or Server Down please check the ErrorHandler for more information!</h1>
            )
        }

        return this.props.children;
    }
}