import React, {Component} from 'react';
import {Checkbox} from 'antd';
import {Radio} from 'antd';
import {Table} from 'antd';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import reqwest from 'reqwest';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const columns = [
    {
        title: 'Match',
        dataIndex: 'league[0]',
        key: 'league',
    },
    {
        title: 'Time',
        dataIndex: 'matchTime',
        render: (value, record) =>
        <span title={record.matchYear + "-" + record.matchDate + " " + record.matchTime}>
            {record.matchDate + " " + record.matchTime}
        </span>,
        key: 'matchTime',
    },
    {
        title: 'Home Team',
        dataIndex: 'home[0]',
        key: 'home',
    },
    {
        title: 'Score',
        dataIndex: 'score',
        render: (value, record) => <span>{record.homeScore} - {record.guestScore}</span>,
        key: 'score',
    },
    {
        title: 'Guest Team',
        dataIndex: 'guest[0]',
        key: 'guest',
    },
    {
        title: 'Half score',
        dataIndex: 'halfScore',
        key: 'halfScore',
        render: (value, record) => <span>{record.homeHalfScore} - {record.guestHalfScore}</span>,
    }
];

class App extends Component {
    state = {
        data: [],
        loading: false,
    };

    fetch = () => {
        this.setState({ loading: true });
        reqwest({
            url: '/worldcup_2018.json',
            method: 'get',
            type: 'json',
        }).then(data => {
            this.setState({
                loading: false,
                data: data.results,
            });
        });
    };

    componentDidMount() {
        this.fetch();
    }

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

                    <Table
                    dataSource={this.state.data}
                    columns={columns}
                    size={"middle"}
                    pagination={false}
                    rowKey={record => record.matchId}
                    loading={this.state.loading}
                    />

                </div>

            </div>
        );
    }
}

export default App;