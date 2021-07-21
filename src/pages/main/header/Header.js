import React from 'react';
import User from './user-dropdown/UserDropdown';

const Header = ({toggleMenuSidebar}) => {
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <button
                        onClick={() => toggleMenuSidebar()}
                        type="button"
                        className="nav-link"
                        data-widget="pushmenu"
                        href="#"
                    >
                        <i className="fas fa-bars" />
                    </button>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <User />
            </ul>
        </nav>
    );
};

export default Header;
