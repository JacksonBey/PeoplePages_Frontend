import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'

class PostFeedPage extends Component {

    componentDidMount() {
        this.props.getPosts()
    }

    renderPosts() {

    this.props.posts.posts.reverse().map(post => {
     return <div>
         <p>{post.content}</p>
         <p>poster: {post.username}</p> 
         </div> })
    }



    render() {
        // console.log('this.props.posts: ',this.props.posts)
        // console.log('username', this.props.posts.posts[0].username)
        // console.log('b: ', b.reverse())
        return(
            <div>
                <h2>Posts</h2>
        {(this.props.posts === undefined || this.props.posts === [])? null : this.props.posts.posts.reverse().map((post, idx) =>{
             return (
             <Segment key={idx} >
             <p>{`${idx+1}.  `}{post.content}</p>
             <p>-{post.username}</p> <button><Icon name='thumbs up outline'/></button>
             </Segment>

             )
             })} 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {posts: state.posts.posts}
  }


export default connect(mapStateToProps)(PostFeedPage)