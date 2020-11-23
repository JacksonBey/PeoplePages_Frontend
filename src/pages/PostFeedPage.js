import React, {Component} from 'react';
import { connect } from 'react-redux'

class PostFeedPage extends Component {

    componentDidMount() {
        this.props.getPosts()
    }

    renderPosts() {
        this.props.posts.map(post => <div><p>{post.content}</p><p>{post.user_id}</p> </div> )
    }



    render() {
        console.log('this.props.posts: ',this.props.posts)
        return(
            <div>
                <p>hi from PostFeedPage</p>
        {(this.props.posts === undefined)? null : this.props.posts.posts.map((post, idx) => <p key={idx}>{`${idx+1}.  `}{post.content}</p>)} 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {posts: state.posts.posts}
  }


export default connect(mapStateToProps)(PostFeedPage)