import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

const MenuSidebar = () => {
    const email = useSelector((state) => state.auth.user.email);
    const role = useSelector((state) => state.auth.user.role);

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to="/" className="brand-link">
                <img
                    src="/img/logo.jpg"
                    alt="logo"
                    className="brand-image img-circle elevation-3"
                    style={{opacity: '.8'}}
                />
                <span className="brand-text font-weight-light">
                    Stress Analyze
                </span>
            </Link>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img
                            src={'/img/default-profile.png'}
                            className="img-circle elevation-2"
                            alt="User"
                        />
                    </div>
                    <div className="info">
                        <div className="d-block" style={{color: 'white'}}>
                            {email}
                        </div>
                    </div>
                </div>
                <nav className="mt-2" style={{overflowY: 'hidden'}}>
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                        <li className="nav-item">
                            <NavLink to="/" exact className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt" />
                                <p>Dashboard</p>
                            </NavLink>
                        </li>
                        {role === 'admin' && (
                            <li className="nav-item">
                                <NavLink to="/users" exact className="nav-link">
                                    <i className="nav-icon fas fa-users" />
                                    <p>Users</p>
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default MenuSidebar;
