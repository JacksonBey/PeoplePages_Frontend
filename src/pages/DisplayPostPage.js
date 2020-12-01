import React, {Component} from 'react';
import { connect } from 'react-redux'
import { editPost, deletePost } from '../actions/postUD';
import { v4 as uuid } from 'uuid';
import Comment from '../Components/Comment'
import { createComment } from '../actions/comments';
import {notify} from '../actions/notifications'


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
        content: '',
        commentContent: '',
        comments: [],
        commenting: false
    }

    componentDidMount(){
        if (this.state.post !== undefined){
        this.setState({
            comments: this.state.post.comments.sort(this.compare)
        })}
    }


    compare(a, b) {
        const aind = a.id;
        const bind = b.id;
      
        let comparison = 0;
        if (bind > aind) {
          comparison = 1;
        } else if (bind < aind) {
          comparison = -1;
        }
        return comparison;
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

    handleComment = () => {
        this.setState({
            commenting: true
        })
    
    }

    handleSubmitComment = (e) => {
        e.preventDefault()
        console.log('comment content: ', e.target.commentContent.value)
        let username = this.props.user.firstName +' '+ this.props.user.lastNameInitial + '.'
        this.setState({
            commenting: false
        })
        let text ={content: e.target.commentContent.value, user_id: this.props.user.user_id, username: username, post_id: this.state.post.id}
        console.log('text package: ', text)
        if (text.content !== "") {
            this.setState({
                comments: [text, ...this.state.comments]
            })
        }
        this.props.createComment(text)
        let note = {user_id: this.state.post.user_id, reason: `${this.props.user.firstName} ${this.props.user.lastNameInitial}. commented on your post!`, post_id: this.state.post.id, friend_id: null }
        this.props.notify(note)
    }

    onDeleteComment = (comment) => {
        console.log('tobe deleted comment',comment)
        let ncomments;
        if (comment.id === undefined){
            ncomments = this.state.comments.filter(c => c.content !== comment.content)
        } else {ncomments = this.state.comments.filter(c => c.id !== comment.id)}
        console.log('state comments: ', this.state.comments)
        console.log('new state comments: ', ncomments)
        this.setState({
            comments: ncomments
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
                    <h3>comments: </h3>
                    {this.state.comments.map(comment => {
                // return (
                // <p key={comment.id + 'r'}>{comment.content} -<Link key={id} to={`/users/${comment.user_id}`}>{comment.username}</Link>
                // {comment.user_id === this.props.user.user_id && this.state.editOrDelete === false ? 
                // <button onClick={this.handleEODClick}>X</button> 
                // : null}
                // {this.state.editOrDelete ? <span><button onClick={this.handleCommentEdit}>Edit</button><button onClick={this.handleCommentDelete}>Delete</button></span> : null}
                // </p>
                // )
                return <Comment key={uuid()} comment={comment} id={comment.id} post={this.state.post} onDeleteComment={this.onDeleteComment}/>
            })}
                        {(this.props.user.loggedIn && this.state.commenting === false) ? <button onClick = {this.handleComment}>create comment</button> : null}
            {this.state.commenting === true ? 
                <form onSubmit={this.handleSubmitComment}>
                    <input type='text' name='commentContent' value={this.state.commentContent} onChange={this.handleChange}/>
                    <input type='submit' />     
                </form>
             : null}
            {this.props.posts.find(post => post.id === this.state.post.id).errors ? <p style={{ color: 'red' }}>is too short (minimum is 1 character)</p> : null}
                </div>
             ) }
    }
}

const mapStateToProps = state => {
    return {posts: state.posts.posts, user: state.users.user}
  }

  const mapDispatchToProps = dispatch => ({
    editPost: (text) => dispatch(editPost(text)),
    deletePost: (text) => dispatch(deletePost(text)),
    createComment: (text) => dispatch(createComment(text)),
    notify: (note) => dispatch(notify(note))
  })

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPostPage)