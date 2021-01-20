import React from 'react';
import { NavLink } from 'react-router-dom';


const NavBar = () => {
    return(
        <div className='ui secondary pointing menu' width='100%' margin-top="0px">
            <NavLink
                className='ui item'
                to= '/login'
                exact
                >login</NavLink> 
            <NavLink
                className='ui item'
                to= '/signup'
                exact
                >Sign-Up</NavLink> 
            <NavLink
                className='ui item'
                to= '/postfeed'
                exact
                >Post Feed</NavLink> 

        </div>
    )
}


export default NavBar;