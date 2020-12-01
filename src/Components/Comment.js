import React, {Component} from 'react';
import { connect } from 'react-redux'
import {createComment, editComment, deleteComment} from '../actions/comments'
import { Link } from 'react-router-dom';

class Comment extends Component {


    state = {
        commenting: false,
        commentContent: '',
        comments: [],
        editOrDelete: false,
        editComment: false,
        commentTxt: this.props.comment.content
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    // handleComment = () => {
    //     this.setState({
    //         commenting: true
    //     })
    
    // }

    // handleSubmitComment = (e) => {
    //     e.preventDefault()
    //     console.log('comment content: ', e.target.commentContent.value)
    //     let username = this.props.user.firstName +' '+ this.props.user.lastNameInitial + '.'
    //     this.setState({
    //         commenting: false
    //     })
    //     let text ={content: e.target.commentContent.value, user_id: this.props.user.user_id, username: username, post_id: this.props.post.id}
    //     console.log('text package: ', text)
    //     this.setState({
    //         comments: [...this.state.comments, text]
    //     })
    //     this.props.createComment(text)
    // }

    // componentDidMount = () => {
    //     let comments = this.props.posts.find(post => post.id === this.props.comment.post_id).comments
    //     console.log('comments: ', comments)
    // }
    
    
    
    handleEODClick = () => {
        this.setState({
            editOrDelete: true
        })
    }

    handleCommentEditClick = () => {
        this.setState({
             editComment: true
        })
    }

    handleCommentDeleteClick = () => {
        // console.log('this.props.posts.comments: ', this.props.posts.find(post => post.id === this.props.post.id))
        let currentpost = this.props.posts.find(post => post.id === this.props.post.id)
        // console.log('current post comments: ', currentpost.comments)
        // console.log('this.props.comment.content: ', this.props.comment.content)
        // console.log('this.state.commentTXT', this.state.commentTxt)


        // console.log('found comment: ', ncomment)
        let text;
        if (this.props.comment.id !== undefined){
        text = {comment: this.props.comment, id: this.props.comment.id}
        currentpost.comments = currentpost.comments.filter(comment => comment.id !== this.props.comment.id )
    
        this.setState({
            editOrDelete: false, comments: currentpost.comments
        })
        this.props.onDeleteComment(this.props.comment)
        } else {
            let ncomment = currentpost.comments.find(comment => this.state.commentTxt === comment.content)
            // console.log('ncomment',ncomment)
            currentpost.comments = currentpost.comments.filter(comment => comment.id !== ncomment.id )
    
            this.setState({
                editOrDelete: false, comments: currentpost.comments
            })
            text = {comment: this.props.comment, id: ncomment.id}
            this.props.onDeleteComment(ncomment)
        }

        // console.log('delete comment text: ', text)

        this.props.deleteComment(text)
    }

    handleCommentEditSubmit = (e) => {
        e.preventDefault()
        console.log('this.props.posts.comments: ', this.props.posts.find(post => post.id === this.props.post.id))
        let currentpost = this.props.posts.find(post => post.id === this.props.post.id)
        let ncomment = currentpost.comments.find(comment => this.props.comment.content === comment.content)
        console.log('found comment: ', ncomment)
        this.setState({
            editOrDelete: false, editComment: false, commentTxt: e.target.commentContent.value
        })
        console.log('props.comment.id: ', this.props.comment.id)
        let text;
        if (this.props.comment.id !== undefined){
        text = {comment: this.props.comment, content: e.target.commentContent.value, id: this.props.comment.id}
        } else {
            text = {comment: this.props.comment, content: e.target.commentContent.value, id: ncomment.id}
        }

        console.log('edit comment text: ', text)
        this.props.editComment(text)
    }


    // let text;
    // if (this.props.post.likes.find(like => like.user_id === this.props.user.user_id) !== undefined){
    //   text = {post_id: this.props.post.id, user_id: this.props.user.user_id, like_id: this.props.post.likes.find(like => like.user_id === this.props.user.user_id).id}}
    // else{
    //     text = {post_id: this.props.post.id, user_id: this.props.user.user_id, like_id: this.props.liked.id}
    // }
    // // console.log('userid: ', this.props.user.user_id)
    // // console.log('text package: ',text)
    // this.props.unLike(text)


    render() {
        let {id, content, user_id, username} = this.props.comment
        return(
            <div>
            {this.state.editComment ?                 
                <form onSubmit={this.handleCommentEditSubmit}>
                    <input type='text' name='commentContent' value={this.state.commentContent} onChange={this.handleChange} placeholder={content}/>
                    <input type='submit' />     
                </form> : <p>{this.state.commentTxt} -<Link key={id} to={`/users/${user_id}`}>{username}</Link> </p>}
            {/* <p >{content} -<Link key={id} to={`/users/${user_id}`}>{username}</Link>  */}
            {user_id === this.props.user.user_id && this.state.editOrDelete === false ? 
            <button onClick={this.handleEODClick}>X</button> 
            : null}
            {this.state.editOrDelete  && this.state.editComment === false ? 
            <span>
                <button onClick={this.handleCommentEditClick}>Edit</button>
                <button onClick={this.handleCommentDeleteClick}>Delete</button>
            </span> 
            : null}
            </div>
        )
    }
}


// {this.state.comments.length > 0 ? <p>Comments:</p> : null}
// {this.state.comments.map(comment => {
//     return (
//     <p key={comment.id + 'f'}>{comment.content} -<Link key={id} to={`/users/${comment.user_id}`}>{comment.username}</Link>
//     {comment.user_id === this.props.user.user_id && this.state.editOrDelete === false ? 
//     <button onClick={this.handleEODClick}>X</button> 
//     : null}
//     {this.state.editOrDelete ? <span><button onClick={this.handleCommentEdit}>Edit</button><button onClick={this.handleCommentDelete}>Delete</button></span> : null}
//     </p>
//     )
// })}
// {(this.props.user.loggedIn && this.state.commenting === false) ? <button onClick = {this.handleComment}>create comment</button> : null}
// {this.state.commenting === true ? 
//     <form onSubmit={this.handleSubmitComment}>
//         <input type='text' name='commentContent' value={this.state.commentContent} onChange={this.handleChange}/>
//         <input type='submit' />     
//     </form>
//  : null}

const mapStateToProps = state => {
    // console.log(state.users.user)
    return {user: state.users.user, posts: state.posts.posts}
  }
  
  const mapDispatchToProps = dispatch => ({
    createComment: (text) => dispatch(createComment(text)),
    editComment: (text) => dispatch(editComment(text)),
    deleteComment: (text) => dispatch(deleteComment(text))
  })

export default connect(mapStateToProps, mapDispatchToProps)(Comment)