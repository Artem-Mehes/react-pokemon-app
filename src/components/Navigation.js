import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = ({ navItems }) => {
    return (
        <nav className="nav">
            <ul className="nav__list">
                {Object.keys(navItems).map(item => {
                    return (
                        <li key={item}>
                            <NavLink 
                                className="nav__link"
                                to={navItems[item]}>
                                {item}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Navigation;
