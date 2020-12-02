import React, {Component} from 'react';
import { connect } from 'react-redux'
import {getUsers} from '../actions/getUsers'
import {addFriend, unFriend} from '../actions/friendships'
import {notify} from '../actions/notifications'
import { getFriendships } from '../actions/friendships';
import { editUserInfo } from '../actions/editUserInfo'

class UserView extends Component {

    state={
        currentUser: true,
        friends: [],
        isFriend: false,
        isEdit: false,
        age: '',
        location: '',
        id: ''
    }

    componentDidMount(){
        this.props.getUsers()
        // this.props.getFriendships()
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
            id: displayUser.id
        })

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
        console.log('this.props: ',this.props)
        let displayUser = this.props.users.users.find(user => user.id === parseInt(this.props.match.params.userId))
        console.log('display user: ', displayUser)
        await this.setIdState(state => ({
            id: displayUser.id,
            location: displayUser.location,
            age: displayUser
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
        // console.log('curent state: ', this.state)
        if (this.props.users.users !== undefined){
            let displayUser = this.props.users.users.find(user => user.id === parseInt(this.props.match.params.userId))
            let friends = []
            if (displayUser.followers !== []){
            displayUser.followers.forEach(friend => friends.push(friend))
            // console.log('friends after follwers: ', friends)
            }
            if (displayUser.followees !== []){
            displayUser.followees.forEach(friend => friends.push(friend))
            // console.log('friends after follwees: ', friends)
            }
            let isFriend = friends.find(friend => friend.id === this.props.users.user.user_id)
            if(isFriend === undefined){
                isFriend = false
            } else {isFriend = true}
            let currentUser = true
            if (this.props.users.user.user_id !== displayUser.id){
                     currentUser = false
            }
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
        <p>Age: {displayUser.age} Location: {displayUser.location}</p>
                <h3>Friends({friends.length}):</h3>
        {friends.map((friend,idx) =>{ return <li key={idx}>{friend.firstName} {friend.lastNameInitial}.</li>})}
                {(this.props.users.user.loggedIn && currentUser === false && isFriend === false) ? <button onClick={() => this.handleFriend(displayUser)}>Add Friend!</button> : null}
                {(isFriend === true) ? <button onClick={() => this.handleUnFriend(displayUser)}>Unfriend</button> : null}
                 {/* edit user stuff */}
                 {this.state.currentUser ? <button onClick={this.handleEditClick}>Edit/ Add Info</button> : null}
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
    friendships: state.friendships}
  }
  
  const mapDispatchToProps = dispatch => ({
    getUsers: () => dispatch(getUsers()),
    addFriend: (text) => dispatch(addFriend(text)),
    unFriend: (text) => dispatch(unFriend(text)),
    notify: (note) => dispatch(notify(note)),
    getFriendships: () => dispatch(getFriendships()),
    editInfo: (text) => dispatch(editUserInfo(text))
  })

export default connect(mapStateToProps, mapDispatchToProps)(UserView)