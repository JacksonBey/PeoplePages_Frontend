import React, {Component} from 'react';
import jwt_decode from "jwt-decode";
import { connect } from 'react-redux'
import { storage } from '../firebase'

class CreatePostPage extends Component {
    state = {
        content: '',
        userId: '',
        username: '',
        image: ''
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
            content: '',
            image: ''
        })
    }

    handleFileChange = e => {
        if (e.target.files[0]) {
            this.setState({
                ...this.state,
                image: e.target.files[0]
            }, () => {
                this.handleUpload()
            })
        }
    }

    handleUpload = () => {
        const uploadTask = storage.ref(`postImages/${this.state.image.name}`).put(this.state.image)
        uploadTask.on(
            'state_changed',
            snapshot => {},
            error => { console.log(error) },
            () => {
                storage
                    .ref('postImages')
                    .child(this.state.image.name)
                    .getDownloadURL()
                    .then( url => {
                        console.log(url)
                        this.setState({
                            image: url
                        })
                    })
            }
        )
    }


    render() {
        // console.log('posts errors: ', this.props.posts)
        return(
            <div>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <label>Text:
                    <input type='text' name='content' value={this.state.content} onChange={this.handleChange}/>
                    </label>
                    <label>Image Url:
                    <input type='text' name='image' value={this.state.image} onChange={this.handleChange}/>
                    </label>
                    <label>Upload Image:
                    <input type='file' name='image' accept='image/*' onChange={this.handleFileChange}/>
                    </label>
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