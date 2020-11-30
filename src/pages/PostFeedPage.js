import React, {Component} from 'react';
import { connect } from 'react-redux'
import Post from '../Components/Post'
import {getUsers} from '../actions/getUsers'
import { getFriendships } from '../actions/friendships';

class PostFeedPage extends Component {

    state = {
        posts: this.props.getPosts()
    }

    componentDidMount() {
        this.props.getPosts()
        this.props.getUsers()
        this.props.getFriendships()
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



    render() {
        // console.log('this.props.posts: ',this.props.posts)
        // console.log('typeof props post: ', typeof this.props.posts)
        // console.log('props length when loading:', this.props.posts.posts.length)
        // console.log('username', this.props.posts.posts[0].username)
        // console.log('user id: ', this.props.user.user_id)
        // console.log('props: ', this.props)
        return(
            <div>
                <h2>Posts</h2>
        {(this.props.posts === undefined || this.props.posts === [])? null : this.props.posts.map((post, idx) => <Post key={idx} post={post}
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