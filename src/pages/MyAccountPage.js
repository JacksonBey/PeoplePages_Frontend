import React, {Component} from 'react';
import { connect } from 'react-redux'
import jwt_decode from "jwt-decode";

class MyAccountPage extends Component {

    state = {
        isEdit: false,
        userId: '',
        firstName: '',
        lastNameInitial: '',
        age: '',
        location: ''
    }

    componentDidMount = () => {
        let token= localStorage.getItem('token')
        let userId = jwt_decode(token).user_id
        // console.log(userId)
        this.setState({
            userId
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleEditInfo(this.state)
    }

    handleEditClick = () => {
        let nEdit = !this.state.isEdit
        this.setState({
            isEdit: nEdit
        })
    }



    render() {
        // console.log('user props: ',this.props.user)
        let {user, firstName, lastNameInitial, age, location} = this.props.user
        return(
            <div>
                <p>User: {user}</p>
                <p>First Name: {firstName}</p>
                <p>Last Name Initial: {lastNameInitial}</p>
                <p>Age: {age}</p>
                <p>Location: {location}</p>
                <button onClick={this.handleEditClick}>Edit/ Add Info</button>
                {this.state.isEdit ?
                    <form onSubmit={this.handleSubmit}>
                        <label>First Name: 
                        <input type='text' name='firstName' value={this.state.firstName} onChange={this.handleChange} placeholder={firstName}/>
                        </label>
                        <label>Last Name Initial: 
                        <input type='text' name='lastNameInitial' value={this.state.lastNameInitial} onChange={this.handleChange} placeholder={lastNameInitial}/>
                        </label>
                        <label>Age: 
                        <input type='text' name='age' value={this.state.age} onChange={this.handleChange} placeholder={age}/>
                        </label>
                        <label>Location: 
                        <input type='text' name='location' value={this.state.location} onChange={this.handleChange} placeholder={location}/>
                        </label>
                        <input type='submit' />

                    </form>
                    : null}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.users.user
})

export default connect(mapStateToProps)(MyAccountPage)