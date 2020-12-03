import React, {Component} from 'react';
import { connect } from 'react-redux'
import {getNotifications, readNotification} from '../actions/notifications'
import { Link } from 'react-router-dom';
import {acceptFriendship, unFriend} from '../actions/friendships'

class NotificationPage extends Component {

    state = {
        notifications: []
    }

    componentDidMount = () => {
        let mynotifications;
        if (this.props.notifications !== undefined){
        mynotifications = this.props.notifications.filter(note => note.user_id === this.props.user.user_id) 
        this.setState({
            notifications: mynotifications
        })} else {
            this.props.getNotifications()

        }
    }

    handleRead = (note) => {
        console.log(note)
        let newnotifications = this.props.notifications.filter(notify => notify.id !== note.id) 
        this.setState({
            notifications: newnotifications
        })
        this.props.readNotification(note)
    }

    findFriendship = (note) => {
        let ffilter = {
            followee_id: note.user_id,
            follower_id: note.friend_id
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

    handleAccept = (note) => {
        console.log('accepted')
        console.log('note ',note)

        //find friendship
        this.handleRead(note)
        let text = this.findFriendship(note)
        console.log('found friend: ', text)
        this.props.acceptFriendship(text)
    }

    handleDecline = (note) => {
        console.log('declined!')
        this.handleRead(note)
        // console.log('decline note:', note)
        let friendship = this.findFriendship(note)
        let followee = this.props.user
        console.log('followee: ', followee)
        console.log('props.user: ', this.props.users.users)
        let follower = this.props.users.users.find(user => {
             return user.id === note.friend_id
        })
        console.log('follower: ', follower)
        // delete friendship below
        let text ={friendship: friendship, followee: followee, follower: follower, follower_id: follower.id, followee_id: followee.user_id}
        console.log('delete friend request package: ', text)
        this.props.unFriend(text)
    }

    render() {
        // console.log('user props', this.props.user)
        // console.log('props notifications: ', this.props.notifications)
        // console.log('filtered notifications: ',this.state.notifications)
        let mynotifications = []
        if(this.props.notifications !== undefined){
            mynotifications = this.props.notifications.filter(note => note.user_id === this.props.user.user_id)
        }
        return(
            <div>
                <h3>your notifications({mynotifications.length}):</h3>
                {mynotifications.map((note, idx )=> {
                    // console.log(note.reason.split(' ').slice(0,2).join(' '))
                    // console.log(note.reason.split(' ').slice(2).join(' '))
                    let date = note.created_at.split('T')[0]
                    let person = note.reason.split(' ').slice(0,2).join(' ').toString()
                    let reason = note.reason.split(' ').slice(2).join(' ').toString()
                    // console.log('reason: ', reason)
                    return <li key={idx}><Link to={`/users/${note.friend_id}`}>{person}</Link> {reason}
                    {note.post_id !== null ?
                    <Link to={`/posts/${note.post_id}`}>Goto Post</Link> : null
                    }
                    <p>on: {date}</p>
                    {reason !== 'added you as a friend!' ? <button onClick={() => this.handleRead(note)}>read</button>  :
                    <span><button onClick={() => this.handleAccept(note)}>Accept</button><button onClick={() => this.handleDecline(note)}>Decline</button></span>}
                    </li>
                })}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {users: state.users, user: state.users.user, notifications: state.users.notifications,
        friendships: state.users.friendships}
  }

  const mapDispatchToProps = dispatch => ({
    getNotifications: () => dispatch(getNotifications()),
    readNotification: (text) => dispatch(readNotification(text)),
    acceptFriendship: (text) => dispatch(acceptFriendship(text)),
    unFriend: (text) => dispatch(unFriend(text))
  })

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage)