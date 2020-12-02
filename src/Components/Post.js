import React, {Component} from 'react';
import { Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {addLike, unLike} from '../actions/likes'
import { Link } from 'react-router-dom';
import {notify} from '../actions/notifications'
import {createComment} from '../actions/comments'
// import Comment from './Comment'
// import { v4 as uuid } from 'uuid';

class Post extends Component {

    state = {
        likes: this.props.post.likes.length,
        liked: false,
        commenting: false,
        commentContent: '',
        comments: [],
        editOrDelete: false
    }

    componentDidMount(){
        if (this.props.liked !== null){
            this.setState({
                liked: true
            })
        }
        this.setState({
            comments: this.props.post.comments.sort(this.compare)
        })
    }

    // findLike = () => {
        
    // }

    handleLikeClick = () => {
        let nlikes = this.state.likes + 1
        this.setState({
            liked: true,
            likes: nlikes
        })
        let text = {post_id: this.props.post.id, user_id: this.props.user.user_id}
        // console.log('userid: ', this.props.user)
        // console.log('text package: ',text)
        // console.log('post props: ', this.props.post)
        let note = {user_id: this.props.post.user_id, reason: `${this.props.user.firstName} ${this.props.user.lastNameInitial}. liked your post!`, post_id: this.props.post.id, friend_id: this.props.user.user_id}
        this.props.notify(note)
        this.props.addLike(text)
    }

    handleUnlikeClick = () => {
        let nlikes = this.state.likes - 1
        this.setState({
            liked: false,
            likes: nlikes
        })
        // let likeid = 
        // console.log('likes: ', this.props.post.likes.find(like => like.user_id === this.props.user.user_id))
        let text;
        if (this.props.post.likes.find(like => like.user_id === this.props.user.user_id) !== undefined){
          text = {post_id: this.props.post.id, user_id: this.props.user.user_id, like_id: this.props.post.likes.find(like => like.user_id === this.props.user.user_id).id}}
        else{
            text = {post_id: this.props.post.id, user_id: this.props.user.user_id, like_id: this.props.liked.id}
        }
        // console.log('userid: ', this.props.user.user_id)
        // console.log('text package: ',text)
        this.props.unLike(text)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
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
        let text ={content: e.target.commentContent.value, user_id: this.props.user.user_id, username: username, post_id: this.props.post.id}
        console.log('text package: ', text)
        if (text.content !== "") {
            this.setState({
                comments: [text, ...this.state.comments]
            })
        }
        // let note = {user_id: this.props.post.user_id, reason: `${this.props.user.firstName} ${this.props.user.lastNameInitial}. commented on your post!`, post_id: this.state.post.id, friend_id: null }
        // this.props.notify(note)
        this.props.createComment(text)
    }

    // handleEODClick = () => {
    //     this.setState({
    //         editOrDelete: true
    //     })
    // }

    // handleCommentEdit = () => {
    //     this.setState({
    //         editOrDelete: false
    //     })
    // }

    // handleCommentDelete = () => {
    //     this.setState({
    //         editOrDelete: false
    //     })
    // }

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
        // console.log('props.post.comments: ', this.props.post.comments)
        // console.log('liked?: ', this.props.liked)
        // console.log('id of user: ', this.props.user.user_id )
        // console.log('id of poster: ', this.props.post.user_id)
        // console.log('props error: ', this.props.posts.find(post => post.id === this.props.post.id).errors )
        // console.log(poster)
        console.log('post date: ', this.props.post.created_at.split('T')[0])
        let date = this.props.post.created_at.split('T')[0]
        let {id, content, username, user_id, image} = this.props.post
        return(
             <Segment>

                 <h3>{id}</h3>
                 {image !== '' && image !== null ? <img src={image} alt='' width="500" height="600"></img> : null}
             <h2>{content}</h2>
            <p> posted on: {date}</p>
             {/* <p>-{username}</p>  */}
        <Link key={user_id + 'u'} to={`/users/${user_id}`}>{username}</Link>
            <br/>
             {(this.props.user.loggedIn) ?
             (this.state.liked) ? <button onClick={this.handleUnlikeClick}>&#10084;</button> 
             : <button onClick={this.handleLikeClick}>&#9825;</button> : null}
             <p>likes: {this.state.likes}</p>
             {this.state.comments.length > 0 ? <p>Comments({this.state.comments.length})</p> : null}
             <Link key={id} to={`/posts/${id}`}>Goto post</Link>
            {/* {this.state.comments.map(comment => {
                // return (
                // <p key={comment.id + 'r'}>{comment.content} -<Link key={id} to={`/users/${comment.user_id}`}>{comment.username}</Link>
                // {comment.user_id === this.props.user.user_id && this.state.editOrDelete === false ? 
                // <button onClick={this.handleEODClick}>X</button> 
                // : null}
                // {this.state.editOrDelete ? <span><button onClick={this.handleCommentEdit}>Edit</button><button onClick={this.handleCommentDelete}>Delete</button></span> : null}
                // </p>
                // )
                return <Comment key={uuid()} comment={comment} id={comment.id} post={this.props.post} onDeleteComment={this.onDeleteComment}/>
            })}
            {(this.props.user.loggedIn && this.state.commenting === false) ? <button onClick = {this.handleComment}>create comment</button> : null}
            {this.state.commenting === true ? 
                <form onSubmit={this.handleSubmitComment}>
                    <input type='text' name='commentContent' value={this.state.commentContent} onChange={this.handleChange}/>
                    <input type='submit' />     
                </form>
             : null}
            {this.props.posts.find(post => post.id === this.props.post.id).errors ? <p style={{ color: 'red' }}>is too short (minimum is 1 character)</p> : null} */}
             </Segment>

        )
    }
}

const mapStateToProps = state => {
    // console.log(state.users.user)
    return {user: state.users.user, posts: state.posts.posts}
  }
  
  const mapDispatchToProps = dispatch => ({
    addLike: (text) => dispatch(addLike(text)),
    unLike: (text) => dispatch(unLike(text)),
    notify: (note) => dispatch(notify(note)),
    createComment: (text) => dispatch(createComment(text))
  })

export default connect(mapStateToProps, mapDispatchToProps)(Post)