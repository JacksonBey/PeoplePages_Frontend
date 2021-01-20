import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'

class UserBar extends Component {


    render(){
        let notifications;
    if (this.props.notifications !== undefined){
    notifications = this.props.notifications.filter(note => note.user_id === this.props.user.user_id)}
    return(
        <div className='ui secondary pointing menu' >
            <NavLink
                className='ui item'
                to={`/users/${this.props.user.user_id}`}
                exact
                activeStyle={{
                    background: 'transparent'
                }}
                >Account</NavLink> 
            <NavLink
                className='ui item'
                to= '/createpost'
                exact
                activeStyle={{
                    background: 'transparent'
                }}
                >Create Post</NavLink> 
            <NavLink
                className='ui item'
                to= '/postfeed'
                exact
                activeStyle={{
                    background: 'transparent'
                }}
                >My Post Feed</NavLink> 
            <NavLink
                className='ui item'
                to= '/users'
                exact
                activeStyle={{
                    background: 'transparent'
                }}
                >Users</NavLink> 
            <NavLink
                className='ui item'
                to= '/notifications'
                exact
                activeStyle={{
                    background: 'transparent'
                }}
                >Notifications({notifications === undefined ? 0 : notifications.length})</NavLink> 

        </div>
    )}
}



const mapStateToProps = state => {
    return {user: state.users.user, notifications: state.users.notifications}
  }


export default connect(mapStateToProps)(UserBar)