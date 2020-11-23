import React, {Component} from 'react';
import jwt_decode from "jwt-decode";

export default class CreatePostPage extends Component {
    state = {
        content: '',
        userId: ''
    }

    componentDidMount = () => {
        let token= localStorage.getItem('token')
        let userId = jwt_decode(token).user_id
        console.log(userId)
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
        this.props.createPost(this.state)
    }


    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' name='content' value={this.state.content} onChange={this.handleChange}/>
                    <input type='submit' />

                </form>
            </div>
        )
    }
}