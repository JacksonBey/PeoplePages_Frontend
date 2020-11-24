import React, {Component} from 'react';
import { connect } from 'react-redux'
import { editPost, deletePost } from '../actions/postUD';

class DisplayPostPage extends Component {

    // componentDidMount() {
    //     // console.log('porps posts: ', this.props.posts[0].id)
    //     // console.log('postId: ', this.props.match.params.postId)
    //     let post = this.props.posts.find(post => post.id == this.props.match.params.postId)
    //     // console.log(post)
    // }

    state = {
        post: this.props.posts.find(post => post.id === parseInt(this.props.match.params.postId)),
        edit: false,
        content: ''
    }


    toggleEdit = () => {
        let nedit = !this.state.edit
        this.setState({
            edit: nedit
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.editPost(this.state)
        this.setState({
            content: ''
        })
    }

    handleDelete = (e) => {
        console.log('delete hit')
        this.props.deletePost(this.state)
        this.setState({
            content: '',
            post: {content: 'DELETED'}
        })
    }



    render() {
        // console.log('posts display props: ', this.props)
        // console.log('postId: ', this.props.match.params.postId)
        let poster = false
        // console.log('userprops', this.props.user)
        // console.log('this.porsp post', this.props.posts)
        if (this.props.user.loggedIn !== false && this.props.posts !== [] && this.state.post !== undefined) {poster = (this.props.user.user_id === this.state.post.user_id)}
        if (this.props.posts === undefined || this.props.posts === [] || this.state.post === undefined) {
            return <div>hi</div>
        
        } else {
            return(
                <div>
                    <p>hi from DisplayPostPage</p>
            <p>content: {this.state.post.content}</p>
            {poster ? ( <div><button onClick={this.toggleEdit}>&#x270E;</button> <button onClick={this.handleDelete}>delete?</button> </div>): null}
            {(this.state.edit) ?                 <form onSubmit={this.handleSubmit}>
                        <input type='text' name='content' value={this.state.content} onChange={this.handleChange} placeholder={this.state.post.content}/>
                        <input type='submit' />
    
                    </form> 
                    : null }
                </div>
             ) }
    }
}

const mapStateToProps = state => {
    return {posts: state.posts.posts, user: state.users.user}
  }

  const mapDispatchToProps = dispatch => ({
    editPost: (text) => dispatch(editPost(text)),
    deletePost: (text) => dispatch(deletePost(text))
  })

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPostPage)