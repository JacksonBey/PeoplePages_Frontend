import React, {Component} from 'react';
import { connect } from 'react-redux'
import {getNotifications} from '../actions/notifications'


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
        console.log('this.props: ',this.props)
        return(
            <div>
                
                {(this.props.users.loggedIn)? <button onClick={this.props.handleLogout}>LogOut</button> : 
                                <form onSubmit={this.handleSubmit}>
                                <input type='text' value={this.state.username} name='username' onChange={this.handleChange}/>
                                <input type='text' value={this.state.password} name='password' onChange={this.handleChange}/>
                                <input type='submit' />
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
    // console.log(state.users.user)
    return {users: state.users.user}
  }

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)