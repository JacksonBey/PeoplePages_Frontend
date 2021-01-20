import React, {Component} from 'react';
import { connect } from 'react-redux'
import {getUsers} from '../actions/getUsers'
import {addFriend, unFriend} from '../actions/friendships'
import {notify, readNotification} from '../actions/notifications'
import { getFriendships, acceptFriendship} from '../actions/friendships';
import { editUserInfo } from '../actions/editUserInfo'
import default_prof_pic from '../images/default_prof_pic.jpg'
import Post from '../Components/Post'

class UserView extends Component {

    state={
        currentUser: true,
        friends: [],
        isFriend: false,
        isEdit: false,
        age: '',
        location: '',
        id: '',
        wasEdited: false,
        loaded: false,
        pending: false
    }

    componentDidMount(){
        this.props.getUsers()
        this.props.getFriendships()
        if (this.props.posts === []){
            this.props.getPosts()
        }
        let displayUser;
        if (this.props.users.users !== undefined){
        displayUser = this.props.users.users.find(user => user.id === parseInt(this.props.match.params.userId))
        this.setState({
            firstName: displayUser.firstName,
            lastNameInitial: displayUser.lastNameInitial,
            age: displayUser.age,
            location: displayUser.location,
            id: displayUser.id,
            loaded: true
        })
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
        if(ispending !== undefined){
            this.setState({
                pending: true
            })
        }
        let friends = []
        if (displayUser.followers !== []){
        displayUser.followers.forEach(friend => friends.push(friend))
        }
        if (displayUser.followees !== []){
        displayUser.followees.forEach(friend => friends.push(friend))
        }
        let isFriend = friends.find(friend => friend.id === this.props.users.user.user_id)
        if(isFriend === undefined){
            isFriend = false
        } else {isFriend = true}
        this.setState({
            friends, isFriend, id: displayUser.id
        })
        if (this.props.users.user.user_id !== displayUser.id){
            this.setState({
                currentUser: false
            })
        }
    }}

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
        console.log('state frineds: ', this.state.friends)
        let nfriends = this.state.friends.filter(friend => friend.id !== follower.user_id)
        console.log('new friends list 1st filter: ', nfriends)
        nfriends = nfriends.filter(friend => friend.id !== follower.id)
        console.log('new friends list: ', nfriends)
        this.setState({
            friends: nfriends,
            isFriend: false
        }) 
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

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    setIdState(stateUpdate){
        return new Promise(resolve => {
            this.setState(stateUpdate, () => resolve())
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        let nEdit = !this.state.isEdit
        let displayUser = this.props.users.users.find(user => user.id === parseInt(this.props.match.params.userId))
        await this.setIdState(state => ({
            id: displayUser.id,
            wasEdited: true,
            isEdit: nEdit
        }))
        console.log('this.state: ',this.state)
        this.props.editInfo(this.state)
    }

    handleEditClick = () => {
        let nEdit = !this.state.isEdit
        this.setState({
            isEdit: nEdit
        })
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

    findliked = (post) => {
        let isliked = post.likes.find(like => like.user_id === this.props.user.user_id)
        if(isliked === undefined){
            return null
        } else {
            return isliked
        }
    }




    render() {
        if (this.props.users.users !== undefined){
            let displayUser = this.props.users.users.find(user => user.id === parseInt(this.props.match.params.userId))
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

        let posts = this.props.posts.filter(post => post.user_id === displayUser.id)
        posts.sort(this.compare)


        return(
            <div>
                {(displayUser.profilePic === '' || displayUser.profilePic === undefined) ? <img src={default_prof_pic} alt='' width="50" height="60"></img> 
                :<img src={displayUser.profilePic} alt={default_prof_pic} width="50" height="60"></img> }
                
                <h1>{displayUser.firstName} {displayUser.lastNameInitial.toUpperCase()}.</h1>
        <p>Age: {displayUser.age} Location: {displayUser.location}</p>
        <p>Posts: {displayUser.posts.length} </p>

                {(this.props.users.user.loggedIn && currentUser === false && isFriend === false && pending === false && pendingAccept === false) ? <button onClick={() => this.handleFriend(displayUser)}>Add Friend!</button> : null}
                {(isFriend === true && pending === false) ? <button onClick={() => this.handleUnFriend(displayUser)}>Unfriend</button> : null}
                 { pending ? <button disabled>pending</button> : null}
                 {pendingAccept ? 
                 <span><button onClick={() => this.handleAccept(acceptordecline)}>Accept</button><button onClick={() => this.handleDecline(acceptordecline)}>Decline</button></span>
                 : null}
                 {currentUser ? <span><button onClick={this.handleEditClick}>Edit/ Add Info</button> 
                 <button onClick={this.props.handleLogout}>Logout</button></span>
                 : null}
                 {this.state.isEdit ? 
                    <form onSubmit={this.handleSubmit}>
                        <label>Age: 
                        <input type='text' name='age' value={this.state.age} onChange={this.handleChange} placeholder={displayUser.age}/>
                        </label>
                        <label>Location: 
                        <input type='text' name='location' value={this.state.location} onChange={this.handleChange} placeholder={displayUser.location}/>
                        </label>
                        <input type='submit' />

                    </form> : null}
                    {this.state.wasEdited ? <p>refresh page to view your edit</p> : null}
                    <br/>
                    {friends.length > 0 ? <h3>Friends({friends.length}):</h3>: null}
        {friends.map((friend,idx) =>{ return <li key={idx}>{friend.firstName} {friend.lastNameInitial}.</li>})}
                    <br/>
                    <h3>Posts({posts.length}):</h3>
        {posts.map((post, idx) => <Post key={idx} post={post}
            liked= {this.findliked(post)}
        />)}
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
    return {users: state.users, user: state.users.user,
    friendships: state.users.friendships, notifications: state.users.notifications, posts: state.posts.posts}
  }
  
  const mapDispatchToProps = dispatch => ({
    getUsers: () => dispatch(getUsers()),
    addFriend: (text) => dispatch(addFriend(text)),
    unFriend: (text) => dispatch(unFriend(text)),
    notify: (note) => dispatch(notify(note)),
    readNotification: (text) => dispatch(readNotification(text)),
    getFriendships: () => dispatch(getFriendships()),
    acceptFriendship: (text) => dispatch(acceptFriendship(text)),
    editInfo: (text) => dispatch(editUserInfo(text))
  })

export default connect(mapStateToProps, mapDispatchToProps)(UserView)