import React, {Component} from 'react';
// import { connect } from 'react-redux'
import { storage } from '../firebase'

 class SignUpPage extends Component {

    state = {
        username: '',
        password: '',
        firstName: '',
        lastNameInitial: '',
        profilePic: ''
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

    //image stuff


    handleFileChange = e => {
        if (e.target.files[0]) {
            this.setState({
                ...this.state,
                profilePic: e.target.files[0]
            }, () => {
                this.handleUpload()
            })
        }
    }

    handleUpload = () => {
        const uploadTask = storage.ref(`profilePics/${this.state.profilePic.name}`).put(this.state.profilePic)
        uploadTask.on(
            'state_changed',
            snapshot => {},
            error => { console.log(error) },
            () => {
                storage
                    .ref('profilePics')
                    .child(this.state.profilePic.name)
                    .getDownloadURL()
                    .then( url => {
                        console.log(url)
                        this.setState({
                            profilePic: url
                        })
                    })
            }
        )
    }

    //end of image stuff


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
                    <label>Profile Image Url:
                    <input type='text' name='profilePic' value={this.state.profilePic} onChange={this.handleChange}/>
                    </label>
                    <label>Upload Profile Image:
                    <input type='file' name='profilePic' accept='image/*' onChange={this.handleFileChange}/>
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