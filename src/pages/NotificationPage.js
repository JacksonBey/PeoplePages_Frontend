import React, {Component} from 'react';
import { connect } from 'react-redux'
import {getNotifications, readNotification} from '../actions/notifications'
import { Link } from 'react-router-dom';

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
                    let person = note.reason.split(' ').slice(0,2).join(' ').toString()
                    let reason = note.reason.split(' ').slice(2).join(' ').toString()
                    return <li key={idx}><Link to={`/users/${note.friend_id}`}>{person}</Link> {reason}<button onClick={() => this.handleRead(note)}>X</button> </li>
                })}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {user: state.users.user, notifications: state.users.notifications}
  }

  const mapDispatchToProps = dispatch => ({
    getNotifications: () => dispatch(getNotifications()),
    readNotification: (text) => dispatch(readNotification(text))
  })

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage)