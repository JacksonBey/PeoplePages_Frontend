import React from 'react';
import { NavLink } from 'react-router-dom';


const NavBar = () => {
    return(
        <div className='ui secondary pointing menu' width='100%' margin-top="0px">
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