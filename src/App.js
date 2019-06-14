import React, {Component} from 'react';
import {Table, Menu, Icon, Button, Input, Layout, Breadcrumb, Modal, Card} from 'antd';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Highlighter from 'react-highlight-words';
import ReactEcharts from 'echarts-for-react';
import './App.css';
import reqwest from 'reqwest';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

class ResultTable extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        searchText: '',
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({searchText: selectedKeys[0]});
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ''});
    };

    render() {
        const columns = [
            {
                title: 'Code',
                dataIndex: 'stock_id',
                key: 'stock_id',
                width: '20%',
                ...this.getColumnSearchProps('stock_id'),
            },
            {
                title: 'Name',
                dataIndex: 'stock_name',
                key: 'stock_name',
                width: '20%',
                ...this.getColumnSearchProps('stock_name'),
            },
            {
                title: 'Price',
                dataIndex: 'stock_price',
                key: 'stock_price',
                width: '15%',
            },
            {
                title: 'High',
                dataIndex: 'upper_limit',
                key: 'upper_limit',
                width: '15%',
            },
            {
                title: 'Low',
                dataIndex: 'lower_limit',
                key: 'lower_limit',
                width: '15%',
            },
            {
                title: 'State',
                dataIndex: 'stock_state',
                key: 'stock_state',
                width: '15%',
                ...this.getColumnSearchProps('stock_state'),
            },
        ];
        return <Table columns={columns} dataSource={this.props.data}/>;
    }
}

class ResultTable_deal extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        searchText: '',
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({searchText: selectedKeys[0]});
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ''});
    };

    render() {
        const columns = [
            {
                title: 'Key',
                dataIndex: 'key',
                key: 'key',
                width: '20%',
                ...this.getColumnSearchProps('key'),
            },
            {
                title: 'SellOrBuy',
                dataIndex: 'SellOrBuy',
                key: 'SellOrBuy',
                width: '20%',
                ...this.getColumnSearchProps('SellOrBuy'),
            },
            {
                title: 'stockID',
                dataIndex: 'stockID',
                key: 'stockID',
                width: '15%',
            },
            {
                title: 'number',
                dataIndex: 'number',
                key: 'number',
                width: '15%',
            },
            {
                title: 'time',
                dataIndex: 'time',
                key: 'time',
                width: '15%',
            },
            {
                title: 'states',
                dataIndex: 'states',
                key: 'states',
                width: '15%',
                ...this.getColumnSearchProps('states'),
            },
        ];
        return <Table columns={columns} dataSource={this.props.data}/>;
    }
}

class StockHelp extends Component {
    state = {visible: false};

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Help
                </Button>
                <Modal
                    title="Stock Filter Guide"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>
                        <Icon type="search" style={{color: '#1890ff'}}/> Find stock name by code:
                        filter stock code
                    </p>
                    <p>
                        <Icon type="search" style={{color: '#1890ff'}}/> Find stock code by name:
                        filter stock name
                    </p>
                    <p>
                        <Icon type="search" style={{color: '#1890ff'}}/> Only show stocks not suspended:
                        filter stock state
                    </p>
                </Modal>
            </div>
        );

    }
}

class PanelStockInformation extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        data: [],
        loading: false
    };

    /**
     * fetch JSON data
     */
    fetch = () => {
        this.setState({loading: true});
        reqwest({
	//url: '/st_new.json',
            url: 'http:/10.180.173.191:8080/TransactionManager_war_exploded/stock/all?authority=2',
            method: 'get',
            type: 'json',
        }).then(data => {
            this.setState({
                loading: false,
                data: data.stocks,
            });
        });
    };

    componentDidMount() {
        this.fetch();
    }

    render() {
        return (
            <div>
                <div className="Instruction">
                    <StockHelp/>
                </div>
                <div className="Table" style={{paddingTop: '15px'}}>
                    <ResultTable
                        {...this.state}
                    />
                </div>
            </div>
        );
    }
}

function showPanelStockInformation() {
    return new PanelStockInformation();
}

class PanelStockdealInformation extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        data: [],
        loading: false
    };

    /**
     * fetch JSON data
     */
    fetch = () => {
        this.setState({loading: true});
        reqwest({
            url: '/deal.json',
            method: 'get',
            type: 'json',
        }).then(data => {
            this.setState({
                loading: false,
                data: this.state.data.concat(data.results),
            });
        });
        reqwest({
            url: '/deal_add.json',
            method: 'get',
            type: 'json',
        }).then(data => {
            this.setState({
                loading: false,
                data: this.state.data.concat(data.results),
            });

        });
    };

    componentDidMount() {
        this.fetch();
    }

    render() {
        return (
            <div>
                <div className="Instruction">
                    <StockHelp/>
                </div>
                <div className="Table_deal" style={{paddingTop: '15px'}}>
                    <ResultTable_deal
                        {...this.state}
                    />
                </div>
            </div>
        );
    }
}

function showPanelStockdealInformation() {
    return new PanelStockdealInformation();
}

class PanelAccountInformation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div></div>
        );
    }
}

function showPanelAccountInformation() {
    return new PanelAccountInformation();
}

class PanelAccountUpgrade extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div></div>
        );
    }
}

function showPanelAccountUpgrade() {
    return new PanelAccountUpgrade();
}

class About extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>© Tianyang Zheng, Hongjia Xu.</p>
                <p>All rights reserved.</p>
            </div>
        );
    }
}

function showAbout() {
    return new About();
}

function splitData(rawData) {
    var categoryData = [];
    var values = []
    for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i])
    }
    return {
        categoryData: categoryData,
        values: values
    };
}

class Kline extends Component {
    constructor(props) {
        super(props);
    }

    data0: [[2320.26, 2320.26, 2287.3, 2362.94],
        [2300, 2291.3, 2288.26, 2308.38],
        [2295.35, 2346.5, 2295.35, 2346.92],
        [2347.22, 2358.98, 2337.35, 2363.8],
        [2360.75, 2382.48, 2347.89, 2383.76],
        [2383.43, 2385.42, 2371.23, 2391.82],
        [2377.41, 2419.02, 2369.57, 2421.15]
        ]
    data1: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    getOption = () => {
        let option = {
            title: {
                text: '大盘',
                x: 'center'
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                min: 2200

            },

            series: [{
                type: 'k',
                data: [[2320.26, 2320.26, 2287.3, 2362.94],
                    [2300, 2291.3, 2288.26, 2308.38],
                    [2295.35, 2346.5, 2295.35, 2346.92],
                    [2347.22, 2358.98, 2337.35, 2363.8],
                    [2360.75, 2382.48, 2347.89, 2383.76],
                    [2383.43, 2385.42, 2371.23, 2391.82],
                    [2377.41, 2419.02, 2369.57, 2421.15]
                ]
            }]
        };
        return option
    };

    render() {
        return (
            <div>
                <Card title="K线图">
                    <ReactEcharts option={this.getOption()} theme="Imooc" style={{height: '400px'}}/>
                </Card>

            </div>
        )
    }
}

function showKline() {
    return new Kline();
}

class App extends Component {

    render() {
        return (
            /* layout */
            <Router>
                <Layout>
                    <Header className="header">
                        <div className="logo"/>
                        <Menu theme="dark"
                              mode="horizontal"
                              defaultSelectedKeys={['1']}
                              style={{lineHeight: '64px'}}
                        >
                            <Menu.Item key="1">
                                <Link to={`/panel/stocks/all`}>Panel</Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to={`/about`}>About</Link>
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Layout>
                        <Route exact path="/panel/*" component={() => {
                            return (
                                <Sider width={200} style={{background: '#fff'}}>
                                    <Menu
                                        mode="inline"
                                        defaultSelectedKeys={['1']}
                                        defaultOpenKeys={['sub1']}
                                        style={{height: '100%', borderRight: 0}}
                                    >
                                        <SubMenu
                                            key="sub1"
                                            title={<span> <Icon type={"search"}/>Stocks</span>}
                                        >
                                            <Menu.Item key="1">
                                                <Link to={`/panel/stocks/all`}>All</Link>
                                            </Menu.Item>
                                            <Menu.Item key="6">
                                                <Link to={`/panel/stocks/Kline`}>Kline</Link>
                                            </Menu.Item>
                                            <Menu.Item key="5">
                                                <Link to={`/panel/stocks/deal`}>Deal</Link>
                                            </Menu.Item>

                                        </SubMenu>
                                        <SubMenu
                                            key="sub2"
                                            title={<span> <Icon type="user"/>Account</span>}
                                        >
                                            <Menu.Item key="2">
                                                <Link to={`/panel/account/info`}>Information</Link>
                                            </Menu.Item>
                                            <Menu.Item key="3">
                                                <Link to={`/panel/account/upgrade`}>Upgrade</Link>
                                            </Menu.Item>
                                        </SubMenu>
                                    </Menu>
                                </Sider>
                            )
                        }}/>
                        <Route exact path="/about" component={() => {
                            return (
                                <Sider width={200} style={{background: '#fff'}}>
                                    <Menu
                                        mode="inline"
                                        defaultSelectedKeys={['1']}
                                        defaultOpenKeys={['sub1']}
                                        style={{height: '100%', borderRight: 0}}
                                    >
                                        <Menu.Item key="8">
                                            <span><Icon type={"info"}/>About</span>
                                        </Menu.Item>
                                    </Menu>
                                </Sider>
                            )
                        }}/>
                        <Layout style={{padding: '0 24px 24px'}}>
                            <Route exact path="/" component={() => {
                                return <Breadcrumb.Item/>
                            }}/>
                            <Route exact path="/panel/stocks/all" component={() => {
                                return (
                                    <Breadcrumb style={{margin: '16px 0'}}>
                                        <Breadcrumb.Item>Panel</Breadcrumb.Item>
                                        <Breadcrumb.Item>Stocks</Breadcrumb.Item>
                                        <Breadcrumb.Item>All</Breadcrumb.Item>
                                    </Breadcrumb>
                                )
                            }}/>
                            <Route exact path="/panel/stocks/deal" component={() => {
                                return (
                                    <Breadcrumb style={{margin: '16px 0'}}>
                                        <Breadcrumb.Item>Panel</Breadcrumb.Item>
                                        <Breadcrumb.Item>Stocks</Breadcrumb.Item>
                                        <Breadcrumb.Item>Deal</Breadcrumb.Item>
                                    </Breadcrumb>
                                )
                            }}/>
                            <Route exact path="/panel/stocks/Kline" component={() => {
                                return (
                                    <Breadcrumb style={{margin: '16px 0'}}>
                                        <Breadcrumb.Item>Panel</Breadcrumb.Item>
                                        <Breadcrumb.Item>Stocks</Breadcrumb.Item>
                                        <Breadcrumb.Item>Kline</Breadcrumb.Item>
                                    </Breadcrumb>
                                )
                            }}/>
                            <Route exact path="/panel/account/info" component={() => {
                                return (
                                    <Breadcrumb style={{margin: '16px 0'}}>
                                        <Breadcrumb.Item>Panel</Breadcrumb.Item>
                                        <Breadcrumb.Item>Account</Breadcrumb.Item>
                                        <Breadcrumb.Item>Information</Breadcrumb.Item>
                                    </Breadcrumb>
                                )
                            }}/>
                            <Route exact path="/panel/account/upgrade" component={() => {
                                return (
                                    <Breadcrumb style={{margin: '16px 0'}}>
                                        <Breadcrumb.Item>Panel</Breadcrumb.Item>
                                        <Breadcrumb.Item>Account</Breadcrumb.Item>
                                        <Breadcrumb.Item>Upgrade</Breadcrumb.Item>
                                    </Breadcrumb>
                                )
                            }}/>
                            <Route exact path="/about" component={() => {
                                return (
                                    <Breadcrumb style={{margin: '16px 0'}}>
                                        <Breadcrumb.Item>About</Breadcrumb.Item>
                                    </Breadcrumb>
                                )
                            }}/>

                            <Content
                                style={{
                                    background: '#fff',
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <Route exact path="/" component={showPanelStockInformation}/>
                                <Route exact path="/panel/stocks/all" component={showPanelStockInformation}/>
                                <Route exact path="/panel/stocks/deal" component={showPanelStockdealInformation}/>
                                <Route exact path="/panel/stocks/Kline" component={showKline}/>
                                <Route exact path="/panel/account/info" component={showPanelAccountInformation}/>
                                <Route exact path="/panel/account/upgrade" component={showPanelAccountUpgrade}/>
                                <Route exact path="/about" component={showAbout}/>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </Router>

        );
    }
}

export default App;
