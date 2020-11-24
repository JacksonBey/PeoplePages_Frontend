import React, {Component} from 'react';
import { Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {addLike, unLike} from '../actions/likes'

class Post extends Component {

    state = {
        likes: this.props.post.likes.length,
        liked: false,
        ulike: 'h'
    }

    componentDidMount(){
        if (this.props.liked !== null){
            this.setState({
                liked: true,
                ulike: this.props.liked
            })
        }
    }

    findLike = () => {
        
    }

    handleLikeClick = () => {
        let nlikes = this.state.likes + 1
        this.setState({
            liked: true,
            likes: nlikes
        })
        let text = {post_id: this.props.post.id, user_id: this.props.user.user_id}
        // console.log('userid: ', this.props.user.user_id)
        // console.log('text package: ',text)
        this.props.addLike(text)
    }

    handleUnlikeClick = () => {
        let nlikes = this.state.likes - 1
        console.log('ulike', this.state.ulike)
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
        console.log('text package: ',text)
        this.props.unLike(text)
    }


    render() {
        // console.log('likes id: ', this.props.post.likes)
        // console.log('liked?: ', this.props.liked)
        return(
             <Segment>
                 <h3>{this.props.post.id}</h3>
             <p>{this.props.post.content}</p>
             <p>-{this.props.post.username}</p> 
             {(this.state.liked) ? <button onClick={this.handleUnlikeClick}>&#10084;</button> 
             : <button onClick={this.handleLikeClick}>&#9825;</button>}
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
    unLike: (text) => dispatch(unLike(text))
  })

export default connect(mapStateToProps, mapDispatchToProps)(Post)