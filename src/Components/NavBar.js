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
        </div>
    )
}


export default NavBar;