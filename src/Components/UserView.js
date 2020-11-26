import React, {Component} from 'react';
import { connect } from 'react-redux'
import {getUsers} from '../actions/getUsers'
import {addFriend, unFriend} from '../actions/friendships'

class UserView extends Component {

    state={
        currentUser: false
    }

    componentDidMount(){
        this.props.getUsers()
        let displayUser;
        // console.log('in comp did mount')
        console.log('users: ', this.props.users.users)
        // console.log('friendships: ', this.props.users.friendships)
        if (this.props.users.users !== undefined){
        displayUser = this.props.users.users.find(user => user.id === parseInt(this.props.match.params.userId))


        //get friendships belonging to displayed user.
        // let followerfriendships = this.props.users.friendships.filter(fs => fs.followee_id === displayUser.user_id)
        // console.log('follower friendships: ', followerfriendships)
        // let followedfriendships = this.props.users.friendships.filter(fs => fs.followed_id === displayUser.user_id)
        // console.log('followed friendships: ', followedfriendships)
        // let followerfriends = followerfriendships.forEach(fs => this.props.users.users.find(user => user.id === fs.followee_id))
        // let followedfriends = followedfriendships.forEach(fs => this.props.users.users.find(user => user.id === fs.follower_id))
        // console.log('followed friends: ', followedfriends)
        // console.log('follower friends: ', followerfriends)

        // find the users that are associated with that friendship
        //display them in a list



        // console.log('displayUser: ', displayUser)
        console.log('current user id: ', this.props.users.user)
        if (this.props.users.user.user_id === displayUser.id){
            this.setState({
                currentUser: true
            })
        }
    }}

    handleFriend = (followee) => {
        let follower = this.props.users.user  
        let text ={follower_id: follower.user_id, followee_id: followee.id}
        // console.log('friending text: ', text)
        this.props.addFriend(text)
    }


    render() {
        // console.log('user view props', this.props)
        if (this.props.users.users !== undefined){
            let displayUser = this.props.users.users.find(user => user.id === parseInt(this.props.match.params.userId))
        // console.log('displayUser: ', displayUser)
        // console.log('logged in user: ', this.props.users.user.loggedIn)
        // console.log('current user state', this.state.currentUser)
        return(
            <div>
                <h1>{displayUser.firstName} {displayUser.lastNameInitial.toUpperCase()}.</h1>
                {(this.props.users.user.loggedIn && this.state.currentUser === false) ? <button onClick={() => this.handleFriend(displayUser)}>Add Friend!</button> : null}
            </div>
        )
        
        }else{
        return(
            <div>
                <p>hi from UserView</p>
            </div>
        )}
    }
}

const mapStateToProps = state => {
    // console.log(state.users.user)
    return {users: state.users}
  }
  
  const mapDispatchToProps = dispatch => ({
    getUsers: () => dispatch(getUsers()),
    addFriend: (text) => dispatch(addFriend(text)),
    unFriend: (text) => dispatch(unFriend(text))
  })

export default connect(mapStateToProps, mapDispatchToProps)(UserView)