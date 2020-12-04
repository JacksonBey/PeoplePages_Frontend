import React, {Component} from 'react';
import { connect } from 'react-redux'
import {getUsers} from '../actions/getUsers'
import {notify, readNotification} from '../actions/notifications'
import { getFriendships, acceptFriendship} from '../actions/friendships';
import {addFriend, unFriend} from '../actions/friendships'
import { Segment } from 'semantic-ui-react'
import default_prof_pic from '../images/default_prof_pic.jpg'

class UserCard extends Component {


// friendship stuff from userview
handleFriend = (followee) => {
    let follower = this.props.users.user  
    let text ={followee: followee, follower: follower, follower_id: follower.user_id, followee_id: followee.id}
    // console.log('friending text: ', text)
    this.setState({
        // friends: [...this.state.friends, follower],
        // isFriend: true,
        pending: true
    })
    let note = {user_id: followee.id, reason: `${this.props.user.firstName} ${this.props.user.lastNameInitial}. added you as a friend!`, post_id: null, friend_id: this.props.user.user_id }
    // console.log('add freind note: ', note)
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
    // console.log('state frineds: ', this.state.friends)
    // let nfriends = this.state.friends.filter(friend => friend.id !== follower.user_id)
    // console.log('new friends list 1st filter: ', nfriends)
    // nfriends = nfriends.filter(friend => friend.id !== follower.id)
    // console.log('new friends list: ', nfriends)
    // this.setState({
    //     friends: nfriends,
    //     isFriend: false
    // }) 
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

    //find friendship
    // let text = this.findFriendship(note)
    let text = (friendship)
    console.log('found friend: ', text)
    this.props.acceptFriendship(text)


    // find note and delete!
    // note.reason.split(' ').slice(2).join(' ').toString()
    // let afilter = {
    //     user_id: this.props.user.user_id,
    //     post_id: null,
    //     friend_id: friendship.follower_id
    // }
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
    // delete friendship below
    let text ={friendship: friendship, followee: followee, follower: follower, follower_id: follower.id, followee_id: followee.id}
    console.log('delete friend request package: ', text)
    this.props.unFriend(text)


    // find note and delete!
    let note = this.findNotification(friendship)
    this.props.readNotification(note)

}


//end of friendship stuff from userview


    render() {
        // stuff from userview

        if (this.props.users.users !== undefined){
            let displayUser = this.props.users.users.find(user => user.id === this.props.duser.id)
            let friends = []
            let pendings = this.props.users.friendships.filter(friendship => friendship.pending === true)
            // console.log('pendings: ', pendings)
            if (displayUser.followers !== []){
                // console.log('display user followers: ', displayUser.followers)
            displayUser.followers.forEach(friend => friends.push(friend))
            pendings.forEach(pending => {
                if (pending.followee_id === displayUser.id){
                friends = friends.filter(friend => friend.id !== pending.follower_id)}
            })
            // console.log('friends after follwers: ', friends)
            }
            if (displayUser.followees !== []){
                displayUser.followees.forEach(friend => {friends.push(friend)})
                // console.log('followee id: ', displayUser.followees[0].id)
                // console.log('pendind id: ', pendings[0].followee_id)

                pendings.forEach(pending => {
                    // console.log(pending.followee_id)
                    if (pending.follower_id === displayUser.id){
                    friends = friends.filter(friend => friend.id !== pending.followee_id)}
                })
                // console.log('friends after follees: ', friends)
            }
            let isFriend = friends.find(friend => friend.id === this.props.users.user.user_id)
            if(isFriend === undefined){
                isFriend = false
            } else {isFriend = true}
            let currentUser = true
            if (this.props.users.user.user_id !== displayUser.id){
                     currentUser = false
            }

        // console.log('logged in user: ', this.props.users.user.loggedIn)
        // console.log('current user state', this.state.currentUser)
        // console.log('friends added', this.state.friends)
        // let friendships;
        // if (this.props.users.friendships !== undefined){
        //     friendships = this.props.users.friendships.filter(friend => friend.follower_id === displayUser.id)
        //     friendships = [...friendships, this.props.users.friendships.filter(friend => friend.followee_id === displayUser.id)]
        // }
        let pending = false
        let pendingAccept = false;
        let acceptordecline;
        let ffilter = {
            followee_id: displayUser.id,
            follower_id: this.props.users.user.user_id,
            pending: true
        }
                // console.log('displayUser: ', displayUser)
                // console.log('user', this.props.users.user.user_id)
        let ispending = this.props.friendships.find(friendship => {
            for (const key in ffilter) {
                if (friendship[key] === undefined || friendship[key] !== ffilter[key])
                  return false;
              }
              return true;
            })
            //check other way around
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
        // console.log('pending: ', ispending)
        if(ispending !== undefined){
            pending = true
        }



        // end of stuff from userview




        return(
            <Segment >
        <div  className='userCard'>                {(displayUser.profilePic === '' || displayUser.profilePic === undefined) ? <img src={default_prof_pic} alt='' width="50" height="60"></img> 
                :<img src={displayUser.profilePic} alt={default_prof_pic} width="50" height="60"></img> }<h1>{this.props.duser.firstName} {this.props.duser.lastNameInitial}.</h1>
                {(this.props.users.user.loggedIn && currentUser === false && isFriend === false && pending === false && pendingAccept === false) ? <button onClick={() => this.handleFriend(displayUser)}>Add Friend!</button> : null}
                {(isFriend === true && pending === false) ? <button onClick={() => this.handleUnFriend(displayUser)}>Unfriend</button> : null}
                 {/* edit user stuff */}
                 { pending ? <button disabled>pending</button> : null}
                 {pendingAccept ? 
                 <span><button onClick={() => this.handleAccept(acceptordecline)}>Accept</button><button onClick={() => this.handleDecline(acceptordecline)}>Decline</button></span>
                 : null}
                </div>
            </Segment>
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