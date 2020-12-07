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
        commentTxt: this.props.comment.content,
        date: ''
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount = () => {
        if(this.props.comment.id === undefined) {
            let ddate = new Date()
            console.log('ddate: ', ddate)
            let date= ddate.getUTCFullYear() + '-' + ddate.getMonth() + '-' + ddate.getDay()
            console.log('date', date)
            this.setState({
                date  
            })
        } else {
            this.setState({
                date: this.props.comment.created_at.split('T')[0]
            })
        }
    }
    
    
    
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
        let currentpost = this.props.posts.find(post => post.id === this.props.post.id)
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
            currentpost.comments = currentpost.comments.filter(comment => comment.id !== ncomment.id )
    
            this.setState({
                editOrDelete: false, comments: currentpost.comments
            })
            text = {comment: this.props.comment, id: ncomment.id}
            this.props.onDeleteComment(this.props.comment)
        }

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


    render() {
        let {id, content, user_id, username} = this.props.comment

        return(
            <div>
            {this.state.editComment ?                 
                <form onSubmit={this.handleCommentEditSubmit}>
                    <input type='text' name='commentContent' value={this.state.commentContent} onChange={this.handleChange} placeholder={content}/>
                    <input type='submit' />     
            </form> : <p>{this.state.commentTxt} -<Link key={id} to={`/users/${user_id}`}>{username}</Link> {this.state.date}</p>}
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


const mapStateToProps = state => {
    return {user: state.users.user, posts: state.posts.posts}
  }
  
  const mapDispatchToProps = dispatch => ({
    createComment: (text) => dispatch(createComment(text)),
    editComment: (text) => dispatch(editComment(text)),
    deleteComment: (text) => dispatch(deleteComment(text))
  })

export default connect(mapStateToProps, mapDispatchToProps)(Comment)