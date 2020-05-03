import React, {Component} from 'react';
import {Button, Card} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import axios from 'axios';

class Profile extends Component {

    state = {
        currentId: '',
        currentData: {}
    };

    async componentDidMount() {
         try {
             const response = await axios.get(`https://rauventa-project.firebaseio.com/persons/${localStorage.userId}.json`);
             Object.entries(response.data).map((preIndex) => {
                 const currentId = preIndex[0];
                 const currentData = preIndex[1];
                 this.setState({
                     currentId,
                     currentData
                 })
             });
         } catch (e) {
             console.log(e)
         }
    }

    render() {
        console.log(this.state.currentData)
        return (
            <div className={'Profile'}>
                <div className="Profile__content container">
                    <div className="header">
                        <h3>Your profile</h3>
                        <NavLink to={'/first'}>← Go back</NavLink>
                    </div>
                    <div className="row profile-about">
                        <div className="col-lg-3 profile-main">
                            <div className="profile-info">
                                <div className="person-img">
                                    <img src={this.state.currentData.url || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1200px-Placeholder_no_text.svg.png"} alt=""/>
                                    <NavLink to={'/edit-profile'} className={'edit'}>
                                        <i className="fa fa-pencil"></i>
                                    </NavLink>
                                </div>
                                <div className="profile-name">
                                    <h4>{`${this.state.currentData.firstName} ${this.state.currentData.lastName}`}</h4>
                                    <h6>{this.state.currentData.nickname}</h6>
                                    <small>Web Developer</small>
                                </div>
                                <div className="socials">
                                    <a href={this.state.currentData.vkLink || '#'} className="social">
                                        <i className='fa fa-vk'></i>
                                    </a>
                                    <a href={this.state.currentData.teleLink || '#'} className="social">
                                        <i className='fa fa-telegram'></i>
                                    </a>
                                    <a href={this.state.currentData.githubLink || '#'} className="social">
                                        <i className='fa fa-github'></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 profile-stats">
                            <Card className={'current-task'}>
                                <Card.Header>Current tasks</Card.Header>
                                <Card.Body>
                                    <Card.Title>Current task</Card.Title>
                                    <Card.Text>
                                        Description + Deadlines
                                    </Card.Text>
                                    <Card.Text>
                                        Current progress
                                    </Card.Text>
                                    <Card.Text>
                                        Task team
                                    </Card.Text>
                                    <Card.Text>
                                        Diagram + Stats
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-lg-4 profile-card">
                            <Card className={'done-tasks'}>
                                <Card.Header>Done tasks</Card.Header>
                                <Card.Body>
                                    <Card.Title>Start CMR</Card.Title>
                                    <Card.Text>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque cum debitis eius excepturi illo, molestias obcaecati quos sunt veritatis! Amet aspernatur cupiditate eius iusto mollitia placeat quia recusandae tempore voluptatibus.
                                    </Card.Text>
                                </Card.Body>
                                <Card.Body>
                                    <Card.Title>Support with React</Card.Title>
                                    <Card.Text>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, commodi doloribus et eum fuga laborum.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className={'complete'}>
                                <Card.Header>Complete</Card.Header>
                                <Card.Text>
                                    2 <span>tasks complteted</span>
                                </Card.Text>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;