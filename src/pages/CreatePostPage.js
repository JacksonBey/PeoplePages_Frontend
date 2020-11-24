import React, {Component} from 'react';
import jwt_decode from "jwt-decode";
import { connect } from 'react-redux'

class CreatePostPage extends Component {
    state = {
        content: '',
        userId: '',
        username: ''
    }

    componentDidMount = () => {
        let token= localStorage.getItem('token')
        let userId = jwt_decode(token).user_id
        let username = this.props.user.firstName + ' ' + this.props.user.lastNameInitial + '.'
        // console.log(userId)
        this.setState({
            userId,
            username
        })
        // console.log('user: ', this.props.user)

        // console.log('username: ', username)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.createPost(this.state)
        this.setState({
            content: ''
        })
    }


    render() {
        // console.log('posts errors: ', this.props.posts)
        return(
            <div>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' name='content' value={this.state.content} onChange={this.handleChange}/>
                    <input type='submit' />

                </form>
                <br/>
                <p style={{ color: 'red' }}>{localStorage.getItem('post_error')}</p>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    user: state.users.user,
    posts: state.posts
})
export default connect(mapStateToProps)(CreatePostPage)