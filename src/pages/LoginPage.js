import React, {Component} from 'react';
import { connect } from 'react-redux'

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
    }


    render() {
        console.log('this.props: ',this.props.users.loggedIn)
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' value={this.state.username} name='username' onChange={this.handleChange}/>
                    <input type='text' value={this.state.password} name='password' onChange={this.handleChange}/>
                    <input type='submit' />
                </form>
                {(this.props.users.loggedIn)? <p>loggin success!!! WOOOOO</p> : <p>XX</p>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.users.user)
    return {users: state.users.user}
  }

export default connect(mapStateToProps)(LoginPage)