import React, {Component} from 'react';

export default class LoginPage extends Component {

    state = {
        name: '',
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
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' value={this.state.name} name='name' onChange={this.handleChange}/>
                    <input type='text' value={this.state.password} name='password' onChange={this.handleChange}/>
                    <input type='submit' />
                </form>
            </div>
        )
    }
}