import React, {Component} from 'react';
import {Button, Col, Form} from "react-bootstrap";
import {NavLink, Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {auth} from "../../store/actions/authAction";

class Login extends Component {

    state = {
        email: '',
        password: ''
    };

    loginHandler = (event) => {
        event.preventDefault();
        this.props.auth(
            this.state.email,
            this.state.password,
            true
        );
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

    render() {
        return (
            <div className={'Login container'}>
                {(this.props.errorMessage === '') ? null :
                    <small className={'wrong'}>{this.props.errorMessage}</small>
                }
                <div className="Login__main row">
                    <Col lg={6} className={'Login__main_img'}>

                    </Col>
                    <Col lg={6} className={'Login__main_form'}>
                        <h3>Welcome back!</h3>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Enter email" onChange={this.setEmailHandler} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" onChange={this.setPasswordHandler} />
                            </Form.Group>
                            <Button variant="success" type="submit" onClick={this.loginHandler}>
                                Login
                            </Button>
                            <hr/>
                            <Button disabled variant="danger" type="submit" style={{marginBottom: '20px'}}>
                                Login with Google
                            </Button>
                            <Button disabled variant="primary" type="submit">
                                Login with Facebook
                            </Button>
                            <hr/>
                            <NavLink to={'/resetpassword'} exact>
                                Forgot password?
                            </NavLink>
                            <NavLink to={'/reg'}>
                                Create an Account!
                            </NavLink>
                        </Form>
                    </Col>
                </div>
                {localStorage.token !== undefined ?
                    <Redirect to={'/first'} /> :
                    null
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.authReducer.errorMessage,
        token: state.authReducer.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);