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
        this.setState({
            userId,
            username
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    createNewPost= async (state) => {
        return await Promise.resolve(this.props.createPost((state)))
  
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.createNewPost(this.state).then(this.props.handleCreation())
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
        return(
            <div className="formDiv">
                <br/>
                <form className='postForm' onSubmit={this.handleSubmit}>
                    <label>Text:
                    <input type='text' name='content' value={this.state.content} onChange={this.handleChange}/>
                    </label>
                    <li className="spacer" key="dsaf"> </li>
                    <label>Image Url:
                    <input type='text' name='image' value={this.state.image} onChange={this.handleChange}/>
                    </label>
                    <li className="spacer" key="sfasf"></li>
                    <label>Upload Image:
                    <input className="uploadButton" type='file' name='image' accept='image/*' onChange={this.handleFileChange}/>
                    </label>
                    <input className="button" type='submit' />

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