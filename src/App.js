import React, {Component} from 'react';
import {Checkbox} from 'antd';
import {Radio} from 'antd';
import {Table} from 'antd';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
];

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    },
];

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
                    <div className="filter my-3">
                        <Checkbox>Show Red</Checkbox>
                        <Checkbox>Show Yellow</Checkbox>

                        <RadioGroup defaultValue="0">
                            <RadioButton value="0">field1</RadioButton>
                            <RadioButton value="1">field2</RadioButton>
                            <RadioButton value="2">field3</RadioButton>
                        </RadioGroup>
                    </div>

                    <Table dataSource={dataSource} columns={columns} size={"middle"} pagination={false}/>

                </div>

            </div>
        );
    }
}

export default App;