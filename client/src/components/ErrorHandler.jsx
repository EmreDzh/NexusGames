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
    
    /*
    componentDidCatch(error, errorInfo) {
        console.log('componentDidCatch')
        // TODO logging
    }
    */

    render() {
        if (this.state.hasError) {
            return(
                <h1>404 Check the error handler</h1>
            )
        }

        return this.props.children;
    }
}