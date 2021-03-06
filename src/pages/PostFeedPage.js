import React, {Component} from 'react';
import { connect } from 'react-redux'
import Post from '../Components/Post'
import {getUsers} from '../actions/getUsers'
import { getFriendships } from '../actions/friendships';

class PostFeedPage extends Component {


    componentDidMount() {
        this.props.getUsers()
        this.props.getFriendships()
        if (this.props.posts === []){
            this.props.getPosts()
        }
        }

    renderPosts() {

    this.props.posts.posts.reverse().map(post => {
     return <div>
         <p>{post.content}</p>
         <p>poster: {post.username}</p> 
         </div> })
    }

    findliked = (post) => {
        let isliked = post.likes.find(like => like.user_id === this.props.user.user_id)
        if(isliked === undefined){
            return null
        } else {
            return isliked
        }
    }

    handlePosts = () => {
        return 
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



    render() {
        return(
            <div className='userPostsDiv'>
            <h2 className="postFeedTitle">Posts</h2>
        {(this.props.posts === undefined || this.props.posts === [])? null : this.props.posts.sort(this.compare).map((post, idx) => <Post key={idx} post={post}
            liked= {this.findliked(post)}
        />)
        } 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {posts: state.posts.posts, user: state.users.user}
  }

  const mapDispatchToProps = dispatch => ({
    getUsers: () => dispatch(getUsers()),
    getFriendships: () => dispatch(getFriendships())
  })


export default connect(mapStateToProps,mapDispatchToProps)(PostFeedPage)