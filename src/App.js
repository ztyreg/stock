import React, {Component} from 'react';
import {Checkbox} from 'antd';
import {Radio} from 'antd';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

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
                    <Checkbox>Show Red</Checkbox>
                    <Checkbox>Show Yellow</Checkbox>

                    <RadioGroup defaultValue="0">
                        <RadioButton value="0">field1</RadioButton>
                        <RadioButton value="1">field2</RadioButton>
                        <RadioButton value="2">field3</RadioButton>
                    </RadioGroup>

                </div>

            </div>
        );
    }
}

export default App;