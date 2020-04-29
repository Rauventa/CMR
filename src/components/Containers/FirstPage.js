import React, {Component} from 'react';
import {connect} from "react-redux";
import {Col, NavDropdown, Row} from "react-bootstrap";
import {logout} from "../../store/actions/authAction";
import {NavLink} from "react-router-dom";

class FirstPage extends Component {
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