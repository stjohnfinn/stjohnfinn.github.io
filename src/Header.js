import React from 'react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {

    render() {
        return (
            <div id='header-cont'>
                <p>Finn St. John</p>
                <div id='nav-cont'>
                    <NavLink to='/' exact className='nav-inactive' activeClassName='nav-active' >About</NavLink>
                    <NavLink to='/projects' exact className='nav-inactive' activeClassName='nav-active' >My Work</NavLink>
                </div>
            </div>
        );
    }
}

export default Header;