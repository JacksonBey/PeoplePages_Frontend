import React from 'react';
import { NavLink } from 'react-router-dom';

// const link = {
//   width: '100px',
//   padding: '12px',
//   margin: '0 6px 6px',
//   background: 'blue',
//   textDecoration: 'none',
//   color: 'white',
// }

const NavBar = () => {
    return(
        <div className='ui secondary pointing menu' width='100%' margin-top="0px">
            {/* <img   src={PPlogo} alt='' width="80" height="65" align='left'/> */}

            {/* <NavLink
                className='ui item'
                to= '/'
                exact
                activeStyle={{
                    background: '#b3ffff',
                    width: '100px'
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
            <NavLink
                className='ui item'
                to= '/login'
                exact
                activeStyle={{
                    background: '#b3ffff'
                }}
                >login</NavLink> 
            <NavLink
                className='ui item'
                to= '/signup'
                exact
                activeStyle={{
                    background: '#b3ffff'
                }}
                >Sign-Up</NavLink> 
            <NavLink
                className='ui item'
                to= '/postfeed'
                exact
                activeStyle={{
                    background: '#b3ffff'
                }}
                >Post Feed</NavLink> 

        </div>
    )
}


export default NavBar;