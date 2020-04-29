import React, {Component} from 'react';
import './styles/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Auth/Login";
import Registration from "./components/Auth/Registration";
import {Switch, Route} from 'react-router-dom'
import FirstPage from "./components/Containers/FirstPage";
import Profile from "./components/Containers/Profile/Profile";
import EditProfile from "./components/Containers/Profile/Edit-profile";

class App extends Component {
    render() {
        return (
            <div className={'App'}>
                <Switch>
                    <Route path={'/'} exact>
                        <Login />
                    </Route>
                    <Route path={'/reg'}>
                        <Registration />
                    </Route>
                    <Route path={'/first'}>
                        <FirstPage />
                    </Route>
                    <Route path={'/profile'}>
                        <Profile />
                    </Route>
                    <Route path={'/edit-profile'}>
                        <EditProfile />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default App;