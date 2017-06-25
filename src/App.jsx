import React from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import UserList from './components/userlist';
import About from './About.jsx';


export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            users: [],
            username: '',
            email: '',
            password: '',
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers() {
        console.log(`get service url ---> ${process.env.REACT_APP_USERS_SERVICE_URL}/users`);
        axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
            .then((res) => {
                console.log(res.data.data.users);
                this.setState({ users: res.data.data.users });
            })
    }

    handleChange(evt) {
        if (evt.target.name === 'username') {
            this.setState({ username: evt.target.value })
        } else if (evt.target.name === 'email') {
            this.setState({ email: evt.target.value })
        } else if (evt.target.name === 'password') {
            this.setState({ password: evt.target.value })
        }
    }

    handleSubmit(evt) {
        evt.preventDefault();
        const data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        };
        console.log(`post service url ---> ${process.env.REACT_APP_USERS_SERVICE_URL}/users`);
        axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
            .then(() => {
                this.getUsers();
                this.setState({ username: '', email: '', password: '' });
            })
            .catch((error) => { console.log(error)})
    }

    _renderAddUser() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                    <input
                        name="username"
                        className="form-control input-lg"
                        type="text"
                        placeholder="Enter a username"
                        required
                        value={this.state.username}
                        onChange={this.handleChange.bind(this)}
                    />
                </div>
                <div className="form-group">
                    <input
                        name="email"
                        className="form-control input-lg"
                        type="email"
                        placeholder="Enter an email address"
                        required
                        value={this.state.email}
                        onChange={this.handleChange.bind(this)}
                    />
                </div>
                <div className="form-group">
                    <input
                        name="password"
                        className="form-control input-lg"
                        type="password"
                        placeholder="Enter an password"
                        required
                        value={this.state.password}
                        onChange={this.handleChange.bind(this)}
                    />
                </div>
                <input
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                    value="Submit"
                />
            </form>
        )
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <br/>
                        <Switch>
                            <Route exact path="/" render={() => (
                                <div>
                                    {this._renderAddUser()}
                                    <br/>
                                    <h1>All Users</h1>
                                    <hr/><br/>
                                    <UserList users={this.state.users} />
                                </div>
                            )}/>
                            <Route exact path="/about" render={About}/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}
