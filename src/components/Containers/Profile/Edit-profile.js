import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {Button, Col, Form, ProgressBar} from "react-bootstrap";
import axios from "axios";
import { storage } from "../../../firebase";
import {connect} from "react-redux";
import {auth, logout} from "../../../store/actions/authAction";
import {
    emailHandler, githubHandler, handleChange,
    loadData,
    nameHandler, nicknameHandler,
    positionHandler, sendDataHandler,
    surNameHandler, teleHandler, vkHandler
} from "../../../store/actions/profileAction";

class EditProfile extends Component {

    componentDidMount() {
        this.props.loadData()
    }

    updateInfo = event => {
        event.preventDefault();
        this.props.sendDataHandler(
            this.props.name,
            this.props.surName,
            this.props.email,
            this.props.url,
            this.props.position,
            this.props.nickname,
            this.props.vk,
            this.props.tele,
            this.props.github,
        )
    };

    render() {
        return (
            <div className={'Edit-profile'}>
                <div className="Edit-profile__content container">
                    <div className="header">
                        <h3>Edit your profile</h3>
                        <NavLink to={'/profile'}>← Go back</NavLink>
                    </div>
                    <div className="row changing">
                        <div className="col-lg-4 image-change">
                            <img src={this.props.url || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1200px-Placeholder_no_text.svg.png"} alt=""/>
                            <Form>
                                <Form.File
                                    custom
                                    id="avatar"
                                    label="Select your avatar picture"
                                    onChange={this.props.handleChange}
                                />
                                <ProgressBar animated striped variant="danger" now={this.props.progress} />
                            </Form>
                        </div>
                        <div className="col-lg-8 info-change">
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control defaultValue={this.props.currentData.firstName} type="text" placeholder="Alex" onChange={this.props.nameHandler}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="surname">
                                        <Form.Label>Surname</Form.Label>
                                        <Form.Control defaultValue={this.props.currentData.lastName} type="text" placeholder="Alecto" onChange={this.props.surNameHandler} />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group controlId="email">
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control defaultValue={this.props.currentData.email} type="email" placeholder="rauventa@gmail.com" onChange={this.props.emailHandler} />
                                </Form.Group>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="position">
                                        <Form.Label>Position</Form.Label>
                                        <Form.Control onChange={this.props.positionHandler}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="nickname">
                                        <Form.Label>Nickname</Form.Label>
                                        <Form.Control onChange={this.props.nicknameHandler}/>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="vk-link">
                                        <Form.Label>VK link</Form.Label>
                                        <Form.Control onChange={this.props.vkHandler} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="telegram-link">
                                        <Form.Label>Telegram link</Form.Label>
                                        <Form.Control onChange={this.props.teleHandler} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="github-link">
                                        <Form.Label>GitHub link</Form.Label>
                                        <Form.Control onChange={this.props.githubHandler} />
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                        </div>
                        <Button variant="primary" type="submit" onClick={this.updateInfo}>
                            Confirm changes
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentId: state.profileReducer.currentId,
        currentData: state.profileReducer.currentData,
        image: state.profileReducer.image,
        url: state.profileReducer.url,
        progress: state.profileReducer.progress,
        name: state.profileReducer.name,
        surName: state.profileReducer.surName,
        email: state.profileReducer.email,
        position: state.profileReducer.position,
        nickname: state.profileReducer.nickname,
        vk: state.profileReducer.vk,
        tele: state.profileReducer.tele,
        github: state.profileReducer.github,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadData: () => dispatch(loadData()),
        nameHandler: (event) => dispatch(nameHandler(event)),
        surNameHandler: (event) => dispatch(surNameHandler(event)),
        emailHandler: (event) => dispatch(emailHandler(event)),
        positionHandler: (event) => dispatch(positionHandler(event)),
        nicknameHandler: (event) => dispatch(nicknameHandler(event)),
        vkHandler: (event) => dispatch(vkHandler(event)),
        teleHandler: (event) => dispatch(teleHandler(event)),
        githubHandler: (event) => dispatch(githubHandler(event)),
        handleChange: (event) => dispatch(handleChange(event)),
        sendDataHandler: (firstName, lastName, email, url, position, nickname, vkLink, teleLink, githubLink) => dispatch(sendDataHandler(firstName, lastName, email, url, position, nickname, vkLink, teleLink, githubLink))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)