import React, {Component} from 'react';
import { connect } from 'react-redux'
import {getUsers} from '../actions/getUsers'
import {notify, readNotification} from '../actions/notifications'
import { getFriendships, acceptFriendship} from '../actions/friendships';
import {addFriend, unFriend} from '../actions/friendships'
import default_prof_pic from '../images/default_prof_pic.jpg'
import { Link } from 'react-router-dom';

class UserCard extends Component {


handleFriend = (followee) => {
    let follower = this.props.users.user  
    let text ={followee: followee, follower: follower, follower_id: follower.user_id, followee_id: followee.id}
    this.setState({
        pending: true
    })
    let note = {user_id: followee.id, reason: `${this.props.user.firstName} ${this.props.user.lastNameInitial}. added you as a friend!`, post_id: null, friend_id: this.props.user.user_id }
    this.props.notify(note)
    this.props.addFriend(text)
}

handleUnFriend = (followee) => {
    let follower = this.props.users.users.find(user => user.id === this.props.users.user.user_id)
    console.log('user id ', this.props.users.user)
    console.log('follower: ', follower)
    let friendship = {followee_id: followee.id, follower_id: follower.id}
    friendship= this.findFriendship(friendship)
    if (friendship === undefined){
        friendship = {followee_id: follower.id, follower_id: followee.id}
        friendship= this.findFriendship(friendship)
    }
    follower.user_id = follower.id
    console.log('friendship: ',friendship)
    let text ={friendship: friendship, followee: followee, follower: follower, follower_id: follower.user_id, followee_id: followee.id}
    console.log('unfriend package: ', text)
    this.props.unFriend(text)

}


findFriendship = (friendship) => {
    let ffilter = {
        followee_id: friendship.followee_id,
        follower_id: friendship.follower_id
    }
    let ispending = this.props.friendships.find(friendship => {
        for (const key in ffilter) {
            if (friendship[key] === undefined || friendship[key] !== ffilter[key])
              return false;
          }
          return true;
    })
    return ispending
}


findNotification = (friendship) => {
    let afilter = {
        user_id: this.props.user.user_id,
        post_id: null,
        friend_id: friendship.follower_id
    }
    let notification = this.props.notifications.find(note => {
        for (const key in afilter) {
            if (note[key] === undefined || note[key] !== afilter[key])
              return false;
          }
          return true;
    })
    return notification
}



handleAccept = (friendship) => {
    console.log('accepted')
    console.log('friendship ',friendship)
    let text = (friendship)
    console.log('found friend: ', text)
    this.props.acceptFriendship(text)
    let note = this.findNotification(friendship)
    console.log('found note: ', note)
    this.props.readNotification(note)

}

handleDecline = (friendship) => {
    console.log('declined!')
    console.log('decline friendship:', friendship)
    let followee = this.props.users.users.find(user => this.props.user.user_id === user.id)
    followee.user_id = followee.id
    console.log('followee: ', followee)
    console.log('props.user: ', this.props.users.users)
    let follower = this.props.users.users.find(user => {
         return user.id === friendship.follower_id
    })
    console.log('follower: ', follower)
    let text ={friendship: friendship, followee: followee, follower: follower, follower_id: follower.id, followee_id: followee.id}
    console.log('delete friend request package: ', text)
    this.props.unFriend(text)
    let note = this.findNotification(friendship)
    this.props.readNotification(note)

}



    render() {

        if (this.props.users.users !== undefined){
            let displayUser = this.props.users.users.find(user => user.id === this.props.duser.id)
            let friends = []
            let pendings = this.props.users.friendships.filter(friendship => friendship.pending === true)
            if (displayUser.followers !== []){
            displayUser.followers.forEach(friend => friends.push(friend))
            pendings.forEach(pending => {
                if (pending.followee_id === displayUser.id){
                friends = friends.filter(friend => friend.id !== pending.follower_id)}
            })
            }
            if (displayUser.followees !== []){
                displayUser.followees.forEach(friend => {friends.push(friend)})

                pendings.forEach(pending => {
                    if (pending.follower_id === displayUser.id){
                    friends = friends.filter(friend => friend.id !== pending.followee_id)}
                })
            }
            let isFriend = friends.find(friend => friend.id === this.props.users.user.user_id)
            if(isFriend === undefined){
                isFriend = false
            } else {isFriend = true}
            let currentUser = true
            if (this.props.users.user.user_id !== displayUser.id){
                     currentUser = false
            }
        let pending = false
        let pendingAccept = false;
        let acceptordecline;
        let ffilter = {
            followee_id: displayUser.id,
            follower_id: this.props.users.user.user_id,
            pending: true
        }
        let ispending = this.props.friendships.find(friendship => {
            for (const key in ffilter) {
                if (friendship[key] === undefined || friendship[key] !== ffilter[key])
                  return false;
              }
              return true;
            })
            let efilter = {
                followee_id: this.props.users.user.user_id,
                follower_id: displayUser.id,
                pending: true
            }

        if (ispending === undefined){
            acceptordecline = this.props.friendships.find(friendship => {
                for (const key in efilter) {
                    if (friendship[key] === undefined || friendship[key] !== efilter[key])
                      return false;
                  }
                  return true;
                }) 
        } 




        if (acceptordecline !== undefined){
            pendingAccept= true
        } 
        if(ispending !== undefined){
            pending = true
        }
        return(
            <div className="usersView">
               {(displayUser.profilePic === '' || displayUser.profilePic === undefined) ? <img className="profilePic" src={default_prof_pic} alt='' width="200vh" height="200vh"></img> 
                :<img className="profilePic" src={displayUser.profilePic} alt={default_prof_pic} width="200vh" height="200vh"></img> }
                    <br/>
                <Link key={this.props.duser.id + 'u'} to={`/users/${this.props.duser.id}`}>{this.props.duser.firstName} {this.props.duser.lastNameInitial}.</Link>
                    <br/>
                {(this.props.users.user.loggedIn && currentUser === false && isFriend === false && pending === false && pendingAccept === false) ? <button className="button" onClick={() => this.handleFriend(displayUser)}>Add Friend!</button> : null}
                {(isFriend === true && pending === false) ? <button className="button" onClick={() => this.handleUnFriend(displayUser)}>Unfriend</button> : null}
                 { pending ? <button className="button" disabled>pending</button> : null}
                 {pendingAccept ? 
                 <span><button className="button" onClick={() => this.handleAccept(acceptordecline)}>Accept</button><button className="button"onClick={() => this.handleDecline(acceptordecline)}>Decline</button></span>
                 : null}
                
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
    return {posts: state.posts.posts, user: state.users.user, users: state.users,
        friendships: state.users.friendships, notifications: state.users.notifications}
  }

  const mapDispatchToProps = dispatch => ({
    getUsers: () => dispatch(getUsers()),
    getFriendships: () => dispatch(getFriendships()),
    addFriend: (text) => dispatch(addFriend(text)),
    unFriend: (text) => dispatch(unFriend(text)),
    notify: (note) => dispatch(notify(note)),
    readNotification: (text) => dispatch(readNotification(text)),
    acceptFriendship: (text) => dispatch(acceptFriendship(text))
  })


export default connect(mapStateToProps,mapDispatchToProps)(UserCard)