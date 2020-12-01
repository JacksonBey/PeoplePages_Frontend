import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'

// const link = {
//   width: '100px',
//   padding: '12px',
//   margin: '0 6px 6px',
//   background: 'blue',
//   textDecoration: 'none',
//   color: 'white',
// }

class UserBar extends Component {
    render(){
        let notifications;
    // console.log('userbar props: ', this.props)
    if (this.props.notifications !== undefined){
    notifications = this.props.notifications.filter(note => note.user_id === this.props.user.user_id)}
    return(
        <div className='ui secondary pointing menu'>
            <NavLink
                className='ui item'
                to= '/'
                exact
                activeStyle={{
                    background: 'lightgrey'
                }}
                >Home</NavLink>

            <NavLink
                className='ui item'
                to= '/about'
                exact
                activeStyle={{
                    background: 'lightgrey'
                }}
                >about</NavLink> 
            <NavLink
                className='ui item'
                to= '/login'
                exact
                activeStyle={{
                    background: 'lightgrey'
                }}
                >login</NavLink> 
            <NavLink
                className='ui item'
                to= '/myaccount'
                exact
                activeStyle={{
                    background: 'lightgrey'
                }}
                >Account</NavLink> 
            <NavLink
                className='ui item'
                to= '/createpost'
                exact
                activeStyle={{
                    background: 'lightgrey'
                }}
                >Create Post</NavLink> 
            <NavLink
                className='ui item'
                to= '/postfeed'
                exact
                activeStyle={{
                    background: 'lightgrey'
                }}
                >My Post Feed</NavLink> 
            <NavLink
                className='ui item'
                to= '/notifications'
                exact
                activeStyle={{
                    background: 'lightgrey'
                }}
            >Notifications({notifications === undefined ? 0 : notifications.length})</NavLink> 
        </div>
    )}
}


// export default UserBar;


const mapStateToProps = state => {
    return {user: state.users.user, notifications: state.users.notifications}
  }


export default connect(mapStateToProps)(UserBar)