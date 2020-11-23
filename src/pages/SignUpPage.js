import React, {Component} from 'react';
// import { connect } from 'react-redux'

 class SignUpPage extends Component {

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
        this.props.handleSignUp(this.state)
    }


    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' name='username' value={this.state.username} onChange={this.handleChange}/>
                    <input type='text' name='password' value={this.state.password} onChange={this.handleChange}/>
                    <input type='submit' />

                </form>
            </div>
        )
    }
}

// const mapStateToProps = state => {
//     // console.log(state.users.user)
//     return {users: state.users.user}
//   }


// export default connect(mapStateToProps)(SignUpPage)

export default SignUpPage