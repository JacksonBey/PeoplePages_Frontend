import React, {Component} from 'react';
import { connect } from 'react-redux'
import {getNotifications} from '../actions/notifications'
import PPlogo from '../images/PPlogo.png'


class LoginPage extends Component {

    state = {
        username: '',
        password: ''
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('this.state: ' ,this.state)
        this.props.handleLogin(this.state)
        this.props.getNotifications()
    }


    render() {
        return(
            <div className='loginDiv'>
                <span><h2>Welcome</h2></span>
                {(this.props.users.loggedIn)? <button className="button" onClick={this.props.handleLogout}>LogOut</button> : 
                                <form className='loginForm' onSubmit={this.handleSubmit}>
                                    <label>Username:
                                <input type='text' value={this.state.username} name='username' onChange={this.handleChange}/>
                                </label>
                                <li className="spacer"></li>
                                <label> Password:
                                <input type='password' value={this.state.password} name='password' onChange={this.handleChange}/>
                                </label>
                                <li className="spacer"></li>
                                <input className="button" type='submit' />
                            </form>
                            }
                {this.props.users.error ? <p style={{ color: 'red' }}>Invalid username or password</p> : null}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getNotifications: () => dispatch(getNotifications({type: 'GET_NOTIFICATIONS'}))
  })

const mapStateToProps = state => {
    return {users: state.users.user}
  }

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)