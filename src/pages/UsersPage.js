import React, {Component} from 'react';
import { connect } from 'react-redux'
import UserCard from '../Components/UserCard'
import { getFriendships } from '../actions/friendships';
import {getUsers} from '../actions/getUsers'


class UsersPage extends Component {


    render() {
        if (this.props.users !== undefined) {
            let users = this.props.users.filter(user => user.id !== this.props.user.user_id)
        return(
            <div>
                {users.map((user,idx) => <UserCard key={idx} duser={user}/>)}
            </div>
        )} else {
            return <div> </div>
        
        }
    }
}


const mapStateToProps = state => {
    return {posts: state.posts.posts, user: state.users.user,
    users: state.users.users}
  }

  const mapDispatchToProps = dispatch => ({
    getUsers: () => dispatch(getUsers()),
    getFriendships: () => dispatch(getFriendships())
  })


export default connect(mapStateToProps,mapDispatchToProps)(UsersPage)