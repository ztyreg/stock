import React, {Component} from 'react';
import {Button} from 'antd';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
    render() {
        return (
            <div className="App">
                <nav className="navbar navbar-light bg-light">
                    <div className="container">
                        <a className="navbar-brand" href="/">Stock Price</a>
                    </div>
                </nav>

                <div className="container mt-3">
                    <Button type="primary">Button</Button>
                </div>

            </div>
        );
    }
}

export default App;