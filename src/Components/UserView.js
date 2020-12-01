import React, {Component} from 'react';
import { connect } from 'react-redux'
import {getUsers} from '../actions/getUsers'
import {addFriend, unFriend} from '../actions/friendships'
import {notify} from '../actions/notifications'

class UserView extends Component {

    state={
        currentUser: true,
        friends: [],
        isFriend: false
    }

    componentDidMount(){
        this.props.getUsers()
        let displayUser;
        // console.log('in comp did mount')
        // console.log('users: ', this.props.users.users)
        // console.log('friendships: ', this.props.users.friendships)
        if (this.props.users.users !== undefined){
        displayUser = this.props.users.users.find(user => user.id === parseInt(this.props.match.params.userId))

        //get friendships belonging to displayed user.
        // console.log('display user: ',displayUser)
        let friends = []
        if (displayUser.followers !== []){
        displayUser.followers.forEach(friend => friends.push(friend))
        // console.log('friends after follwers: ', friends)
        }
        if (displayUser.followees !== []){
        displayUser.followees.forEach(friend => friends.push(friend))
        // console.log('friends after follwees: ', friends)
        }
        // console.log('d user friends: ', friends)
        let isFriend = friends.find(friend => friend.id === this.props.users.user.user_id)
        if(isFriend === undefined){
            isFriend = false
        } else {isFriend = true}
        // console.log('isfriend: ',isFriend)
        this.setState({
            friends, isFriend
        })
        // find the users that are associated with that friendship
        //display them in a list



        // console.log('displayUser: ', displayUser)
        // console.log('current user id: ', this.props.users.user)
        if (this.props.users.user.user_id !== displayUser.id){
            this.setState({
                currentUser: false
            })
        }
    }}

    handleFriend = (followee) => {
        let follower = this.props.users.user  
        let text ={followee: followee, follower: follower, follower_id: follower.user_id, followee_id: followee.id}
        // console.log('friending text: ', text)
        this.setState({
            friends: [...this.state.friends, follower],
            isFriend: true
        })
        let note = {user_id: followee.id, reason: `${this.props.user.firstName} ${this.props.user.lastNameInitial}. added you as a friend!`, post_id: null, friend_id: this.props.user.user_id }
        // console.log('add freind note: ', note)
        this.props.notify(note)
        this.props.addFriend(text)
    }

    handleUnFriend = (followee) => {
        let follower = this.props.users.user
        // console.log('follower: ', follower)
        let friendship = this.props.users.friendships.find(friendship => friendship.followee_id === followee.id) 
        if (friendship === undefined){
            friendship = this.props.users.friendships.find(friendship => friendship.follower_id === followee.id) 
        }
        // console.log('friendship: ',friendship)
        let text ={friendship: friendship, followee: followee, follower: follower, follower_id: follower.user_id, followee_id: followee.id}
        // console.log('state frineds: ', this.state.friends)
        let nfriends = this.state.friends.filter(friend => friend.id !== follower.user_id)
        // console.log('new friends list 1st filter: ', nfriends)
        nfriends = nfriends.filter(friend => friend.id !== follower.id)
        // console.log('new friends list: ', nfriends)
        this.setState({
            friends: nfriends,
            isFriend: false
        }) 
        this.props.unFriend(text)

    }


    render() {
        // console.log('user view props', this.props)
        if (this.props.users.users !== undefined){
            let displayUser = this.props.users.users.find(user => user.id === parseInt(this.props.match.params.userId))
        // console.log('displayUser: ', displayUser)
        // console.log('logged in user: ', this.props.users.user.loggedIn)
        // console.log('current user state', this.state.currentUser)
        // console.log('friends added', this.state.friends)
        // let friendships;
        // if (this.props.users.friendships !== undefined){
        //     friendships = this.props.users.friendships.filter(friend => friend.follower_id === displayUser.id)
        //     friendships = [...friendships, this.props.users.friendships.filter(friend => friend.followee_id === displayUser.id)]
        // }
        return(
            <div>
                <h1>{displayUser.firstName} {displayUser.lastNameInitial.toUpperCase()}.</h1>
                <h3>Friends({this.state.friends.length}):</h3>
        {this.state.friends.map((friend,idx) =>{ return <li key={idx}>{friend.firstName} {friend.lastNameInitial}.</li>})}
                {(this.props.users.user.loggedIn && this.state.currentUser === false && this.state.isFriend === false) ? <button onClick={() => this.handleFriend(displayUser)}>Add Friend!</button> : null}
                {(this.state.isFriend === true) ? <button onClick={() => this.handleUnFriend(displayUser)}>Unfriend</button> : null}
            </div>
        )
        // && this.state.isFriend === false
        }else{
        return(
            <div>
                <p>hi from UserView</p>
            </div>
        )}
    }
}

// {this.state.friends.map((friend,idx) =>{ return <li key={idx}>{friend.firstName} {friend.lastNameInitial}.</li>})}
// {(this.props.users.user.loggedIn && this.state.currentUser === false && this.state.isFriend === false) ? <button onClick={() => this.handleFriend(displayUser)}>Add Friend!</button> : null}
// {(this.state.isFriend === true) ? <button onClick={() => this.handleUnFriend(displayUser)}>Unfriend</button> : null}
// </div>

const mapStateToProps = state => {
    // console.log(state.users.user)
    return {users: state.users, user: state.users.user,
    friendships: state.friendships}
  }
  
  const mapDispatchToProps = dispatch => ({
    getUsers: () => dispatch(getUsers()),
    addFriend: (text) => dispatch(addFriend(text)),
    unFriend: (text) => dispatch(unFriend(text)),
    notify: (note) => dispatch(notify(note))
  })

export default connect(mapStateToProps, mapDispatchToProps)(UserView)