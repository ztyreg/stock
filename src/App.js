import React, {Component} from 'react';
import {Checkbox} from 'antd';
import {Radio} from 'antd';
import {Badge} from 'antd';
import {Table} from 'antd';
import {Dropdown, Menu, Icon} from 'antd';
import {message} from 'antd';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import reqwest from 'reqwest';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


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

    handleClick = e => {
        console.log('click ', e);
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

    handleOperation = (type, matchId) => {
        // message.success('This is a prompt message for success, and it will disappear in 10 seconds', 10);
        let foundIndex = this.state.data.findIndex(x => x.matchId === matchId);
        if (foundIndex !== -1) {
            // message.success(foundIndex, 10)
            let currentMatch = this.state.data[foundIndex];
            let currentMatchHome = currentMatch.home[this.state.lang];
            let currentMatchGuest = currentMatch.guest[this.state.lang];
            let msg = '';
            switch (type) {
                case 'homeScore':
                    currentMatch.homeScore++;
                    msg = <span> <b className={"text-danger"}>{currentMatchHome} {currentMatch.homeScore}</b>
                    : {currentMatch.guestScore} {currentMatchGuest} </span>;
                    message.success(msg, 10);
                    break;

            }
            this.setState({
                data: this.state.data
            })
        }
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
            },
            {
                title: 'Simulation',
                dataIndex: 'operation',
                render: (value, record) =>
                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item key="0">
                                    <a onClick={e => this.handleOperation("homeScore", record.matchId)}>home score</a>
                                </Menu.Item>
                                <Menu.Item key="1">
                                    <a onClick={e => this.handleOperation(record.matchId)}>guest score</a>
                                </Menu.Item>
                                <Menu.Divider/>
                                <Menu.Item key="3">3rd menu item</Menu.Item>
                            </Menu>}
                        trigger={['click']}>
                        <a className="ant-dropdown-link">
                            Simulation<Icon type="down"/>
                        </a>
                    </Dropdown>,
            }
        ];

        return (

            <div className="App">

                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">Online Stock Trading Information</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home<span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Account</a>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search"/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
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