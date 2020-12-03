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
        id: '',
        wasEdited: false,
        loaded: false,
        pending: false
    }

    componentDidMount(){
        this.props.getUsers()
        // this.props.getFriendships()
        
        console.log('in comp did mount')
        // console.log('users: ', this.props.users.users)
        // console.log('friendships: ', this.props.users.friendships)
        if (this.props.users.users !== undefined){
        this.setState({
            firstName: this.props.displayUser.firstName,
            lastNameInitial: this.props.displayUser.lastNameInitial,
            age: this.props.displayUser.age,
            location: this.props.displayUser.location,
            id: this.props.displayUser.id,
            loaded: true
        })
        // see if friendship is pending:
        let ffilter = {
            followee_id: this.props.displayUser.id,
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
        if (this.props.displayUser.followers !== []){
        this.props.displayUser.followers.forEach(friend => friends.push(friend))
        // console.log('friends after follwers: ', friends)
        }
        if (this.props.displayUser.followees !== []){
        this.props.displayUser.followees.forEach(friend => friends.push(friend))
        // console.log('friends after follwees: ', friends)
        }
        // console.log('d user friends: ', friends)
        let isFriend = friends.find(friend => friend.id === this.props.users.user.user_id)
        if(isFriend === undefined){
            isFriend = false
        } else {isFriend = true}
        // console.log('isfriend: ',isFriend)
        console.log('id: ', this.props.displayUser.id)
        this.setState({
            friends, isFriend, id: this.props.displayUser.id
        })
        // find the users that are associated with that friendship
        //display them in a list



        // console.log('this.props.displayUser: ', this.props.displayUser)
        // console.log('current user id: ', this.props.users.user)
        if (this.props.users.user.user_id !== this.props.displayUser.id){
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
    //         let this.props.displayUser = this.props.users.users.find(user => user.id === parseInt(this.props.match.params.userId))
    
    //         //get friendships belonging to displayed user.
    //         let friends = []
    //         if (this.props.displayUser.followers !== []){
    //         this.props.displayUser.followers.forEach(friend => friends.push(friend))
    //         // console.log('friends after follwers: ', friends)
    //         }
    //         if (this.props.displayUser.followees !== []){
    //         this.props.displayUser.followees.forEach(friend => friends.push(friend))
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
        // console.log('this.props: ',this.props)
        let nEdit = !this.state.isEdit
        // let this.props.displayUser = this.props.users.users.find(user => user.id === parseInt(this.props.match.params.userId))
        // console.log('display user: ', this.props.displayUser)
        await this.setIdState(state => ({
            id: this.props.displayUser.id,
            wasEdited: true,
            isEdit: nEdit
        }))
        // this.setState({
        //     id: this.props.displayUser.id
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
            let friends = []
            let pendings = this.props.users.friendships.filter(friendship => friendship.pending === true)
            console.log('pendings: ', pendings)
            if (this.props.displayUser.followers !== []){
                console.log('display user followers: ', this.props.displayUser.followers)
            this.props.displayUser.followers.forEach(friend => friends.push(friend))
            pendings.forEach(pending => {
                if (pending.followee_id === this.props.displayUser.id){
                friends = friends.filter(friend => friend.id !== pending.follower_id)}
            })
            console.log('friends after follwers: ', friends)
            }
            if (this.props.displayUser.followees !== []){
                this.props.displayUser.followees.forEach(friend => {friends.push(friend)})
                // console.log('followee id: ', this.props.displayUser.followees[0].id)
                // console.log('pendind id: ', pendings[0].followee_id)

                pendings.forEach(pending => {
                    console.log(pending.followee_id)
                    if (pending.follower_id === this.props.displayUser.id){
                    friends = friends.filter(friend => friend.id !== pending.followee_id)}
                })
                console.log('friends after follees: ', friends)
            }
            let isFriend = friends.find(friend => friend.id === this.props.users.user.user_id)
            if(isFriend === undefined){
                isFriend = false
            } else {isFriend = true}
            let currentUser = true
            if (this.props.users.user.user_id !== this.props.displayUser.id){
                     currentUser = false
            }
        // console.log('this.props.displayUser: ', this.props.displayUser)
        // console.log('logged in user: ', this.props.users.user.loggedIn)
        // console.log('current user state', this.state.currentUser)
        // console.log('friends added', this.state.friends)
        // let friendships;
        // if (this.props.users.friendships !== undefined){
        //     friendships = this.props.users.friendships.filter(friend => friend.follower_id === this.props.displayUser.id)
        //     friendships = [...friendships, this.props.users.friendships.filter(friend => friend.followee_id === this.props.displayUser.id)]
        // }
        let pending = false
        let pendingAccept = false;
        let acceptordecline;
        let ffilter = {
            followee_id: this.props.displayUser.id,
            follower_id: this.props.users.user.user_id,
            pending: true
        }
                console.log('this.props.displayUser: ', this.props.displayUser.id)
                console.log('user', this.props.users.user.user_id)
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
                follower_id: this.props.displayUser.id,
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
        console.log('pending: ', ispending)
        if(ispending !== undefined){
            pending = true
        }

        let {firstName, lastNameInitial} = this.props.friend
        return(
            <div>
                {/* {(this.props.users.user.loggedIn && currentUser === false && isFriend === false && pending === false) ? <button onClick={() => this.handleFriend(this.props.this.props.displayUser)}>Add Friend!</button> : null} */}
                
                 {/* edit user stuff */}

        <li>{firstName} {lastNameInitial}. {(isFriend === true && pending === false) ? <button onClick={() => this.handleUnFriend(this.props.displayUser)}>Unfriend</button> : null}
        { pending ? <button disabled>pending</button> : null}
        </li>
            </div>
        )
        }else{
        return(
            <div>
                {null}
            </div>
        )}
    }
}


const mapStateToProps = state => {
    // console.log(state.users.user)
    return {users: state.users, user: state.users.user,
    friendships: state.users.friendships}
  }
  
  const mapDispatchToProps = dispatch => ({
    getUsers: () => dispatch(getUsers()),
    addFriend: (text) => dispatch(addFriend(text)),
    unFriend: (text) => dispatch(unFriend(text)),
    notify: (note) => dispatch(notify(note)),
    getFriendships: () => dispatch(getFriendships())
  })

export default connect(mapStateToProps, mapDispatchToProps)(UserView)