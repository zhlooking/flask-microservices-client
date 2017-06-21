import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import UserList from './components/userlist';


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            users: [],
            username: '',
            email: '',
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers() {
        axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
            .then((res) => {
                console.log(res.data.data.users);
                this.setState({ users: res.data.data.users });
            })
    }

    handleChange(evt) {
        if (evt.target.name === 'username') {
            this.setState({ username: evt.target.value })
        } else {
            this.setState({ email: evt.target.value })
        }
    }

    handleSubmit(evt) {
        evt.preventDefault();
        const data = {
            username: this.state.username,
            email: this.state.email,
        };
        axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
            .then(() => {
                this.getUsers();
                this.setState({ username: '', email: '' });
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
                    <div className="col-md-4">
                        {this._renderAddUser()}
                        <br/>
                        <h1>All Users</h1>
                        <hr/><br/>
                        <UserList users={this.state.users} />
                    </div>
                </div>
            </div>
        )
    }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
