import React, {Component} from 'react';
import { connect } from 'react-redux'
import {getUsers} from '../actions/getUsers'
import {addFriend, unFriend} from '../actions/friendships'
import {notify, readNotification} from '../actions/notifications'
import { getFriendships, acceptFriendship} from '../actions/friendships';
import { editUserInfo } from '../actions/editUserInfo'
import default_prof_pic from '../images/default_prof_pic.jpg'

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
        let displayUser;
        console.log('in comp did mount')
        // console.log('users: ', this.props.users.users)
        // console.log('friendships: ', this.props.users.friendships)
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
        // see if friendship is pending:
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
        console.log('pending: ', ispending)
        if(ispending !== undefined){
            this.setState({
                pending: true
            })
        }
        // console.log('friendships: ', this.props.friendships)
        // console.log('f with display user id: ', this.props.friendships.filter(friendship => {
        //     return friendship.follower_id === this.props.users.user.user_id
        // }))

        //get friendships belonging to displayed user.
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
        console.log('id: ', displayUser.id)
        this.setState({
            friends, isFriend, id: displayUser.id
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

    // shouldComponentUpdate = (nextProps, nextState) => {
    //     if (this.props === nextProps && this.state === nextState){
    //         return false
    //     } else return true
    // }
 
    // componentDidUpdate(){
        // console.log('state.friends: ', this.state.friends)
    //     console.log('this.props.users.users', this.props.users.users)
    //     console.log('updated')
    //     if (this.props.users.users !== undefined){
    //         console.log('in conditional')
    //         let displayUser = this.props.users.users.find(user => user.id === parseInt(this.props.match.params.userId))
    
    //         //get friendships belonging to displayed user.
    //         let friends = []
    //         if (displayUser.followers !== []){
    //         displayUser.followers.forEach(friend => friends.push(friend))
    //         // console.log('friends after follwers: ', friends)
    //         }
    //         if (displayUser.followees !== []){
    //         displayUser.followees.forEach(friend => friends.push(friend))
    //         // console.log('friends after follwees: ', friends)
    //         }
    //         // console.log('d user friends: ', friends)
    //         let isFriend = friends.find(friend => friend.id === this.props.users.user.user_id)
    //         if(isFriend === undefined){
    //             isFriend = false
    //         } else {isFriend = true}
    //         // console.log('isfriend: ',isFriend)
    //         this.setState({
    //             friends, isFriend
    //         })}
    // }

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
        let friendship = this.props.users.friendships.find(friendship => friendship.followee_id === followee.id) 
        if (friendship === undefined){
            friendship = this.props.users.friendships.find(friendship => friendship.follower_id === followee.id) 
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

    //edit user stuff

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
        // console.log('this.props: ',this.props)
        let nEdit = !this.state.isEdit
        let displayUser = this.props.users.users.find(user => user.id === parseInt(this.props.match.params.userId))
        // console.log('display user: ', displayUser)
        await this.setIdState(state => ({
            id: displayUser.id,
            wasEdited: true,
            isEdit: nEdit
        }))
        // this.setState({
        //     id: displayUser.id
        // })
        console.log('this.state: ',this.state)
        this.props.editInfo(this.state)
    }

    handleEditClick = () => {
        let nEdit = !this.state.isEdit
        this.setState({
            isEdit: nEdit
        })
    }




    //end of edit user stuff






    render() {
        // console.log('user view props', this.props)
        // console.log('this.props.user.loggedIn', this.props.user.loggedIn)
        // console.log('curent state: ', this.state)

        if (this.props.users.users !== undefined){
            let displayUser = this.props.users.users.find(user => user.id === parseInt(this.props.match.params.userId))
            let friends = []
            let pendings = this.props.users.friendships.filter(friendship => friendship.pending === true)
            console.log('pendings: ', pendings)
            if (displayUser.followers !== []){
                console.log('display user followers: ', displayUser.followers)
            displayUser.followers.forEach(friend => friends.push(friend))
            pendings.forEach(pending => {
                if (pending.followee_id === displayUser.id){
                friends = friends.filter(friend => friend.id !== pending.follower_id)}
            })
            console.log('friends after follwers: ', friends)
            }
            if (displayUser.followees !== []){
                displayUser.followees.forEach(friend => {friends.push(friend)})
                // console.log('followee id: ', displayUser.followees[0].id)
                // console.log('pendind id: ', pendings[0].followee_id)

                pendings.forEach(pending => {
                    console.log(pending.followee_id)
                    if (pending.follower_id === displayUser.id){
                    friends = friends.filter(friend => friend.id !== pending.followee_id)}
                })
                console.log('friends after follees: ', friends)
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
                console.log('displayUser: ', displayUser)
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


        return(
            <div>
                {(displayUser.profilePic === '' || displayUser.profilePic === undefined) ? <img src={default_prof_pic} alt='' width="50" height="60"></img> 
                :<img src={displayUser.profilePic} alt={default_prof_pic} width="50" height="60"></img> }
                
                <h1>{displayUser.firstName} {displayUser.lastNameInitial.toUpperCase()}.</h1>
        <p>Age: {displayUser.age} Location: {displayUser.location}</p>
        <p>Posts: {displayUser.posts.length} Liked Posts: {displayUser.likes.length}</p>

                {(this.props.users.user.loggedIn && currentUser === false && isFriend === false && pending === false && pendingAccept === false) ? <button onClick={() => this.handleFriend(displayUser)}>Add Friend!</button> : null}
                {(isFriend === true && pending === false) ? <button onClick={() => this.handleUnFriend(displayUser)}>Unfriend</button> : null}
                 {/* edit user stuff */}
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
                    <h3>Friends({friends.length}):</h3>
        {friends.map((friend,idx) =>{ return <li key={idx}>{friend.firstName} {friend.lastNameInitial}.</li>})}
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


// before experiment: 
//  <h1>{displayUser.firstName} {displayUser.lastNameInitial.toUpperCase()}.</h1>
// <h3>Friends({this.state.friends.length}):</h3>
// {this.state.friends.map((friend,idx) =>{ return <li key={idx}>{friend.firstName} {friend.lastNameInitial}.</li>})}
// {(this.props.users.user.loggedIn && this.state.currentUser === false && this.state.isFriend === false) ? <button onClick={() => this.handleFriend(displayUser)}>Add Friend!</button> : null}
// {(this.state.isFriend === true) ? <button onClick={() => this.handleUnFriend(displayUser)}>Unfriend</button> : null}
// </div> 

const mapStateToProps = state => {
    // console.log(state.users.user)
    return {users: state.users, user: state.users.user,
    friendships: state.users.friendships, notifications: state.users.notifications}
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