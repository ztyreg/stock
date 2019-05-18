import React, {Component} from 'react';
import {Checkbox} from 'antd';
import {Radio} from 'antd';
import {Badge} from 'antd';
import {Table} from 'antd';
import {Dropdown, Menu, Icon} from 'antd';
import {message} from 'antd';
import {Form} from 'antd';
import {Drawer, Button, Col, Row, Input, Select, DatePicker} from 'antd';
import {Layout, Breadcrumb} from 'antd';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import reqwest from 'reqwest';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;


const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalSearchForm extends React.Component {
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        // Only show error after a field is touched.
        const searchError = isFieldTouched('search') && getFieldError('search');
        return (
            <div className="container" align="right">
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item validateStatus={searchError ? 'error' : ''} help={searchError || ''}>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please input your username!'}],
                        })(
                            <Input
                                prefix={<Icon type="search" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Search by code"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                            Search
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const WrappedHorizontalSearchForm = Form.create({name: 'horizontal_search'})(HorizontalSearchForm);

class ResultTable extends Component {

    render() {
        const columns = [
            {
                title: 'Code',
                dataIndex: 'stock_id',
                render: id => <span>{id}</span>,
            },
            {
                title: 'Name',
                dataIndex: 'stock_name',
                render: name => <span>{name}</span>,
            },
            {
                title: 'Price',
                dataIndex: 'stock_price',
                render: price => <span>{price}</span>,
            },
            {
                title: 'High',
                dataIndex: 'upper_limit',
                render: high => <span>{high}</span>,
            },
            {
                title: 'Low',
                dataIndex: 'lower_limit',
                render: low => <span>{low}</span>,
            },
            {
                title: 'State',
                dataIndex: 'stock_state',
                render: state => <span>{state}</span>,
            },
            // {
            //     title: 'Home Team',
            //     dataIndex: 'home',
            //     render: (home, record) => <div>
            //         <Badge className={"mr-1"} count={record.homeYellow} style={{
            //             display: this.state.showYellow ? 'block' : 'none',
            //             borderRadius: 0,
            //             backgroundColor: 'yellow',
            //             color: '#999',
            //             boxShadow: '0 0 0 1px #d9d9d9 inset'
            //         }}/>
            //         <Badge className={"mr-1"} count={record.homeRed} style={{
            //             display: this.state.showRed ? 'block' : 'none',
            //             borderRadius: 0,
            //             backgroundColor: 'red',
            //             color: '#999',
            //             boxShadow: '0 0 0 1px #d9d9d9 inset'
            //         }}/>
            //         <span>{home[this.state.lang]}</span>
            //     </div>
            // },
            // {
            //     title: 'Simulation',
            //     dataIndex: 'operation',
            //     render: (value, record) =>
            //         <Dropdown
            //             overlay={
            //                 <Menu>
            //                     <Menu.Item key="0">
            //                         <a onClick={e => this.handleOperation("homeScore", record.matchId)}>home score</a>
            //                     </Menu.Item>
            //                     <Menu.Item key="1">
            //                         <a onClick={e => this.handleOperation(record.matchId)}>guest score</a>
            //                     </Menu.Item>
            //                     <Menu.Divider/>
            //                     <Menu.Item key="3">3rd menu item</Menu.Item>
            //                 </Menu>}
            //             trigger={['click']}>
            //             <a className="ant-dropdown-link">
            //                 Simulation<Icon type="down"/>
            //             </a>
            //         </Dropdown>,
            // }
        ];

        return (
            <div className="container mt-3">

                {/*<div className="filter my-3">*/}
                {/*<Checkbox checked={this.state.showRed} onChange={this.handleShowRedChange}>Show*/}
                {/*Red</Checkbox>*/}
                {/*<Checkbox checked={this.state.showYellow} onChange={this.handleShowYellowChange}>Show*/}
                {/*Yellow</Checkbox>*/}

                {/*<RadioGroup defaultValue="0" onChange={this.handleLangChange}>*/}
                {/*<RadioButton value={0}>field1</RadioButton>*/}
                {/*<RadioButton value={1}>field2</RadioButton>*/}
                {/*<RadioButton value={2}>field3</RadioButton>*/}
                {/*</RadioGroup>*/}
                {/*</div>*/}

                <Table
                    dataSource={this.props.data}
                    columns={columns}
                    size={"middle"}
                    pagination={false}
                    rowKey={record => record.stock_id}
                    loading={this.props.loading}
                />

            </div>
        );

    }

}


class App extends Component {
    state = {
        data: [],
        loading: false,
        showRed: true,
        showYellow: true,
    };

    fetch = () => {
        this.setState({loading: true});
        reqwest({
            url: '/stock_information.json',
            method: 'get',
            type: 'json',
        }).then(data => {
            this.setState({
                loading: false,
                data: data.results,
            });
        });
    };

    // handleClick = e => {
    //     console.log('click ', e);
    // };

    componentDidMount() {
        this.fetch();
    }

    // handleLangChange = (e) => {
    //     this.setState({
    //         lang: e.target.value
    //     });
    // };

    // handleShowRedChange = (e) => {
    //     this.setState({
    //         showRed: e.target.checked
    //     })
    // };

    // handleShowYellowChange = (e) => {
    //     this.setState({
    //         showYellow: e.target.checked
    //     })
    // };

    // handleOperation = (type, matchId) => {
    //     // message.success('This is a prompt message for success, and it will disappear in 10 seconds', 10);
    //     let foundIndex = this.state.data.findIndex(x => x.matchId === matchId);
    //     if (foundIndex !== -1) {
    //         // message.success(foundIndex, 10)
    //         let currentMatch = this.state.data[foundIndex];
    //         let currentMatchHome = currentMatch.home[this.state.lang];
    //         let currentMatchGuest = currentMatch.guest[this.state.lang];
    //         let msg = '';
    //         switch (type) {
    //             case 'homeScore':
    //                 currentMatch.homeScore++;
    //                 msg = <span> <b className={"text-danger"}>{currentMatchHome} {currentMatch.homeScore}</b>
    //                 : {currentMatch.guestScore} {currentMatchGuest} </span>;
    //                 message.success(msg, 10);
    //                 break;
    //
    //         }
    //         this.setState({
    //             data: this.state.data
    //         })
    //     }
    // };


    render() {

        return (
            <Layout>
                <Header className="header">
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{lineHeight: '64px'}}
                    >
                        <Menu.Item key="1">Panel</Menu.Item>
                        <Menu.Item key="2">About</Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} style={{background: '#fff'}}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0}}
                        >
                            <SubMenu
                                key="sub1"
                                title={<span> <Icon type="search"/>Stocks</span>}
                            >
                                <Menu.Item key="1">Show all</Menu.Item>
                                <Menu.Item key="2">Convert</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={<span> <Icon type="user"/>Account</span>}
                            >
                                <Menu.Item key="3">Information</Menu.Item>
                                <Menu.Item key="4">Upgrade</Menu.Item>
                                <Menu.Item key="5">Sign out</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Panel</Breadcrumb.Item>
                            <Breadcrumb.Item>Stocks</Breadcrumb.Item>
                            <Breadcrumb.Item>Information</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <div className="App">

                                <WrappedHorizontalSearchForm/>

                                <ResultTable
                                    data={this.state.data}
                                    loading={this.state.loading}
                                />


                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>

        );
    }
}

export default App;