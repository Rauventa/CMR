import React, {Component} from 'react';
import {Alert, Button, Col, Form, OverlayTrigger, Popover} from "react-bootstrap";
import {Link, NavLink, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {auth} from "../../store/actions/authAction";

class Registration extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: ''
    };


    registerHandler = (event) => {
        event.preventDefault();
        this.props.auth(
            this.state.email,
            this.state.password,
            false,
            this.state.firstName,
            this.state.lastName
        );
    };

    setNameHandler = event => {
        const data = event.target.value;
        this.setState({
            firstName: data
        })
    };

    setSurnameHandler = event => {
        const data = event.target.value;
        this.setState({
            lastName: data
        })
    };

    setEmailHandler = event => {
        const data = event.target.value;
        this.setState({
            email: data
        })
    };

    setPasswordHandler = event => {
        const data = event.target.value;
        this.setState({
            password: data
        })
    };

    repeatPasswordHandler = event => {
        const data = event.target.value;
        this.setState({
            repeatPassword: data
        })
    };

    render() {
        return (
            <div className={'Registration container'}>
                {(this.props.isUsedMail === '') ? null :
                    <small className={'wrong'}>{this.props.isUsedMail}</small>
                }
                <div className="Registration__main row">
                    <Col lg={5} className={'Registration__main_img'}></Col>
                    <Col lg={7} className={'Registration__main_form'}>
                        <h3>Create an account!</h3>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="firstName">
                                    <Form.Control type="text" placeholder="First name" onChange={this.setNameHandler}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="lastName">
                                    <Form.Control type="text" placeholder="Last name" onChange={this.setSurnameHandler} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Enter E-mail" onChange={this.setEmailHandler} />
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Password" onChange={this.setPasswordHandler} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Repeat Password" onChange={this.repeatPasswordHandler} />
                                </Form.Group>
                            </Form.Row>
                            {(this.state.firstName === '' || this.state.lastName === '' || this.state.email === '' || this.state.password === '' || this.state.repeatPassword === '') || (this.state.password !== this.state.repeatPassword) || (this.state.password.length < 6) ?
                                <Button disabled variant="success" type="submit" onClick={this.registerHandler}>
                                    Register account
                                </Button>
                                :
                                <Button variant="success" type="submit" onClick={this.registerHandler}>
                                    Register account
                                </Button>
                            }
                            <hr/>
                            <Button disabled variant="danger" type="submit" style={{marginBottom: '20px'}}>
                                Register with Google
                            </Button>
                            <Button disabled variant="primary" type="submit">
                                Register with Facebook
                            </Button>
                            <hr/>
                            <NavLink to={'/resetpassword'} exact>
                                Forgot password?
                            </NavLink>
                            <NavLink to={'/'} exact>
                                Already have an account? Login!
                            </NavLink>
                        </Form>
                    </Col>
                </div>
                {this.props.isRegSuccess === true ?
                    <Redirect to={'/'} /> :
                    null
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isUsedMail: state.authReducer.isUsedMail,
        isRegSuccess: state.authReducer.isRegSuccess
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin, firstName, lastName) => dispatch(auth(email, password, isLogin, firstName, lastName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);