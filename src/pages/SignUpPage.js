import React, {Component} from 'react';
// import { connect } from 'react-redux'

 class SignUpPage extends Component {

    state = {
        username: '',
        password: '',
        firstName: '',
        lastNameInitial: ''
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
        console.log('error mesage', localStorage.getItem('signup_error'))
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label> Username: 
                    <input type='text' name='username' value={this.state.username} onChange={this.handleChange}/>
                    </label>
                    <label> Password: 
                    <input type='text' name='password' value={this.state.password} onChange={this.handleChange}/>
                    </label>
                    <label>First Name: 
                    <input type='text' name='firstName' value={this.state.firstName} onChange={this.handleChange}/>
                    </label>
                    <label>Last Name Initial: 
                    <input type='text' name='lastNameInitial' value={this.state.lastNameInitial} onChange={this.handleChange}/>
                    </label>
                    <input type='submit' />

                </form>
                <p style={{ color: 'red' }}>{localStorage.getItem('signup_error')}</p>
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