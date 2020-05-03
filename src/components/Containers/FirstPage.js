import React, {Component} from 'react';
import {connect} from "react-redux";
import {Col, NavDropdown, Row} from "react-bootstrap";
import {logout} from "../../store/actions/authAction";
import {NavLink} from "react-router-dom";
import {Line} from 'react-chartjs-2';

class FirstPage extends Component {
    //
    // data = {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //     datasets: [
    //         {
    //             label: 'Project data',
    //             fill: false,
    //             lineTension: 0.1,
    //             backgroundColor: 'rgba(75,192,192,0.4)',
    //             borderColor: 'rgba(75,192,192,1)',
    //             borderCapStyle: 'none',
    //             borderDash: [],
    //             borderDashOffset: 0.0,
    //             borderJoinStyle: 'miter',
    //             pointBorderColor: 'rgba(75,192,192,1)',
    //             pointBackgroundColor: '#fff',
    //             pointBorderWidth: 1,
    //             pointHoverRadius: 5,
    //             pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    //             pointHoverBorderColor: 'rgba(220,220,220,1)',
    //             pointHoverBorderWidth: 2,
    //             pointRadius: 1,
    //             pointHitRadius: 10,
    //             data: [65, 59, 80, 81, 56, 55, 40]
    //         }
    //     ]
    // };
    //
    // options = {
    //     scales: {
    //         xAxes: [{
    //             gridLines: {
    //                 color: "rgba(0, 0, 0, 0)",
    //             }
    //         }],
    //         yAxes: [{
    //             gridLines: {
    //                 color: "rgba(0, 0, 0, 0)",
    //             }
    //         }]
    //     }
    // }

    render() {
        return (
            <div className={'FirstPage container-fluid'}>
                <Row>
                    <Col lg={1} className={'FirstPage__nav'}>
                    </Col>
                    <Col lg={11} className={'FirstPage__content'}>
                        <div className="header">
                            <p>Search</p>
                            <div className="person">
                                <NavDropdown title={localStorage.name} id={'dropdown'}>
                                    <NavLink to={'/profile'} className={'dropdown-item'}>Profile</NavLink>
                                    <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Logs</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavLink to={'/'} exact className={'dropdown-item'} onClick={this.props.logout}>Log out</NavLink>
                                </NavDropdown>
                            </div>
                        </div>
                        <div className="main">
                            <h1>Information</h1>
                            {/*<Line ref="chart" data={this.data} options={this.options}/>*/}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstPage);