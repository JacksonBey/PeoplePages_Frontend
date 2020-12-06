import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
// import PPlogo from '../images/PPlogo.png'

// const link = {
//   width: '100px',
//   padding: '12px',
//   margin: '0 6px 6px',
//   background: 'blue',
//   textDecoration: 'none',
//   color: 'white',
// }

class UserBar extends Component {

    // getLit = () => {
    //     console.log('its lit!')
    //     document.body.classList.toggle('dark-theme')
    //     // Let's say the theme is equal to light
    //     // let theme = "light";
    //     // If the body contains the .dark-theme class...
    //     console.log('body contains dark theme? ', document.body.classList.contains("dark-theme"))
    //     if (document.body.classList.contains("dark-theme")) {
    //         // ...then let's make the theme dark
    //         // theme = "dark";
    //         document.cookie='theme=dark'
    //     } else {
    //         document.cookie='theme=light'
    //     }
    //     console.log(document.cookie)
    //     // Then save the choice in a cookie
    //     // document.cookie = "theme=" + theme;
    // }


    render(){
        let notifications;
    // console.log('userbar props: ', this.props)
    if (this.props.notifications !== undefined){
    notifications = this.props.notifications.filter(note => note.user_id === this.props.user.user_id)}
    return(
        <div 
        className='ui secondary pointing menu'
        // class="dark-theme || light-theme"
        >
             {/* <img   src={PPlogo} alt='' width="80" height="65" align='left'/> */}

            {/* <NavLink
                className='ui item'
                // className="dark-theme || light-theme"
                to= '/'
                exact
                activeStyle={{
                    background: '#b3ffff'
                }}
                >Home</NavLink>

            <NavLink
                className='ui item'
                to= '/about'
                exact
                activeStyle={{
                    background: '#b3ffff'
                }}
                >about</NavLink>  */}
            {/* <NavLink
                className='ui item'
                to= '/login'
                exact
                activeStyle={{
                    background: '#b3ffff'
                }}
                >login</NavLink>  */}
            <NavLink
                className='ui item'
                // to= '/myaccount'
                to={`/users/${this.props.user.user_id}`}
                exact
                activeStyle={{
                    background: '#b3ffff'
                }}
                >Account</NavLink> 
            <NavLink
                className='ui item'
                to= '/createpost'
                exact
                activeStyle={{
                    background: '#b3ffff'
                }}
                >Create Post</NavLink> 
            <NavLink
                className='ui item'
                to= '/postfeed'
                exact
                activeStyle={{
                    background: '#b3ffff'
                }}
                >My Post Feed</NavLink> 
            <NavLink
                className='ui item'
                to= '/users'
                exact
                activeStyle={{
                    background: '#b3ffff'
                }}
                >Users</NavLink> 
            <NavLink
                className='ui item'
                to= '/notifications'
                exact
                activeStyle={{
                    background: '#b3ffff'
                }}
                >Notifications({notifications === undefined ? 0 : notifications.length})</NavLink> 
                {/* <button onClick={this.getLit} style= {{ background: 'Cornsilk'}}>YUH</button> */}

        </div>
    )}
}


// export default UserBar;


const mapStateToProps = state => {
    return {user: state.users.user, notifications: state.users.notifications}
  }


export default connect(mapStateToProps)(UserBar)