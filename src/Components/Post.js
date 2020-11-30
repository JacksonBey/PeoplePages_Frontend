import React, {Component} from 'react';
import { Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {addLike, unLike} from '../actions/likes'
import { Link } from 'react-router-dom';
import {notify} from '../actions/notifications'


class Post extends Component {

    state = {
        likes: this.props.post.likes.length,
        liked: false
    }

    componentDidMount(){
        if (this.props.liked !== null){
            this.setState({
                liked: true
            })
        }
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
        console.log('userid: ', this.props.user)
        // console.log('text package: ',text)
        console.log('post props: ', this.props.post)
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
        console.log('likes: ', this.props.post.likes.find(like => like.user_id === this.props.user.user_id))
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


    render() {
        // console.log('props: ', this.props)
        // console.log('liked?: ', this.props.liked)
        // console.log('id of user: ', this.props.user.user_id )
        // console.log('id of poster: ', this.props.post.user_id)

        // console.log(poster)
        let {id, content, username, user_id} = this.props.post
        return(
             <Segment>
                 <Link key={id} to={`/posts/${id}`}>Goto post</Link>
                 <h3>{id}</h3>
             <p>{content}</p>
             {/* <p>-{username}</p>  */}
        <Link key={user_id + 'u'} to={`/users/${user_id}`}>{username}</Link>
            <br/>
             {(this.props.user.loggedIn) ?
             (this.state.liked) ? <button onClick={this.handleUnlikeClick}>&#10084;</button> 
             : <button onClick={this.handleLikeClick}>&#9825;</button> : null}
             <p>likes: {this.state.likes}</p>
            
             </Segment>

        )
    }
}

const mapStateToProps = state => {
    // console.log(state.users.user)
    return {user: state.users.user}
  }
  
  const mapDispatchToProps = dispatch => ({
    addLike: (text) => dispatch(addLike(text)),
    unLike: (text) => dispatch(unLike(text)),
    notify: (note) => dispatch(notify(note))
  })

export default connect(mapStateToProps, mapDispatchToProps)(Post)