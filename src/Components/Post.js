import React, {Component} from 'react';
import { connect } from 'react-redux'
import {addLike, unLike} from '../actions/likes'
import { Link } from 'react-router-dom';
import {notify} from '../actions/notifications'
import {createComment} from '../actions/comments'
import default_prof_pic from '../images/default_prof_pic.jpg'

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

    handleLikeClick = () => {
        let nlikes = this.state.likes + 1
        this.setState({
            liked: true,
            likes: nlikes
        })
        let text = {post_id: this.props.post.id, user_id: this.props.user.user_id}
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
        let text;
        if (this.props.post.likes.find(like => like.user_id === this.props.user.user_id) !== undefined){
          text = {post_id: this.props.post.id, user_id: this.props.user.user_id, like_id: this.props.post.likes.find(like => like.user_id === this.props.user.user_id).id}}
        else{
            text = {post_id: this.props.post.id, user_id: this.props.user.user_id, like_id: this.props.liked.id}
        }
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
        this.props.createComment(text)
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
        let user = {};
        if (this.props.users.users !== undefined){
        user = this.props.users.users.find(user => this.props.post.user_id === user.id)
        }
        let date = this.props.post.created_at.split('T')[0]
        let {id, content, username, user_id, image, comments} = this.props.post
        return(
             <div className='postCard'>
                 <div className='contentDiv'>
                    <h2 style={{display:'flex', justifyContent:'center'}}>{content}</h2>
                    {image !== '' && image !== null ? <img className='postImage' src={image} alt='' width="350vh" height="350vh"></img> : null}
                </div>
                <p>By 
                {(user.profilePic === '' || user.profilePic === undefined) ? <img className='profilePic' src={default_prof_pic} alt='' width="50vh" height="30"></img> 
                :<img className='profilePic' src={user.profilePic} alt={default_prof_pic} width="40vh" height="40vh"></img> }
                <Link key={user_id + 'u'} to={`/users/${user_id}`}>{username}</Link> on {date}</p>
                <br/>
                {(this.props.user.loggedIn) ?
                (this.state.liked) ? <button className="button" onClick={this.handleUnlikeClick}>&#10084;</button> 
                : <button className="button" onClick={this.handleLikeClick}>&#9825;</button> : null}
                <p>likes: {this.state.likes}</p>
                {comments.length > 0 ? <p>Comments({comments.length})</p> : null}
                <Link key={id} to={`/posts/${id}`}>Goto post</Link>
             </div>

        )
    }
}

const mapStateToProps = state => {
    return {user: state.users.user, posts: state.posts.posts, users: state.users}
  }
  
  const mapDispatchToProps = dispatch => ({
    addLike: (text) => dispatch(addLike(text)),
    unLike: (text) => dispatch(unLike(text)),
    notify: (note) => dispatch(notify(note)),
    createComment: (text) => dispatch(createComment(text))
  })

export default connect(mapStateToProps, mapDispatchToProps)(Post)