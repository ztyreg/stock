import React, {Component} from 'react';
import {Checkbox} from 'antd';
import {Radio} from 'antd';
import {Badge} from 'antd';
import {Table} from 'antd';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import reqwest from 'reqwest';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


class App extends Component {
    state = {
        data: [],
        loading: false,
        lang: 0,
        showRed: true,
        showYellow: true,
    };

    fetch = () => {
        this.setState({loading: true});
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

    handleLangChange = (e) => {
        this.setState({
            lang: e.target.value
        });
    };

    handleShowRedChange = (e) => {
        this.setState({
            showRed: e.target.checked
        })
    };

    handleShowYellowChange = (e) => {
        this.setState({
            showYellow: e.target.checked
        })
    };

    render() {
        const columns = [
            {
                title: 'Match',
                dataIndex: 'league',
                render: league => <span>{league[this.state.lang]}</span>,
            },
            {
                title: 'Time',
                dataIndex: 'matchTime',
                render: (value, record) =>
                    <span title={record.matchYear + "-" + record.matchDate + " " + record.matchTime}>
                        {record.matchDate + " " + record.matchTime}
                        </span>,
            },
            {
                title: 'Home Team',
                dataIndex: 'home',
                render: (home, record) => <div>
                    <Badge className={"mr-1"} count={record.homeYellow} style={{
                        display: this.state.showYellow ? 'block' : 'none',
                        borderRadius: 0,
                        backgroundColor: 'yellow',
                        color: '#999',
                        boxShadow: '0 0 0 1px #d9d9d9 inset'
                    }}/>
                    <Badge className={"mr-1"} count={record.homeRed} style={{
                        display: this.state.showRed ? 'block' : 'none',
                        borderRadius: 0,
                        backgroundColor: 'red',
                        color: '#999',
                        boxShadow: '0 0 0 1px #d9d9d9 inset'
                    }}/>
                    <span>{home[this.state.lang]}</span>
                </div>
            },
            {
                title: 'Score',
                dataIndex: 'score',
                render: (value, record) => <span>{record.homeScore} - {record.guestScore}</span>,
            },
            {
                title: 'Guest Team',
                dataIndex: 'guest',
                render: (home, record) => <div>
                    <span>{home[this.state.lang]}</span>
                    <Badge className={"ml-1"} count={record.guestRed} style={{
                        display: this.state.showRed ? 'block' : 'none',
                        borderRadius: 0,
                        backgroundColor: 'red',
                        color: '#999',
                        boxShadow: '0 0 0 1px #d9d9d9 inset'
                    }}/>
                    <Badge className={"ml-1"} count={record.guestYellow} style={{
                        display: this.state.showYellow ? 'block' : 'none',
                        borderRadius: 0,
                        backgroundColor: 'yellow',
                        color: '#999',
                        boxShadow: '0 0 0 1px #d9d9d9 inset'
                    }}/>
                </div>
            },
            {
                title: 'Half score',
                dataIndex: 'halfScore',
                render: (value, record) => <span>{record.homeHalfScore} - {record.guestHalfScore}</span>,
            }
        ];

        return (
            <div className="App">
                <nav className="navbar navbar-light bg-light">
                    <div className="container">
                        <a className="navbar-brand" href="/">Stock Price</a>
                    </div>
                </nav>

                <div className="container mt-3">
                    <div className="filter my-3">
                        <Checkbox checked={this.state.showRed} onChange={this.handleShowRedChange}>Show
                            Red</Checkbox>
                        <Checkbox checked={this.state.showYellow} onChange={this.handleShowYellowChange}>Show
                            Yellow</Checkbox>

                        <RadioGroup defaultValue="0" onChange={this.handleLangChange}>
                            <RadioButton value={0}>field1</RadioButton>
                            <RadioButton value={1}>field2</RadioButton>
                            <RadioButton value={2}>field3</RadioButton>
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